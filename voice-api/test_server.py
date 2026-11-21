import io
import json
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
import wave
from pathlib import Path

from server import create_server


def sample_wav(frames=240, sample=1):
    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(24000)
        wav.writeframes(sample.to_bytes(2, "little", signed=True) * frames)
    return buffer.getvalue()


class VoiceAPITests(unittest.TestCase):
    def setUp(self):
        self.calls = []
        self.output = tempfile.TemporaryDirectory()
        self.server = create_server(
            lambda text, profile: self.calls.append((text, profile)) or sample_wav(),
            port=0,
            output_dir=Path(self.output.name),
        )
        self.thread = threading.Thread(target=self.server.serve_forever)
        self.thread.start()
        self.base = f"http://127.0.0.1:{self.server.server_address[1]}"

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.output.cleanup()

    def post(self, payload, headers=None):
        request = urllib.request.Request(
            self.base + "/api/voice/preview",
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json", **(headers or {})},
        )
        return urllib.request.urlopen(request, timeout=5)

    def test_preview_returns_and_preserves_wav(self):
        with self.post({"text": " Let's explain the design. "}) as response:
            self.assertEqual(response.status, 200)
            self.assertEqual(response.headers["Content-Type"], "audio/wav")
            audio = response.read()
        self.assertEqual(self.calls, [("Let's explain the design.", "conversational")])
        self.assertEqual(audio, sample_wav())
        self.assertEqual(next(Path(self.output.name).glob("*.wav")).read_bytes(), audio)

    def test_invalid_text_and_reference_audio_are_rejected(self):
        for payload in [{"text": ""}, {"text": "a" * 281}, {"text": 123}, {"text": "தமிழ்"},
                        {"text": "Hello", "ref_audio": "someone.wav"}]:
            with self.subTest(payload=payload), self.assertRaises(urllib.error.HTTPError) as error:
                self.post(payload)
            self.assertEqual(error.exception.code, 400)
        self.assertEqual(self.calls, [])

    def test_other_sites_cannot_trigger_generation(self):
        for headers in [{"Origin": "https://another-site.example"}, {"Host": "another-site.example"}]:
            with self.assertRaises(urllib.error.HTTPError) as error:
                self.post({"text": "Hello"}, headers)
            self.assertEqual(error.exception.code, 403)
        with self.assertRaises(urllib.error.HTTPError) as error:
            urllib.request.urlopen(self.base + "/.env.local", timeout=5)
        self.assertEqual(error.exception.code, 404)
        self.assertEqual(self.calls, [])

    def test_selected_profile_reaches_the_generator_and_audio_label(self):
        for profile in ["calm", "energetic"]:
            with self.post({"text": "Same script.", "profile": profile}) as response:
                self.assertEqual(response.status, 200)
                self.assertEqual(response.headers["X-Voice-Profile"], profile)
                self.assertIn(profile, response.headers["Content-Disposition"])
                self.assertEqual(response.read(), sample_wav())
        self.assertEqual(self.calls, [("Same script.", "calm"), ("Same script.", "energetic")])

    def test_invalid_profiles_are_not_silently_substituted(self):
        for profile in ["unknown", None, [], 123]:
            with self.subTest(profile=profile), self.assertRaises(urllib.error.HTTPError) as error:
                self.post({"text": "Hello", "profile": profile})
            self.assertEqual(error.exception.code, 400)
        self.assertEqual(self.calls, [])

    def test_busy_and_failed_generation_are_explicit(self):
        self.server.generation_lock.acquire()
        try:
            with self.assertRaises(urllib.error.HTTPError) as error:
                self.post({"text": "Hello"})
            self.assertEqual(error.exception.code, 429)
        finally:
            self.server.generation_lock.release()

        def fail(text, profile):
            raise RuntimeError("Test generation failed.")

        self.server.generate = fail
        with self.assertLogs("local-voice-api", level="ERROR"):
            with self.assertRaises(urllib.error.HTTPError) as error:
                self.post({"text": "Hello"})
        self.assertEqual(error.exception.code, 500)
        self.assertFalse(self.server.generation_lock.locked())


if __name__ == "__main__":
    unittest.main()
