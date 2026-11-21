import os

os.environ["HF_HUB_DISABLE_TELEMETRY"] = "1"
os.environ["DO_NOT_TRACK"] = "1"

from huggingface_hub import snapshot_download
from config import MODEL_DIR, MODEL_ID, MODEL_REVISION

if __name__ == "__main__":
    print("Downloading the approved local model; no narration is uploaded.")
    snapshot_download(
        repo_id=MODEL_ID,
        revision=MODEL_REVISION,
        local_dir=MODEL_DIR,
        allow_patterns=["*.json", "*.safetensors", "*.txt", "*.model", "LICENSE*", "README.md"],
    )
    print("Model prepared. Start voice-api/server.py to generate locally.")
