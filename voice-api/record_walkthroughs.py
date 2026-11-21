import argparse
import array
import hashlib
import io
import json
import logging
import math
import os
import subprocess
import wave

from config import MODEL_REVISION, OUTPUT_DIR, ROOT, VOICE_PROFILES
from server import load_generator

LOGGER = logging.getLogger("walkthrough-recordings")


def record(plan_path):
    plan = json.loads(plan_path.read_text())
    profile = plan["profile"]
    prompt = VOICE_PROFILES[profile]["prompt"]
    scripts = list(dict.fromkeys(text for steps in plan["cases"].values() for text in steps))
    if not scripts or any(not isinstance(text, str) or not text.strip() for text in scripts):
        raise ValueError("The recording plan must contain nonempty narration scripts.")
    if any(len(steps) != 5 for steps in plan["cases"].values()):
        raise ValueError("Every case must contain five narration steps.")
    destination = ROOT.parent / "assets" / "narration"
    destination.mkdir(parents=True, exist_ok=True)
    temporary = OUTPUT_DIR / "walkthroughs"
    temporary.mkdir(parents=True, exist_ok=True)
    generator = None
    clips = {}
    for index, text in enumerate(scripts, 1):
        identity = json.dumps([MODEL_REVISION, prompt, 0.7, text], ensure_ascii=True)
        digest = hashlib.sha256(identity.encode()).hexdigest()[:24]
        filename = f"{profile}-{digest}.m4a"
        target = destination / filename
        if target.exists():
            subprocess.run(["/usr/bin/afinfo", str(target)], check=True, capture_output=True)
            LOGGER.info("Reusing %s/%s: %s", index, len(scripts), filename)
        else:
            if generator is None:
                generator = load_generator(max_tokens=2048)
            LOGGER.info("Generating %s/%s: %s", index, len(scripts), filename)
            audio = generator(text, profile)
            with wave.open(io.BytesIO(audio)) as decoded:
                samples = array.array("h", decoded.readframes(decoded.getnframes()))
                duration = len(samples) / decoded.getframerate()
                rms = math.sqrt(sum((sample / 32768) ** 2 for sample in samples) / len(samples))
                if duration < len(text.split()) / 6 or rms < 0.001:
                    raise RuntimeError(f"Recording is too short or silent: {filename}")
            wav_path = temporary / f"{digest}.wav"
            encoded_path = temporary / f"{digest}.m4a"
            wav_path.write_bytes(audio)
            subprocess.run([
                "/usr/bin/afconvert", "-f", "m4af", "-d", "aac", "-b", "64000",
                str(wav_path), str(encoded_path)
            ], check=True, capture_output=True)
            subprocess.run(["/usr/bin/afinfo", str(encoded_path)], check=True, capture_output=True)
            os.replace(encoded_path, target)
            wav_path.unlink()
            LOGGER.info("Saved %.2fs, %.0fKB: %s", duration, target.stat().st_size / 1024, filename)
        clips[text] = {"text": text, "file": filename}
    manifest = {
        "profile": profile,
        "label": VOICE_PROFILES[profile]["label"],
        "cases": {case_id: [clips[text] for text in steps] for case_id, steps in plan["cases"].items()},
    }
    manifest_path = ROOT.parent / "src" / "case-audio.json"
    pending_path = manifest_path.with_suffix(".json.tmp")
    pending_path.write_text(json.dumps(manifest, indent=2) + "\n")
    os.replace(pending_path, manifest_path)
    LOGGER.info("Complete: %s cases, %s unique local recordings.", len(manifest["cases"]), len(clips))


if __name__ == "__main__":
    from pathlib import Path

    parser = argparse.ArgumentParser(description="Record approved walkthrough scripts locally.")
    parser.add_argument("plan", type=Path)
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")
    record(args.plan)
