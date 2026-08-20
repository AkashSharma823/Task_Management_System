# Dexter Task Management System

A responsive task-management application closely matched to the supplied reference screens, including the login, board/list views, filters, field visibility, task detail, project views, profile, theme and color menus. It uses:

- **Frontend:** Next.js App Router + React + TypeScript + Tailwind CSS
- **Backend:** NestJS + TypeScript
- **Database:** SQLite with TypeORM
- **Authentication:** Guest login + Google Identity Services with JWT session
- **Themes:** Light/Dark plus accent colors, persisted in localStorage

## Features

- Guest login screen with persistent session
- Google Sign-In using the current Google Identity Services web flow
- Google ID-token verification on the NestJS server before creating/signing in a user
- Google account linking by verified email and stable Google `sub` ID
- Google logo rendered in the login button
- Tasks: board and list views
- Search tasks
- Field visibility controls
- Filters for status, priority, members, due date, teams, labels and reporter
- Task detail page with labels, subtasks, comments, updates and editable properties
- Projects list and project detail views
- Profile/settings screen
- Light/Dark mode
- Accent color selection: Amber, Blue, Pink, Rose, Emerald and Black
- Responsive desktop/tablet/mobile layout
- Visual refresh: compact spacing, thin borders, pill buttons/chips, four-column Kanban board, grouped list tables, account menu, field/filter popovers, task detail property controls, and profile theme/color popovers
- Reusable frontend components
- NestJS REST API with DTO validation
- SQLite persistence seeded with demo data

## Project structure

```text
task-management-system/
  backend/
    src/
      auth/
      comments/
      projects/
      tasks/
      users/
      app.module.ts
      main.ts
    data/
    package.json
    tsconfig.json
  frontend/
    app/
    components/
    lib/
    package.json
    tailwind.config.ts
    tsconfig.json
  reference/
  README.md
```

## Prerequisites

- Node.js 20+
- npm 10+

## 1. Start backend

```bash
cd backend
npm install
npm run start:dev
```

Backend runs on `http://localhost:4000`.

## 2. Start frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## 3. Guest login

Open `http://localhost:3000` and click **Continue as Guest**. The frontend calls `POST /auth/guest`, stores the JWT in localStorage, and then loads the task workspace.


## 4. Configure Google login

Google login is implemented with **Google Identity Services (GIS)**. The browser receives a Google ID-token credential and sends it to `POST /auth/google`; the NestJS backend verifies that token against the configured web client ID before issuing the Dexter JWT. Google recommends verifying ID tokens on the server with Google's Node.js client library.

1. Open Google Cloud Console and create/select a project.
2. Configure the OAuth consent screen / Google Auth Platform for the app.
3. Create an **OAuth Client ID** for a **Web application**.
4. Add this JavaScript origin for local development:

```text
http://localhost:3000
```

5. Copy the client ID into both `frontend/.env.local` as `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and `backend/.env` as `GOOGLE_CLIENT_ID`.
6. Start the backend and frontend, then click the **Login with Google** button. Google will show the account selector; after successful verification the returned user is stored in SQLite and a Dexter JWT session is created.

For production, replace the localhost origin with your real HTTPS frontend origin and use the same Google web client ID in the frontend and backend. No Google client secret is placed in the frontend.

## Auth API

`POST /auth/google`

Request body:

```json
{
  "credential": "GOOGLE_ID_TOKEN"
}
```

The backend validates the token signature, audience, issuer and expiry through `google-auth-library`, requires a verified email, finds/links the account by Google ID or email, and returns the normal Dexter `{ accessToken, user }` response.

## API

### Auth

`POST /auth/guest`

Returns a guest user and JWT access token.

### Tasks

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

Query parameters supported by `GET /tasks` include `search`, `status`, `priority`, `memberId`, `reporterId`, `projectId`, and `view`.

### Projects

- `GET /projects`
- `GET /projects/:id`
- `POST /projects`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

### Comments

- `GET /tasks/:taskId/comments`
- `POST /tasks/:taskId/comments`

## Environment variables

Frontend (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

Backend (`backend/.env`):

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=change-me-in-development
GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

The app will use these defaults when the files are not present.

## Notes

This project intentionally uses a lightweight SQLite database so it can be cloned and run without installing PostgreSQL or MongoDB. The backend seeds demo records automatically on first run.

The `reference/` directory contains the supplied images used to reproduce the visual language and interactions.

## SQLite / TypeORM note

Nullable string entity fields use explicit SQLite-compatible `varchar` types (for example `User.avatarUrl`) so TypeORM does not infer the TypeScript union type `string | null` as `Object`.

If an older local database was created before this fix, delete `backend/data/dexter.sqlite` and start the backend again so TypeORM can recreate the schema.

## Validation note

The frontend source was syntax-checked with the TypeScript compiler. A full Next.js production build was not completed in the sandbox because dependency installation (`npm install`) timed out before `node_modules` was available.
