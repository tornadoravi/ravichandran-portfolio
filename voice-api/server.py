import argparse
import io
import json
import logging
import os
import threading
import uuid
import wave
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from config import DEFAULT_PROFILE, MAX_TEXT_LENGTH, MODEL_DIR, MODEL_ID, OUTPUT_DIR, ROOT, VOICE_PROFILES

LOGGER = logging.getLogger("local-voice-api")
ASSETS = {
    "/": (ROOT / "index.html", "text/html; charset=utf-8"),
    "/app.js": (ROOT / "app.js", "text/javascript; charset=utf-8"),
    "/app.css": (ROOT / "app.css", "text/css; charset=utf-8"),
    "/mascot.webp": (ROOT.parent / "assets" / "studio-mascot-peach.webp", "image/webp"),
    "/favicon.png": (ROOT.parent / "favicon.png", "image/png"),
}


def load_generator(max_tokens=768):
    if not (MODEL_DIR / "model.safetensors").is_file():
        raise RuntimeError("Local model missing. Run voice-api/prepare.py first.")
    os.environ["HF_HUB_OFFLINE"] = "1"
    os.environ["HF_HUB_DISABLE_TELEMETRY"] = "1"
    os.environ["DO_NOT_TRACK"] = "1"
    import numpy as np
    from mlx_audio.tts.utils import load_model

    model = load_model(str(MODEL_DIR))
    if model.config.tts_model_type != "voice_design":
        raise RuntimeError("Expected the configured VoiceDesign model.")

    def generate(text, profile):
        segments = [
            np.asarray(result.audio, dtype=np.float32)
            for result in model.generate(
                text=text,
                instruct=VOICE_PROFILES[profile]["prompt"],
                lang_code="English",
                temperature=0.7,
                max_tokens=max_tokens,
                verbose=False,
            )
        ]
        if not segments:
            raise RuntimeError("The voice model returned no audio.")
        audio = np.concatenate(segments)
        if audio.ndim != 1 or not audio.size or not np.isfinite(audio).all():
            raise RuntimeError("The voice model returned invalid audio.")
        pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2")
        output = io.BytesIO()
        with wave.open(output, "wb") as wav:
            wav.setnchannels(1)
            wav.setsampwidth(2)
            wav.setframerate(model.sample_rate)
            wav.writeframes(pcm.tobytes())
        return output.getvalue()

    return generate


class VoiceHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        LOGGER.info(format, *args)

    def respond(self, status, body, content_type="application/json", filename=None, profile=None):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'none'; script-src 'self'; style-src 'self'; "
            "img-src 'self'; media-src 'self' blob:; connect-src 'self'; "
            "base-uri 'none'; frame-ancestors 'none'",
        )
        if filename:
            self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
        if profile:
            self.send_header("X-Voice-Profile", profile)
        self.end_headers()
        self.wfile.write(body)

    def error(self, status, message):
        self.respond(status, json.dumps({"error": message}).encode())

    def allowed(self):
        port = self.server.server_address[1]
        hosts = {f"127.0.0.1:{port}", f"localhost:{port}"}
        if self.headers.get("Host") not in hosts:
            self.error(403, "This API only accepts local hostnames.")
            return False
        origin = self.headers.get("Origin")
        if origin is not None and origin not in {f"http://{host}" for host in hosts}:
            self.error(403, "Cross-origin generation is not permitted.")
            return False
        return True

    def do_GET(self):
        if not self.allowed():
            return
        if self.path == "/api/health":
            self.respond(200, json.dumps({
                "ready": True,
                "busy": self.server.generation_lock.locked(),
                "model": MODEL_ID,
                "language": "English",
                "accent": "Tamil-influenced style request; not guaranteed",
                "default_profile": DEFAULT_PROFILE,
                "profiles": [
                    {"id": profile, "label": details["label"], "description": details["description"]}
                    for profile, details in VOICE_PROFILES.items()
                ],
            }).encode())
            return
        asset = ASSETS.get(self.path)
        if not asset:
            self.error(404, "Route not found.")
            return
        try:
            self.respond(200, asset[0].read_bytes(), asset[1])
        except OSError:
            LOGGER.exception("Unable to read local audition asset.")
            self.error(500, "The audition page could not load. Check the API log.")

    def do_POST(self):
        if not self.allowed():
            return
        if self.path != "/api/voice/preview":
            self.error(404, "Route not found.")
            return
        if self.headers.get("Content-Type", "").split(";")[0].strip() != "application/json":
            self.error(415, "Send application/json with a text field.")
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.error(400, "Invalid Content-Length.")
            return
        if length <= 0 or length > 4096:
            self.error(413, "The preview request must be between 1 and 4096 bytes.")
            return
        try:
            self.connection.settimeout(10)
            payload = json.loads(self.rfile.read(length))
        except (ValueError, UnicodeError):
            self.error(400, "Invalid JSON.")
            return
        except TimeoutError:
            self.error(408, "The request body took too long to arrive.")
            return
        if not isinstance(payload, dict) or "text" not in payload or set(payload) - {"text", "profile"}:
            self.error(400, "Send text and an optional profile. Reference audio and voice cloning are not supported.")
            return
        text = payload["text"]
        if not isinstance(text, str) or not 1 <= len(text.strip()) <= MAX_TEXT_LENGTH:
            self.error(400, f"Text must contain 1 to {MAX_TEXT_LENGTH} characters.")
            return
        if any("\u0b80" <= character <= "\u0bff" for character in text):
            self.error(400, "Use English text. This model does not support Tamil-language speech.")
            return
        profile = payload.get("profile", DEFAULT_PROFILE)
        if not isinstance(profile, str) or profile not in VOICE_PROFILES:
            self.error(400, "Choose an available voice profile from /api/health.")
            return
        if not self.server.generation_lock.acquire(blocking=False):
            self.error(429, "Another preview is generating. Wait for it to finish.")
            return
        try:
            audio = self.server.generate(text.strip(), profile)
            if not isinstance(audio, bytes) or not audio.startswith(b"RIFF") or audio[8:12] != b"WAVE":
                raise RuntimeError("The generator did not return WAV audio.")
            self.server.output_dir.mkdir(parents=True, exist_ok=True)
            filename = f"audition-{profile}-{uuid.uuid4().hex}.wav"
            (self.server.output_dir / filename).write_bytes(audio)
            self.respond(200, audio, "audio/wav", filename, profile)
        except (OSError, RuntimeError, ValueError):
            LOGGER.exception("Local voice preview failed.")
            self.error(500, "Voice generation failed. Check the local API log; no fallback voice was used.")
        finally:
            self.server.generation_lock.release()


def create_server(generate, port=4176, output_dir=OUTPUT_DIR):
    server = ThreadingHTTPServer(("127.0.0.1", port), VoiceHandler)
    server.generate = generate
    server.output_dir = output_dir
    server.generation_lock = threading.Lock()
    return server


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Local English voice-design audition API.")
    parser.add_argument("--port", type=int, default=4176)
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    LOGGER.info("Loading the local voice model. No text or audio is uploaded.")
    server = create_server(load_generator(), args.port)
    LOGGER.info("Voice audition ready at http://127.0.0.1:%s", server.server_address[1])
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        LOGGER.info("Stopping the local voice API.")
    finally:
        server.server_close()
