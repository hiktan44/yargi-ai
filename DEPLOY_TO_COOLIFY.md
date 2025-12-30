# Yargi-AI Coolify Deployment Guide

This guide describes how to deploy the **Yargi-AI** project to a self-hosted [Coolify](https://coolify.io/) instance.

## Prerequisites

- A self-hosted Coolify instance.
- This repository pushed to a Git provider (GitHub, GitLab, etc.).

## Project Structure Changes

We have added the following files to support deployment:
- `Dockerfile.frontend`: Dedicated build file for the React frontend.
- `nginx-frontend.conf`: Nginx configuration to serve the frontend and proxy API requests.
- `docker-compose.yaml`: A Docker Compose file optimized for Coolify.

## Deployment Steps

### 1. Add Project to Coolify

1.  Go to your Coolify dashboard.
2.  Select **"Create New Resource"**.
3.  Choose **"Git Repository"** (or "Public Repository" if it's public).
4.  Select this repository.

### 2. Configure Build Pack

1.  When asked for the **"Build Pack"**, choose **"Docker Compose"**.
2.  Coolify should automatically detect `docker-compose.yaml`.

### 3. Environment Variables

Go to the **Environment Variables** section of your application in Coolify and add the necessary secrets.

**Backend Service:**
You likely need variables for Supabase and OpenAI.
*   `OPENAI_API_KEY`
*   `SUPABASE_URL`
*   `SUPABASE_ANON_KEY`

> [!CAUTION]
> **Security Notice**: Currently, `src/lib/supabase.ts` contains a **hardcoded** `OPENAI_API_KEY`. This is risky.
> Restrict this key's usage on the OpenAI dashboard if possible, or refactor the app to make these calls from the backend only.

### 4. Domains

1.  In the Coolify settings for the **frontend** service, set your public domain (e.g., `https://yargi-ai.yourdomain.com`).
2.  The backend service does not necessarily need a public domain if Nginx handles the proxying internally via `http://backend:8000`. However, if your frontend makes direct calls to the backend (not via `/api`), you will need to expose the backend on a subdomain (e.g., `https://api.yargi-ai.yourdomain.com`) and update `VITE_BACKEND_URL`.

### 5. Deploy

Click **"Deploy"**. Coolify will:
1.  Build the Frontend using `Dockerfile.frontend`.
2.  Build the Backend using `backend/Dockerfile`.
3.  Start both services.

## Troubleshooting

-   **502 Bad Gateway**: Check the "Logs" in Coolify. It usually means the backend failed to start or Nginx cannot reach the backend host.
-   **CORS Errors**: If you are accessing the backend directly (not via Nginx proxy), ensure the backend is configured to accept requests from your frontend domain.

## Local Testing with this configuration

You can test this configuration locally before pushing:

```bash
docker compose up --build
```

Then visit `http://localhost:3000`.
