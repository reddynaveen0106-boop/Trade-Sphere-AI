from fastapi import APIRouter, HTTPException
import traceback

from app.ai.service import ask_gemini
from app.schemas.ai import AIQueryRequest, AIQueryResponse

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/query", response_model=AIQueryResponse)
def query_ai(request: AIQueryRequest):
    try:
        answer = ask_gemini(request.question)
        return AIQueryResponse(answer=answer)
    except Exception as e:
     traceback.print_exc()
     raise HTTPException(status_code=500, detail=str(e))