from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.country import router as country_router
from app.ai.ai import router as ai_router

app = FastAPI(
    title="Trade Sphere AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(country_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "message": "Trade Sphere AI Backend is running 🚀"
    }