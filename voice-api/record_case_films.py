import argparse
import json
import os
from pathlib import Path

from config import ROOT, VOICE_PROFILES
from record_cod_film import record_scenes


def record(plan_path):
    plan = json.loads(plan_path.read_text())
    cases = plan["cases"]
    previous_path = ROOT.parent / "src" / "case-film-audio.json"
    previous = json.loads(previous_path.read_text())["cases"] if previous_path.exists() else {}
    if not cases or not set(previous).issubset(cases) or any(len(scenes) != 7 for scenes in cases.values()):
        raise ValueError("Expected complete seven-scene walkthroughs, preserving every existing case.")
    profile = plan["profile"]
    if profile not in {"energetic", "explainer"}:
        raise ValueError("Use the packaged energetic or conversational explainer profile.")
    recordings = {}
    for case_id, scenes in cases.items():
        print(f"Preparing {case_id}", flush=True)
        recordings[case_id] = record_scenes(scenes, profile, plan_path.parent)
    manifest = {"profile": profile, "label": VOICE_PROFILES[profile]["label"], "cases": recordings}
    path = ROOT.parent / "src" / "case-film-audio.json"
    pending = path.with_suffix(".json.tmp")
    pending.write_text(json.dumps(manifest, indent=2) + "\n")
    os.replace(pending, path)
    print("Saved all case-film narration; prior manifests and recordings remain unchanged.", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Record all remaining case films using the existing local voice service.")
    parser.add_argument("plan", type=Path)
    record(parser.parse_args().plan.resolve())
