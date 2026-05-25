# Todo App

Full-stack todo application with categories.

- **Frontend**: React 19, Vite, Tailwind CSS v4, TypeScript
- **Backend**: NestJS 11, SQLite (better-sqlite3), Drizzle ORM

## Prerequisites

- Node.js >= 22
- pnpm 10 (`npm install -g pnpm@10`)

## Quick Start

```bash
# Install dependencies
cd apps/backend && pnpm install
cd ../frontend && pnpm install

# Run backend (port 3000)
cd ../backend && pnpm start:dev

# Run frontend (port 5173) — in another terminal
cd ../frontend && pnpm dev
```

Frontend is at `http://localhost:5173`, backend at `http://localhost:3000`.

## Docker

```bash
docker-compose up
```

Frontend is at `http://localhost`, backend at `http://localhost:3000`.

## Environment

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` (frontend) | `http://localhost:3000` | Backend URL |
| `PORT` (backend) | `3000` | Backend port |
| `CORS_ORIGIN` (backend) | `http://localhost,http://localhost:80` | Allowed CORS origins (comma-separated) |
