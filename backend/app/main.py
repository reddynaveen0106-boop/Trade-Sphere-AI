from fastapi import FastAPI

from app.api.country import router as country_router

app = FastAPI(
    title="Trade Sphere AI",
    version="1.0.0"
)

app.include_router(country_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Trade Sphere AI API 🚀"
    }