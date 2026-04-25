# Full-Stack AI Assistant Starter Kit

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](https://nodejs.org/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](docker-compose.yml)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-f59e0b.svg)](#public-beta-status)

Build configurable AI assistant apps without starting from a blank repo.

This is a public beta, open-source starter kit for full-stack AI assistant prototypes. It includes a React + Vite frontend, a Node.js/Express backend, Redis-backed conversation memory, Groq-hosted Llama 3 responses, Docker Compose, and one-file assistant customization through `Backend/src/config/ai-config.json`.

Use it as a learning project, portfolio project, or reusable template for building focused assistants such as a study coach, customer support assistant, coding tutor, wellness companion, or internal knowledge helper.

## Who Is This For?

- CS students learning full-stack AI app architecture
- Junior developers building portfolio-ready projects
- AI-assisted builders who want a reusable starter template
- Developers who want a backend API pattern for LLM calls
- People who want to avoid exposing LLM API keys in frontend code

## What Can You Build With This?

- Study coach
- Customer support assistant
- Coding tutor
- Sales assistant
- Wellness companion
- Internal knowledge helper
- Language tutor
- Career coach

## Architecture Overview

```text
+-----------------------+
| Frontend              |
| React + Vite          |
| http://localhost:5173 |
+-----------+-----------+
            |
            | /api requests
            v
+-----------------------+
| Backend API           |
| Node.js + Express     |
| http://localhost:3000 |
+-----------+-----------+
            |
            | validated chat input
            v
+-----------------------------+
| Keyword Interceptor         |
| Basic blocked keyword check |
+-----------+-----------------+
            |
            | allowed request
            v
+-----------------------------+
| Assistant Orchestration     |
| Prompt + context builder    |
+-----------+-----------+-----+
            |           |
            v           v
+----------------+  +-------------------+
| Groq / Llama 3 |  | Redis Memory      |
| AI response    |  | Conversation data |
+----------------+  +-------------------+
```

## Features

- React + Vite frontend
- Express backend API
- Secure backend LLM API proxy pattern
- Redis-backed conversation memory
- Config-driven assistant behavior through `ai-config.json`
- Groq/Llama 3 provider setup
- Theme customization through JSON
- Basic blocked keyword starter mechanism
- Docker Compose setup
- Local setup without Docker
- Troubleshooting guidance for common setup issues

The blocked keyword system is a lightweight starter mechanism. It is useful for prototypes and simple routing, but it is not a complete safety, moderation, or compliance system.

## Prerequisites

Choose one setup path:

- **Docker path:** Docker Desktop or another Docker Compose compatible runtime
- **Local path:** Node.js 18 or newer, npm, and Redis

You also need a Groq API key.

## Quick Start With Docker

This is the recommended path for most users because it runs the frontend, backend, and Redis together.

1. Clone the repository. Replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` with the actual repository path:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Set your Groq API key for Docker Compose.

The simplest method is to pass it directly when you start the stack:

```bash
GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

You can also create a repo-root `.env` file next to `docker-compose.yml`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Then run:

```bash
docker compose up --build
```

3. Open the app:

```text
http://localhost:5173
```

4. Stop the stack:

```bash
docker compose down
```

## Dynamic Backend Port

The backend container always runs on port `3000` internally, but Docker Compose lets you choose the host port with `BACKEND_PORT`.

If port `3000` is already taken on your machine, run:

```bash
BACKEND_PORT=3001 GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

Then the backend API is available on:

```text
http://localhost:3001
```

The frontend still runs at:

```text
http://localhost:5173
```

If the frontend port is also taken, you can change it with `FRONTEND_PORT`:

```bash
BACKEND_PORT=3001 FRONTEND_PORT=5174 GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

Then open:

```text
http://localhost:5174
```

## Run Locally Without Docker

Use this path if you want to run Node and Redis directly on your machine.

1. Clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Create your backend environment file:

```bash
cp Backend/.env.example Backend/.env
```

3. Edit `Backend/.env`:

```env
PORT=3000
REDIS_URL=redis://127.0.0.1:6379
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=http://localhost:5173
DEBUG_AI=false
```

4. Install dependencies:

```bash
npm run install:all
```

5. Start Redis and confirm it is running:

```bash
redis-cli ping
```

Expected response:

```text
PONG
```

6. Start the backend:

```bash
npm run dev:backend
```

7. In a second terminal, start the frontend:

```bash
npm run dev:frontend
```

8. Open the app:

```text
http://localhost:5173
```

### Local Port Changes

For local development without Docker, set the backend `PORT` in `Backend/.env`.

If you change the backend to port `3001`, also point Vite's dev proxy at that port:

```bash
VITE_API_PROXY_TARGET=http://localhost:3001 npm run dev:frontend
```

## Claude-Assisted Config Workflow

This is not an official installable Claude Skill package yet. It is a copy-paste Claude-assisted workflow that helps users generate `ai-config.json` faster.

How it works:

1. Copy the master prompt below into Claude.
2. Describe the assistant you want to build.
3. Claude generates a complete `ai-config.json`.
4. Paste the generated JSON into `Backend/src/config/ai-config.json`.
5. Restart the app.

### Master Prompt

```text
Act as an expert AI Architect and product-focused prompt engineer.

I am using a Full-Stack AI Assistant Starter Kit built with React, Node.js, Redis, and Groq/Llama 3. The app is customized through one JSON file:

Backend/src/config/ai-config.json

Your job is to generate a high-quality ai-config.json for my app idea.

App idea:
<PASTE MY APP IDEA HERE>

Return only valid JSON. Do not wrap it in Markdown. Do not include comments.

The JSON must use exactly this top-level structure:

{
  "assistantName": "",
  "welcomeMessage": "",
  "systemPrompt": "",
  "model_settings": {
    "provider": "groq",
    "model_name": "llama-3.3-70b-versatile",
    "temperature": 0.7,
    "max_tokens": 1024
  },
  "ui_theme": {
    "light": {
      "page_bg": "",
      "panel_bg": "",
      "nav_bg": "",
      "text_color": "",
      "muted_color": "",
      "accent_color": "",
      "selected_color": "",
      "reply_bg": ""
    },
    "dark": {
      "page_bg": "",
      "panel_bg": "",
      "nav_bg": "",
      "text_color": "",
      "muted_color": "",
      "accent_color": "",
      "selected_color": "",
      "reply_bg": ""
    }
  },
  "blockedKeywords": [],
  "fallbackMessage": ""
}

Requirements:
- assistantName should be short, memorable, and specific to the app.
- welcomeMessage should greet the user and invite the first useful action.
- systemPrompt should define the assistant's role, tone, target user, boundaries, and response style.
- systemPrompt should include clear behavior rules for the app's domain.
- blockedKeywords should include domain-specific terms that should be intercepted before reaching the model.
- fallbackMessage should be polite, brief, and redirect the user toward an allowed request.
- theme colors must be valid hex colors.
- The light and dark themes should feel polished, readable, and appropriate for the app idea.
- Keep provider as "groq".
- Keep model_name as "llama-3.3-70b-versatile" unless I specifically request a different Groq model.
- Choose temperature and max_tokens based on the app type.
- Do not frame the assistant as a doctor, therapist, lawyer, financial advisor, or other licensed professional unless I explicitly provide a compliant product context.
- Return only the finished JSON object.
```

### Example App Ideas

- "Study coach for high school biology students"
- "Customer support assistant for a SaaS billing dashboard"
- "JavaScript debugging tutor for beginners"
- "Interview prep coach for product managers"
- "Restaurant concierge for a boutique hotel"
- "Internal HR policy assistant for a remote startup"

## How To Customize

Open:

```text
Backend/src/config/ai-config.json
```

Replace the file contents with your generated or hand-written JSON.

After changing the config, restart the backend. If you are using Docker, rebuild the stack:

```bash
docker compose down
GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

For more detail, see `docs/customization.md`.

## Environment Variables

Start from:

```bash
cp Backend/.env.example Backend/.env
```

Common backend variables:

```env
PORT=3000
REDIS_URL=redis://127.0.0.1:6379
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=http://localhost:5173
ASSISTANT_NAME=AI Assistant
WELCOME_MESSAGE=Hello! I am ready to help with whatever you are building.
SYSTEM_PROMPT=You are a helpful AI assistant.
AI_PROVIDER=groq
AI_MODEL_NAME=llama-3.3-70b-versatile
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=1024
BLOCKED_KEYWORDS=
FALLBACK_MESSAGE=I cannot process that request in this starter app.
DEBUG_AI=false
```

For Docker Compose, the most common command-level variables are:

```bash
GROQ_API_KEY=your_groq_api_key_here docker compose up --build
BACKEND_PORT=3001 GROQ_API_KEY=your_groq_api_key_here docker compose up --build
FRONTEND_PORT=5174 GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

Set `DEBUG_AI=true` only when you intentionally want to log prompts and model responses during local debugging. Do not enable it for real user traffic.

## Security Checklist

- Never commit real `.env` files.
- Never commit real API keys.
- Keep `DEBUG_AI=false` unless debugging locally.
- Do not log private user messages in production.
- Rotate any API key that was ever committed by mistake.
- Restrict `CORS_ORIGINS` to trusted frontend domains in production.
- Review generated prompts before using them in sensitive domains.
- Add rate limiting before public deployment.
- Do not commit Redis dumps, logs, or user data.

## Safety And Responsibility

This project is an educational starter kit for building AI assistant prototypes. It is not intended to provide medical, legal, financial, mental health, or other professional advice.

If you customize this starter kit for wellness, healthcare, HR, finance, legal, or other sensitive domains, you are responsible for adding appropriate safety checks, disclaimers, privacy protections, and human escalation paths.

The included blocked keyword and fallback message system is a lightweight starter mechanism, not a complete safety or compliance system.

## Public Beta Status

This repo is suitable for learning, prototyping, and portfolio use.

It is not production-ready by default. Before real public deployment, add authentication, rate limiting, stronger safety checks, a persistence strategy, monitoring, privacy review, and deployment-specific security hardening.

## Portfolio Highlights

- Full-stack client-server architecture
- Secure backend API pattern for LLM apps
- Environment-based API key management
- Redis-backed memory
- Config-driven AI assistant behavior
- Dockerized development workflow
- Claude-assisted config generation workflow

## Project Structure

```text
.
|-- Backend/
|   |-- Dockerfile
|   |-- server.js
|   |-- package.json
|   `-- src/
|       |-- config/
|       |   |-- ai-config.json
|       |   `-- aiConfig.js
|       |-- middleware/
|       |-- prompts/
|       |-- routes/
|       `-- services/
|-- Frontend/
|   |-- Dockerfile
|   |-- package.json
|   |-- vite.config.js
|   `-- src/
|       |-- components/
|       |-- i18n/
|       |-- services/
|       |-- App.jsx
|       `-- main.jsx
|-- docs/
|   `-- customization.md
|-- docker-compose.yml
|-- package.json
|-- CONTRIBUTING.md
|-- SECURITY.md
|-- LICENSE
`-- README.md
```

## Useful Commands

Install all dependencies:

```bash
npm run install:all
```

Run the backend locally:

```bash
npm run dev:backend
```

Run the frontend locally:

```bash
npm run dev:frontend
```

Run the full Docker stack:

```bash
GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

Run Docker with a different backend host port:

```bash
BACKEND_PORT=3001 GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

Stop Docker containers:

```bash
docker compose down
```

Build the frontend:

```bash
npm run build
```

Run frontend lint:

```bash
npm run lint
```

## Troubleshooting

### Port 3000 Is Already In Use

Use the dynamic backend port:

```bash
BACKEND_PORT=3001 GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

### Redis Connection Fails Locally

Make sure Redis is running:

```bash
redis-cli ping
```

If you are using Docker, Redis is included in `docker compose up --build`.

### The Assistant Says Groq Is Not Configured

Make sure `GROQ_API_KEY` is set in `Backend/.env` for local development or passed into Docker Compose:

```bash
GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

### The UI Did Not Update After Changing `ai-config.json`

Restart the backend. If you are using Docker, rebuild the stack:

```bash
docker compose down
GROQ_API_KEY=your_groq_api_key_here docker compose up --build
```

## License

MIT. See `LICENSE`.
