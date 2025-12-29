from jose import jwt
import httpx
from app.core.config import CLERK_JWKS_URL, CLERK_ISSUER

jwks = None

async def get_jwks():
    global jwks
    if jwks is None:
        async with httpx.AsyncClient() as client:
            res = await client.get(CLERK_JWKS_URL)
            jwks = res.json()
    return jwks

async def verify_clerk_token(token: str):
    jwks = await get_jwks()

    return jwt.decode(
        token,
        jwks,
        algorithms=["RS256"],
        audience=None,
        issuer=CLERK_ISSUER
    )