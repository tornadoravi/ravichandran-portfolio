import argparse
import array
import hashlib
import io
import json
import math
import os
from pathlib import Path
import subprocess
import urllib.request
import wave

from config import MODEL_REVISION, ROOT, VOICE_PROFILES


def record_scenes(scenes, profile, temporary):
    prompt = VOICE_PROFILES[profile]["prompt"]
    if len({scene["id"] for scene in scenes}) != len(scenes):
        raise ValueError("Expected distinct cinematic scene IDs.")
    if any(not scene["text"].strip() or (not scene.get("existingFile") and len(scene["text"]) > 280) for scene in scenes):
        raise ValueError("Each script must fit the local voice API's 280-character limit.")
    destination = ROOT.parent / "assets" / "narration"
    clips = []
    for index, scene in enumerate(scenes, 1):
        text = scene["text"]
        identity = json.dumps([MODEL_REVISION, prompt, 0.7, text], ensure_ascii=True)
        digest = hashlib.sha256(identity.encode()).hexdigest()[:24]
        filename = scene.get("existingFile", f"{profile}-{digest}.m4a")
        if Path(filename).name != filename or not filename.endswith(".m4a"):
            raise ValueError("Expected a narration asset filename.")
        target = destination / filename
        if scene.get("existingFile") and not target.exists():
            raise RuntimeError(f"Existing narration is missing: {filename}")
        if not target.exists():
            with urllib.request.urlopen("http://127.0.0.1:4176/api/health", timeout=10) as response:
                health = json.load(response)
            if not health["ready"] or health["busy"]:
                raise RuntimeError("The existing voice service is not ready or is busy; it will not be interrupted.")
            request = urllib.request.Request(
                "http://127.0.0.1:4176/api/voice/preview",
                data=json.dumps({"text": text, "profile": profile}).encode(),
                headers={"Content-Type": "application/json"}, method="POST"
            )
            print(f"Recording cinematic scene {index}/{len(scenes)}: {scene['id']}", flush=True)
            with urllib.request.urlopen(request, timeout=300) as response:
                if response.headers.get("X-Voice-Profile") != profile:
                    raise RuntimeError("Unexpected voice profile returned by the local service.")
                audio = response.read()
            with wave.open(io.BytesIO(audio)) as decoded:
                if decoded.getsampwidth() != 2 or decoded.getnchannels() != 1:
                    raise RuntimeError("Expected mono 16-bit narration.")
                samples = array.array("h", decoded.readframes(decoded.getnframes()))
                duration = len(samples) / decoded.getframerate()
                if not samples or duration < len(text.split()) / 6:
                    raise RuntimeError("Empty or incomplete narration.")
                rms = math.sqrt(sum((sample / 32768) ** 2 for sample in samples) / len(samples))
                if rms < 0.001:
                    raise RuntimeError("Silent narration.")
            wav = temporary / f"cod-film-{digest}.wav"
            encoded = temporary / f"cod-film-{digest}.m4a"
            wav.write_bytes(audio)
            subprocess.run([
                "/usr/bin/afconvert", "-f", "m4af", "-d", "aac", "-b", "64000",
                str(wav), str(encoded)
            ], check=True, capture_output=True)
            os.replace(encoded, target)
            wav.unlink()
        info = subprocess.run(["/usr/bin/afinfo", str(target)], check=True, capture_output=True, text=True).stdout
        duration_line = next(line for line in info.splitlines() if "estimated duration:" in line)
        duration = float(duration_line.split("estimated duration:", 1)[1].split()[0])
        if not math.isfinite(duration) or duration <= 0:
            raise RuntimeError(f"Invalid narration duration: {filename}")
        clips.append({"id": scene["id"], "text": text, "file": filename, "seconds": duration})
        print(f"Validated {scene['id']}: {duration:.2f}s", flush=True)
    return clips


def record(plan_path):
    plan = json.loads(plan_path.read_text())
    profile = plan["profile"]
    scenes = plan["scenes"]
    expected_ids = ["veeramani", "coverage", "burden", "opportunity", "placement", "report", "verify", "protect", "sync", "scope"]
    if [scene["id"] for scene in scenes] != expected_ids:
        raise ValueError("Expected the reported story followed by the five solution scenes and scope.")
    clips = record_scenes(scenes, profile, plan_path.parent)
    manifest = {"profile": profile, "label": VOICE_PROFILES[profile]["label"], "scenes": clips}
    path = ROOT.parent / "src" / "cod-film-audio.json"
    pending = path.with_suffix(".json.tmp")
    pending.write_text(json.dumps(manifest, indent=2) + "\n")
    os.replace(pending, path)
    print("Saved cinematic narration separately; existing walkthrough recordings are unchanged.", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Record the COD cinematic story using the existing local voice service.")
    parser.add_argument("plan", type=Path)
    record(parser.parse_args().plan.resolve())
