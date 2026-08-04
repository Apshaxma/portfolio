"""Vision-LLM captioning, scene detection and structured details."""

from __future__ import annotations

import json
import os

import google.generativeai as genai

MODEL_NAME = os.environ.get("CAPTION_MODEL", "gemini-1.5-flash")
IMAGE_TYPES = {"image/jpeg": "jpeg", "image/png": "png", "image/webp": "webp"}


def _model() -> genai.GenerativeModel:
    key = os.environ.get("GEMINI_API_KEY", "")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not set")
    genai.configure(api_key=key)
    return genai.GenerativeModel(MODEL_NAME)


def _blob(image_bytes: bytes) -> dict:
    return {
        "mime_type": "image/jpeg",  # Streamlit uploads are typically JPEG/PNG
        "data": image_bytes,
    }


def _run(prompt: str, image_bytes: bytes) -> str:
    model = _model()
    resp = model.generate_content([prompt, _blob(image_bytes)])
    return resp.text.strip()


def caption_image(image_bytes: bytes) -> str:
    return _run(
        "Describe this image in one rich, vivid sentence — subject, setting, "
        "mood and notable detail.",
        image_bytes,
    )


def detect_scenes(image_bytes: bytes) -> list[str]:
    raw = _run(
        "List the scenes/objects/activities visible in this image. Return a "
        "plain bullet list, one item per line, no numbering.",
        image_bytes,
    )
    return [line.strip("•- ") for line in raw.splitlines() if line.strip()]


def extract_details(image_bytes: bytes) -> dict:
    raw = _run(
        "Extract structured details from this image and return ONLY a JSON "
        "object (no markdown fences), e.g. {\"subject\": ..., \"setting\": ..., "
        "\"colors\": [...], \"text_visible\": ...}",
        image_bytes,
    )
    raw = raw.removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    try:
        data = json.loads(raw)
        return data if isinstance(data, dict) else {"raw": raw}
    except json.JSONDecodeError:
        return {"raw": raw}
