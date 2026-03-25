from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
     allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

SYSTEM_PROMPT = """You are Jyotish AI, a wise and deeply knowledgeable Vedic astrology assistant for DM Astrology, the practice of Dr. Dharmesh M. Mehta — a renowned Vedic astrologer with 30+ years of experience based in Mumbai, India.

Your role:
- Answer questions about Vedic astrology, Kundali, birth charts, planetary transits, zodiac signs, nakshatras, doshas, remedies, Vaastu Shastra, numerology, gemstones, and spiritual guidance
- Be warm, wise, poetic, and deeply insightful — like a knowledgeable sage, not a cold chatbot
- Keep responses concise (3-5 sentences max) unless a detailed answer is truly needed
- Naturally encourage users to book a personal consultation with Dr. Mehta for deep, personalized readings
- Never make specific predictions about death, severe illness, or extreme misfortune
- If asked something outside astrology, gently redirect back to your domain

Sign off occasionally with Jyotish AI for a personal touch.
Dr. Mehta YouTube: https://www.youtube.com/@DMAstrology"""


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not ANTHROPIC_API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")

    filtered = [
        {"role": m.role, "content": m.content}
        for m in request.messages
        if m.role in ("user", "assistant")
    ]

    while len(filtered) > 0 and filtered[0]["role"] == "assistant":
        filtered.pop(0)

    if len(filtered) == 0:
        raise HTTPException(status_code=400, detail="No valid messages provided")

    # 👇 Add this to see exactly what we're sending
    # print("Sending to Anthropic:", filtered)

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-opus-4-6",  # 👈 updated model name
                    "max_tokens": 1000,
                    "system": SYSTEM_PROMPT,
                    "messages": filtered,
                },
            )

            # 👇 Add this to see exact Anthropic error
            # print("Anthropic status:", response.status_code)
            # print("Anthropic response:", response.text)

            response.raise_for_status()
            data = response.json()
            return {"reply": data["content"][0]["text"]}

        except httpx.HTTPStatusError as e:
            # 👇 Return full Anthropic error to browser
            raise HTTPException(
                status_code=e.response.status_code,
                detail=e.response.text
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if not ANTHROPIC_API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")

    # Filter only valid roles
    filtered = [
        {"role": m.role, "content": m.content}
        for m in request.messages
        if m.role in ("user", "assistant")
    ]

    # Anthropic requires conversation to always start with a user message
    while len(filtered) > 0 and filtered[0]["role"] == "assistant":
        filtered.pop(0)

    # Must have at least one message
    if len(filtered) == 0:
        raise HTTPException(status_code=400, detail="No valid messages provided")

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-sonnet-4-20250514",
                    "max_tokens": 1000,
                    "system": SYSTEM_PROMPT,
                    "messages": filtered,
                },
            )
            response.raise_for_status()
            data = response.json()
            return {"reply": data["content"][0]["text"]}

        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def root():
    return {"status": "Jyotish AI backend is running ✦"}