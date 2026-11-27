from pathlib import Path

ROOT = Path(__file__).resolve().parent
MODEL_ID = "mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-4bit"
MODEL_REVISION = "5c390979e4b93af5f2932f90742ca99c7dd04687"
MODEL_DIR = ROOT / ".models" / "qwen-voice-design"
OUTPUT_DIR = ROOT / "output"
MAX_TEXT_LENGTH = 280
DEFAULT_PROFILE = "conversational"
VOICE_IDENTITY = (
    "An adult male Tamil speaker speaking clear English with naturally "
    "Tamil-influenced Indian pronunciation. "
    "Clean close-mic speech with natural breathing. Speak English throughout."
)
VOICE_PROFILES = {
    "explainer": {
        "label": "Conversational design explanation",
        "description": "Steady, clear, one-to-one explanation without dramatic emphasis.",
        "prompt": VOICE_IDENTITY + (
            " A grounded, comfortable mid-range male voice explaining a design "
            "to one colleague sitting nearby. Use an even conversational volume, "
            "connected phrases, a clear moderate pace and small natural pauses. "
            "Keep emphasis subtle and sentence endings relaxed. No storytelling "
            "performance, announcer projection, whispering, shouting or dramatic "
            "pitch rises. Sound matter-of-fact and interested, not theatrical."
        ),
    },
    "conversational": {
        "label": "Conversational",
        "description": "Warm, relaxed, and friendly; an everyday one-to-one explanation.",
        "prompt": VOICE_IDENTITY + (
            " His voice is warm and grounded, with a comfortable mid-range pitch. "
            "He explains a tech feature to one colleague in an everyday conversation. "
            "Friendly and slightly unhurried, with connected phrases, small pauses "
            "between ideas, varied emphasis, and gentle sentence endings."
        ),
    },
    "calm": {
        "label": "Calm",
        "description": "Soft-spoken and composed, with more space between ideas.",
        "prompt": VOICE_IDENTITY + (
            " A calm, soft-spoken male voice with a mellow, naturally resonant tone. "
            "He explains the design patiently and clearly. Measured phrases, "
            "thoughtful pauses, gentle emphasis, and reassuring sentence endings."
        ),
    },
    "energetic": {
        "label": "Energetic tech-explainer",
        "description": "Brighter and more expressive, with upbeat emphasis.",
        "prompt": VOICE_IDENTITY + (
            " An enthusiastic male tech explainer with a brighter, lively tone. "
            "He sounds engaged and approachable, speaking with expressive emphasis "
            "and a crisp conversational rhythm. Brief natural pauses keep the "
            "ideas clear. Positive energy at a comfortable speaking volume."
        ),
    },
}
