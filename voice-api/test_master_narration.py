import unittest

import numpy as np

from master_narration import master_speech


class MasteringTests(unittest.TestCase):
    def test_projected_and_quiet_phrases_are_balanced_without_clipping(self):
        rate = 24000
        tone = np.sin(np.arange(rate) * 2 * np.pi * 220 / rate)
        source = np.concatenate([tone * 0.06, np.zeros(rate // 2), tone * 0.75])
        output = master_speech(source, rate)
        rms = lambda values: np.sqrt(np.mean(values ** 2))
        before = rms(source[-rate:]) / rms(source[:rate])
        after = rms(output[-rate:]) / rms(output[:rate])
        self.assertLess(after, before / 2)
        self.assertLessEqual(np.max(np.abs(output)), 10 ** (-1.5 / 20) + 1e-8)
        self.assertTrue(np.all(output[rate:rate + rate // 2] == 0))
        self.assertEqual(len(output), len(source))

    def test_invalid_or_silent_audio_cannot_be_published(self):
        for source in [[], [float("nan")], np.zeros(24000)]:
            with self.subTest(source_length=len(source)), self.assertRaises(ValueError):
                master_speech(source, 24000)
