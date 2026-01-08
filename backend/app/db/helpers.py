from clerk_backend_api import RequestState
from fastapi import HTTPException


def get_current_user_id(auth: RequestState):
    if not auth.payload or not auth.payload.get("sub"):
        raise HTTPException(status_code=401, detail="Unauthorized")

    return auth.payload["sub"]
