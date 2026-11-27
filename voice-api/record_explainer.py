import hashlib
import gc
import io
import json
import os
from pathlib import Path
import subprocess
import urllib.error
import urllib.request
import wave

import numpy as np

from config import MODEL_REVISION, OUTPUT_DIR, ROOT, VOICE_PROFILES
from master_narration import MASTERING_VERSION, master_speech
from server import load_generator


def record():
    try:
        with urllib.request.urlopen("http://127.0.0.1:4176/api/health", timeout=3):
            raise RuntimeError("Stop the local audition service before loading another speech model.")
    except urllib.error.URLError:
        pass
    paths = [ROOT.parent / "src" / name for name in ("case-film-audio.json", "cod-film-audio.json")]
    manifests = [json.loads(path.read_text()) for path in paths]
    groups = [*manifests[0]["cases"].values(), manifests[1]["scenes"]]
    clips = [clip for group in groups for clip in group]
    temporary = OUTPUT_DIR / "explainer"
    temporary.mkdir(parents=True, exist_ok=True)
    destination = ROOT.parent / "assets" / "narration"
    generator = None
    completed = {}
    for index, clip in enumerate(clips, 1):
        identity = json.dumps([
            MODEL_REVISION, VOICE_PROFILES["explainer"]["prompt"], 0.7,
            MASTERING_VERSION, clip["text"],
        ])
        digest = hashlib.sha256(identity.encode()).hexdigest()[:24]
        filename = f"explainer-{digest}.m4a"
        target = destination / filename
        if not target.exists():
            if generator is None:
                import mlx.core as mx

                mx.set_cache_limit(256 * 1024 * 1024)
                generator = load_generator(max_tokens=768)
            print(f"Generating {index}/{len(clips)}: {clip['id']}", flush=True)
            raw = generator(clip["text"], "explainer")
            gc.collect()
            mx.clear_cache()
            with wave.open(io.BytesIO(raw)) as source:
                rate = source.getframerate()
                audio = np.frombuffer(source.readframes(source.getnframes()), dtype="<i2") / 32768
            duration = audio.size / rate
            if not len(clip["text"].split()) / 6 <= duration <= 60:
                raise RuntimeError(f"Incomplete or overlong narration: {clip['id']}")
            balanced = master_speech(audio, rate)
            wav = temporary / f"{digest}.wav"
            with wave.open(str(wav), "wb") as output:
                output.setnchannels(1)
                output.setsampwidth(2)
                output.setframerate(rate)
                output.writeframes((balanced * 32767).astype("<i2").tobytes())
            encoded = temporary / f"{digest}.m4a"
            subprocess.run([
                "/usr/bin/afconvert", "-f", "m4af", "-d", "aac", "-b", "64000",
                str(wav), str(encoded),
            ], check=True, capture_output=True)
            os.replace(encoded, target)
            wav.unlink()
        info = subprocess.run(
            ["/usr/bin/afinfo", str(target)], check=True, capture_output=True, text=True
        ).stdout
        duration = float(next(line for line in info.splitlines() if "estimated duration:" in line)
                         .split("estimated duration:")[1].split()[0])
        completed[clip["text"]] = {"file": filename, "seconds": duration}
        print(f"Ready {index}/{len(clips)}: {duration:.2f}s {filename}", flush=True)
    for group in groups:
        for clip in group:
            clip.update(completed[clip["text"]])
        if sum(clip["seconds"] for clip in group) >= 180:
            raise RuntimeError("A walkthrough exceeds the under-three-minute promise; manifests were not changed.")
    for path, manifest in zip(paths, manifests):
        manifest.update(profile="explainer", label=VOICE_PROFILES["explainer"]["label"],
                        mastering=MASTERING_VERSION)
        pending = path.with_suffix(".json.tmp")
        pending.write_text(json.dumps(manifest, indent=2) + "\n")
        os.replace(pending, path)
    print("All 17 walkthroughs now use balanced conversational narration.", flush=True)


if __name__ == "__main__":
    record()
