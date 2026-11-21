import json
import shutil
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

import record_walkthroughs
from test_server import sample_wav


@unittest.skipUnless(shutil.which("afconvert"), "The local recording pipeline requires macOS afconvert.")
class RecordingTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / "src").mkdir()
        self.manifest = self.root / "src" / "case-audio.json"
        self.plan = self.root / "plan.json"
        scripts = [f"This is step {index}." for index in range(5)]
        self.plan.write_text(json.dumps({
            "profile": "energetic", "cases": {"first": scripts, "second": scripts}
        }))
        for name, value in [("ROOT", self.root / "voice-api"), ("OUTPUT_DIR", self.root / "output")]:
            replacement = patch.object(record_walkthroughs, name, value)
            replacement.start()
            self.addCleanup(replacement.stop)

    def test_shared_scripts_are_recorded_once_and_reused_on_restart(self):
        generate = Mock(return_value=sample_wav(frames=48000, sample=2048))
        with patch.object(record_walkthroughs, "load_generator", return_value=generate):
            record_walkthroughs.record(self.plan)
        self.assertEqual(generate.call_count, 5)
        manifest = json.loads(self.manifest.read_text())
        self.assertEqual(manifest["cases"]["first"], manifest["cases"]["second"])
        for clip in manifest["cases"]["first"]:
            self.assertTrue((self.root / "assets" / "narration" / clip["file"]).is_file())
        with patch.object(record_walkthroughs, "load_generator") as load:
            record_walkthroughs.record(self.plan)
            load.assert_not_called()

    def test_a_failed_batch_preserves_the_previous_published_manifest(self):
        previous = '{"previous": "approved recordings"}\n'
        self.manifest.write_text(previous)
        generate = Mock(side_effect=[
            sample_wav(frames=48000, sample=2048), RuntimeError("Generation failed")
        ])
        with patch.object(record_walkthroughs, "load_generator", return_value=generate):
            with self.assertRaisesRegex(RuntimeError, "Generation failed"):
                record_walkthroughs.record(self.plan)
        self.assertEqual(self.manifest.read_text(), previous)
        self.assertEqual(len(list((self.root / "assets" / "narration").glob("*.m4a"))), 1)

    def test_short_and_silent_audio_are_not_published(self):
        for audio in [sample_wav(frames=240, sample=2048), sample_wav(frames=48000, sample=0)]:
            with self.subTest(audio_length=len(audio)):
                with patch.object(record_walkthroughs, "load_generator", return_value=lambda *args: audio):
                    with self.assertRaisesRegex(RuntimeError, "too short or silent"):
                        record_walkthroughs.record(self.plan)
                self.assertFalse(self.manifest.exists())
