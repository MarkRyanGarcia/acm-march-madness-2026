import os
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

# -----------------------------
# Database
# -----------------------------
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost/dbname",  # fallback for local dev
)

# -----------------------------
# Clerk
# -----------------------------
CLERK_JWKS_URL = os.getenv(
    "CLERK_JWKS_URL",
    "https://your-clerk-domain.clerk.accounts.dev/.well-known/jwks.json",
)
CLERK_ISSUER = os.getenv("CLERK_ISSUER", "https://your-clerk-domain.clerk.accounts.dev")

# -----------------------------
# Other settings (optional)
# -----------------------------
DEBUG = os.getenv("DEBUG", "true").lower() in ("true", "1", "yes")

