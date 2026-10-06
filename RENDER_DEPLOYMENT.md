# AGUNITY on Render + Vercel + Supabase

The web app can be deployed as a public client and API plus one managed database:

- `client` on Vercel
- `server` on Render
- PostgreSQL on Supabase

The `ai-service` is not ready to deploy yet: `app.main` imports route, settings,
and scheduler modules that are not present in the repository. Deploy it only
after those modules have been implemented.

## 1. Create the Database

1. Create a Supabase project.
2. Open Settings -> Database and copy the connection string.
3. Add `DATABASE_SSL=true` in the server environment variables.

### Optional starter tables

Use the SQL editor only if you want a minimal starter schema. The app also creates and syncs its own tables during startup.

## 2. Deploy the Backend on Render

Create a new Web Service from the GitHub repo.

- Root Directory: `server`
- Build Command: `npm ci`
- Start Command: `npm start`

Set these environment variables:

- `DATABASE_URL=<your Supabase connection string>`
- `DATABASE_SSL=true`
- `JWT_SECRET=<long-random-secret>`
- `PUBLIC_API_BASE_URL=https://<your-server-domain>`

The server uses Render's `PORT` automatically. Do not set `SERVER_PORT` unless
you need to override Render's assigned port.

Health check:

- `GET /health`

## 3. Deploy the Client on Vercel

Import the GitHub repo into Vercel.

- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Set one of these environment variables:

- `VITE_API_BASE_URL=https://<your-server-domain>`

## 4. Common Fixes

- If the frontend cannot talk to the backend, verify `VITE_API_BASE_URL` is the API origin without a trailing `/api`.
- If Postgres rejects the connection, ensure `DATABASE_SSL=true` is set for Supabase.
- If the first request is slow on free tiers, that is usually cold start behavior.
