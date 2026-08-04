"""OCR-assisted text extraction (Tesseract) with Gemini vision fallback."""

from __future__ import annotations

import io
import os
import shutil
import subprocess

import google.generativeai as genai
import pytesseract
from PIL import Image

from caption import _run


def extract_text(image_bytes: bytes) -> str:
    """Extract text via Tesseract; fall back to the vision model when needed."""
    if shutil.which("tesseract"):
        try:
            img = Image.open(io.BytesIO(image_bytes))
            return (pytesseract.image_to_string(img) or "").strip()
        except Exception:
            pass

    key = os.environ.get("GEMINI_API_KEY", "")
    if key:
        return _run(
            "Transcribe ALL readable text in this image verbatim. Return the "
            "text only, preserving line order.",
            image_bytes,
        )
    return ""


def tesseract_available() -> bool:
    return shutil.which("tesseract") is not None or _tesseract_binary()

def _tesseract_binary() -> bool:
    try:
        subprocess.run(["tesseract", "--version"], capture_output=True, check=True)
        return True
    except Exception:
        return False
