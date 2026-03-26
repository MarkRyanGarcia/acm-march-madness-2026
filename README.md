# ACM March Madness 2026
## https://madness.acmcsuf.com/
<img width="1710" height="965" alt="Screenshot 2026-03-25 at 9 22 28 PM" src="https://github.com/user-attachments/assets/767c3b44-9224-4bde-b8c5-3065aa5ce9f2" />

A competitive programming event platform built for [ACM at CSUF](https://acmcsuf.com). Teams solve daily algorithmic puzzles over 5 days, earn points, and compete on a live leaderboard.

## What it is

Each day a new problem is released with a generated input file. Teams parse the input, solve two parts of the problem, and submit their integer answers. Points are awarded per correct part, with a time-based scoring component. The leaderboard tracks total points and which problems each team has solved (visualized as eggs).
<img width="1710" height="963" alt="Screenshot 2026-03-26 at 1 07 16 AM" src="https://github.com/user-attachments/assets/081be8ea-fbe7-4f76-b9cd-32a1a3c49d9b" />


## Tech Stack

**Frontend**
- React 19 + TypeScript + Vite
- TanStack Router (file-based routing) + TanStack Query
- Tailwind CSS
- Clerk for authentication

**Backend**
- FastAPI + Python
- SQLAlchemy ORM + PostgreSQL (Neon)
- Alembic for migrations
- Clerk JWT verification

## Features

- User auth via Clerk (sign in required to compete)
- Team creation, invite codes, member management
- Daily problem release with seeded input generation
- Two-part answer submission with attempt tracking
- Live leaderboard with per-problem solve status
- Problem READMEs rendered as Markdown in the UI

## Project Structure

```
backend/
  app/
    routers/       # FastAPI route handlers (users, teams, problems, leaderboard)
    db/            # SQLAlchemy models, queries, mappers
    schemas/       # Pydantic request/response schemas
    deps/          # Auth and DB dependency injection
  problems/        # Problem definitions (input generation + solutions)
    base.py        # Abstract Problem class
    event.py       # Problem registry with release times
    _00_ ... _05_  # Individual problem implementations

frontend/
  src/
    routes/        # File-based pages (home, team, leaderboard, problems)
    client/        # API client hooks (TanStack Query)
    components/    # Shared UI components
```

## Running Locally

**Backend**
/backend/.env:
```
DATABASE_URL=postgresql://user:password@localhost/dbname
CLERK_SECRET_KEY=
DEBUG="true"
ENV="production"
```
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

**Frontend**
/frontend/.env:
```
VITE_API_BACKEND_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=
```
```bash
cd frontend
npm install
npm run dev
```

<img width="1710" height="961" alt="Screenshot 2026-03-26 at 12 21 22 AM" src="https://github.com/user-attachments/assets/52d002d4-1f86-4522-b516-54cb38442f46" />
<img width="1709" height="963" alt="Screenshot 2026-03-26 at 12 19 54 AM" src="https://github.com/user-attachments/assets/d40deb9e-b3d7-47b6-b875-d5fb2751d4ec" />

