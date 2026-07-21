import os
from dotenv import load_dotenv
from google.genai import types

from app.ai.client import client
from app.ai.prompts import SYSTEM_PROMPT

load_dotenv()

MODEL = os.getenv("GEMINI_MODEL", "gemini-flash-latest")


def ask_gemini(question: str) -> str:
    response = client.models.generate_content(
        model=MODEL,
        contents=question,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            temperature=0.3,
        ),
    )

    return response.text