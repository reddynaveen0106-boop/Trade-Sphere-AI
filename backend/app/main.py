from fastapi import FastAPI

app = FastAPI(
    title="TradeSphere AI API",
    description="Backend API for TradeSphere AI",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to TradeSphere AI Backend 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }