from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import problems, teams, users, leaderboard
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://madness.markgarcia.dev",
    "https://madness.acmcsuf.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Change this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(teams.router)
app.include_router(problems.router)
app.include_router(leaderboard.router)
