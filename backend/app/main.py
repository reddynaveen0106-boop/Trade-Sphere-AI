from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.country import router as country_router

app = FastAPI(
    title="Trade Sphere AI",
    version="1.0.0"
)

# React application URL
origins = [
    "http://localhost:5173",
]

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(country_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Trade Sphere AI API 🚀"
    }