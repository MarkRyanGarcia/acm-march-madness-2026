from clerk_backend_api import AuthenticateRequestOptions, Clerk
from fastapi import HTTPException, Request, status

from app.core.config import CLERK_SECRET_KEY

clerk = Clerk(bearer_auth=CLERK_SECRET_KEY)


def require_clerk_auth(request: Request) -> str:
    auth_state = clerk.authenticate_request(request, AuthenticateRequestOptions())
    print(auth_state)
    if not auth_state.is_signed_in:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Unauthorized",
                "reason": str(auth_state.reason),
            },
        )
    if not auth_state.payload or not auth_state.payload.get("sub"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"message": "Unauthorized", "reason": "Unable to retrieve user_id"},
        )

    return auth_state.payload["sub"]
