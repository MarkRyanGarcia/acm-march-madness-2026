from fastapi import APIRouter, Depends, Header, HTTPException
from app.core.security import verify_clerk_token

router = APIRouter()

async def get_current_user(authorization: str = Header(...)):
    try:
        token = authorization.replace("Bearer ", "")
        payload = await verify_clerk_token(token)
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/protected")
async def protected_route(user=Depends(get_current_user)):
    return {
        "user_id": user["sub"],
        "email": user.get("email")
    }