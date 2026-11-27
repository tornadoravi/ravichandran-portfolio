import math

import numpy as np

MASTERING_VERSION = "speech-rms-21-v1"


def master_speech(samples, rate):
    """Balance speech blocks without changing pitch, pace or the silence floor."""
    audio = np.asarray(samples, dtype=np.float64)
    if audio.ndim != 1 or not audio.size or not np.isfinite(audio).all() or rate <= 0:
        raise ValueError("Expected finite mono speech and a positive sample rate.")
    block = max(1, round(rate * 0.02))
    starts = np.arange(0, audio.size, block)
    levels = np.array([
        math.sqrt(float(np.mean(audio[start:start + block] ** 2)))
        for start in starts
    ])
    speech = levels > 10 ** (-45 / 20)
    if not speech.any():
        raise ValueError("Narration is silent.")
    decibels = 20 * np.log10(np.maximum(levels, 1e-8))
    # A gentle 2.5:1 compressor catches projected phrases, not only clip peaks.
    reduction = np.maximum(decibels + 24, 0) * (1 - 1 / 2.5)
    envelope = np.zeros_like(reduction)
    for index, desired in enumerate(reduction):
        previous = envelope[index - 1] if index else desired
        coefficient = math.exp(-0.02 / (0.02 if desired > previous else 0.18))
        envelope[index] = desired + coefficient * (previous - desired)
    gain = np.interp(np.arange(audio.size), starts, 10 ** (-envelope / 20))
    balanced = audio * gain
    active = np.repeat(speech, block)[:audio.size]
    rms = math.sqrt(float(np.mean(balanced[active] ** 2)))
    balanced *= 10 ** (-21 / 20) / rms
    peak = float(np.max(np.abs(balanced)))
    if peak > 10 ** (-1.5 / 20):
        balanced *= 10 ** (-1.5 / 20) / peak
    return balanced
