"""Image Caption Studio — Streamlit app.

Upload an image: get rich captions, detected scenes, structured details
and OCR-assisted text extraction.
"""

from __future__ import annotations

import os

import streamlit as st

from caption import (
    analyze_image,
    caption_image,
    detect_scenes,
    extract_details,
)
from ocr import extract_text

st.set_page_config(page_title="Image Caption Studio", page_icon="🖼️", layout="wide")

st.title("🖼️ Image Caption Studio")
st.caption("Multimodal image understanding — captions, scenes, structured details & OCR.")

with st.sidebar:
    st.header("Configuration")
    key = st.text_input(
        "Google Gemini API key",
        type="password",
        help="Optional — falls back to the GEMINI_API_KEY environment variable.",
    )
    if key:
        os.environ["GEMINI_API_KEY"] = key

    st.info(
        "Powered by a Gemini vision model. OCR uses Tesseract when installed, "
        "or Gemini's built-in vision for on-image text."
    )

uploaded = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png", "webp"])

if uploaded is not None:
    image_bytes = uploaded.getvalue()
    st.image(image_bytes, caption=uploaded.name, use_container_width=True)

    if st.button("✨ Analyze", type="primary", use_container_width=True):
        try:
            with st.spinner("Looking at the image…"):
                caption = caption_image(image_bytes)
                scenes = detect_scenes(image_bytes)
                details = extract_details(image_bytes)
                ocr_text = extract_text(image_bytes)

            st.subheader("📸 Caption")
            st.write(caption)

            col_a, col_b = st.columns(2)
            with col_a:
                st.markdown("**🎯 Detected scenes**")
                for scene in scenes:
                    st.markdown(f"- {scene}")
            with col_b:
                st.markdown("**🔍 OCR text**")
                st.code(ocr_text or "(no text detected)", language=None)

            st.markdown("**🗂 Structured details**")
            for key_, value in details.items():
                st.markdown(f"- **{key_}:** {value}")
        except Exception as exc:  # noqa: BLE001 — surface errors in the UI
            st.error(f"Something went wrong: {exc}")

st.markdown("---")
st.caption("Built with Gemini Vision · Tesseract · Streamlit — see the repo README for setup.")
