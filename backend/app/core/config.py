import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost/dbname",  # fallback for local dev
)
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY", "sk-...")
DEBUG = os.getenv("DEBUG", "true").lower() in ("true", "1", "yes")
