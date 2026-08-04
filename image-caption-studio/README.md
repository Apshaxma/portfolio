# 🖼️ Image Caption Studio

Multimodal image understanding: rich captions, scene detection, structured
details and OCR-assisted text extraction — all from a single uploaded image.

Built as part of [Ashutosh Sharma's](https://github.com/Apshaxma) portfolio.

## What it does

1. **Captions** — a Gemini vision model writes a rich, natural-language caption.
2. **Scene detection** — lists the objects, activities and scenes it finds.
3. **Structured details** — extracts a JSON-ish breakdown (subject, setting, colors, visible text).
4. **OCR** — pulls readable text with Tesseract when available, with a vision-model fallback.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Tesseract is optional but recommended for OCR:
#   Ubuntu/Debian:  sudo apt install tesseract-ocr
#   macOS (Homebrew): brew install tesseract
#   Windows:        https://github.com/UB-Mannheim/tesseract/wiki

export GEMINI_API_KEY="your-google-ai-studio-key"   # or paste it in the sidebar

streamlit run app.py
```

## Architecture

```
┌────────────┐   ┌──────────────┐   ┌─────────────┐
│  Streamlit │──▶│  caption.py  │──▶│  Gemini     │
│  UI        │   │  (vision)    │   │  Vision     │
│            │──▶│  ocr.py      │──▶│  Tesseract  │
└────────────┘   └──────────────┘   └─────────────┘
```

## Stack

Python · Google Gemini (vision) · Tesseract OCR · Pillow · Streamlit
