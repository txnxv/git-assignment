
# Git Assignment — Vite + React + shadcn + TypeScript

This repository contains a small contacts app built with a Vite + React + TypeScript frontend and a lightweight Express + SQLite backend. The frontend uses shadcn-style UI components and Radix UI primitives; the backend provides a simple REST API for managing contacts.

**Quick Links**

- **Frontend**: `./` (root of this repo) — Vite app
- **Backend**: `./backend` — Express + SQLite API

**What you get**

- A modern Vite + React + TypeScript frontend scaffolded with shadcn UI components.
- A simple Express backend that persists contacts to an SQLite database.
- Example components in `src/components` and a small UI library under `src/components/ui`.

## Prerequisites

- Node.js (v18+) or a compatible runtime. You can use `npm`, `pnpm`, or `bun` — this repo includes a `bun.lockb` but uses standard `package.json` scripts.
- Git (optional, for cloning/updating the repo).

## Frontend — Setup & Run

From the project root (`/git-assignment`):

1. Install dependencies

```powershell
npm install
```

2. Start the development server (Vite)

```powershell
npm run dev
```

This will start Vite (default: http://localhost:5173). Available scripts from `package.json`:

- `npm run dev` — start development server
- `npm run build` — build production bundle
- `npm run build:dev` — build in development mode
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint across the codebase

Notes:
- The frontend is TypeScript-based. If your editor needs type information, ensure `typescript` is installed (it's included in `devDependencies`).

## Backend — Setup & Run

The backend lives in `./backend`. It provides a simple REST API on port `4000` and uses SQLite for persistence.

1. Install backend dependencies and start the server:

```powershell
cd backend; npm install
npm run start
```

2. For development with auto-reload (requires `nodemon`):

```powershell
cd backend; npm run dev
```

Backend scripts (from `backend/package.json`):

- `npm run start` — start backend (`node index.js`)
- `npm run dev` — start backend with `nodemon` for auto-restart

API endpoints (partial):

- `GET /api/contacts` — list all contacts (supports `q` query param to search)
- `POST /api/contacts` — create a contact
- `PUT /api/contacts/:id` — update a contact
- `DELETE /api/contacts/:id` — delete a contact

The backend listens on `http://localhost:4000` by default (see `backend/index.js`).

## Project Structure (important files)

- `index.html` — Vite entry
- `src/main.tsx` — React entry
- `src/App.tsx` — main app
- `src/components/` — UI components and `ui/` primitives
- `src/pages/` — app pages (`Index.tsx`, `NotFound.tsx`)
- `src/types/` — domain types (e.g., `contact.ts`)
- `backend/index.js` — Express app and API routes
- `backend/db.js` — SQLite DB helpers

## Technologies

- Frontend: Vite, React 18, TypeScript, Tailwind CSS, Radix UI
- Backend: Node.js, Express, SQLite
- Tooling: ESLint, PostCSS, Tailwind

## Development Tips

- If you change the API port or routes, update the frontend API calls accordingly (`src/lib/utils.ts` or components that call `/api/contacts`).
- To inspect the SQLite DB, open the file created by `backend/db.js` with any SQLite viewer.

## Contributing

- Fork or branch, make changes, and open a pull request with a clear description of the change.

## License

This repository does not contain an explicit license file. Add one if you plan to publish or share the project.

---

If you'd like, I can also:

- add a `README` badge for the backend and frontend start commands,
- create a small `Makefile`/`ps1` helper for starting both servers, or
- run the frontend + backend locally and confirm both start successfully.

README generated/updated by GitHub Copilot.
