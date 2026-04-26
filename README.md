# Full-Stack AI Assistant Starter Kit
Build configurable full-stack AI assistants faster with secure backend LLM calls, Redis-powered memory, Dockerized local setup, and Codex-ready customization.

[English](README.md) | [Tiếng Việt](README.vi.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

A lightweight, Codex-ready full-stack starter kit for building configurable AI assistant apps with secure backend LLM calls, Redis-backed prompt memory, Dockerized local development, and zero-code assistant customization through one JSON file.

<p align="center">
  <img src="https://raw.githubusercontent.com/mykyquan/Full-Stack-AI-Assistant-Starter-Kit/main/docs/assets/demo.gif" width="800" alt="Full-Stack AI Assistant Demo">
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](https://nodejs.org/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](docker-compose.yml)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-f59e0b.svg)](#public-beta-status)

It includes a React + Vite frontend, Node.js/Express backend, Redis conversation memory that is injected into the LLM prompt, Groq/Llama responses, Docker Compose, multilingual docs, ready-to-copy presets, and project-specific Codex guidance.

## Why Use This Starter Kit?

- Many beginner AI apps expose API keys in frontend code.
- This repo keeps LLM calls on the backend through a secure API proxy pattern.
- It uses Redis-backed memory.
- It uses one JSON config file for assistant behavior and theme.
- It is intentionally lightweight compared with enterprise AI agent generators.
- It is easier for students and junior developers to understand and customize.
- Use this repo when you want Codex to customize an AI assistant app, not invent the whole architecture from scratch.

## Why Clone This?

This repo is designed for builders who want a real AI app foundation instead of another single-file chat demo.

You get:

- A working full-stack architecture with frontend, backend, Redis, and Docker
- A backend-only LLM integration pattern that avoids exposing API keys in frontend code
- Redis-backed memory that is actually included in the model context
- A beginner-friendly config system for creating new assistant personas without rewriting code
- Presets and docs that make the repo easy to customize with Codex or another AI coding assistant
- Public-beta safety language that avoids overclaiming production readiness

## Who Is This For?

- **Junior engineers** learning how frontend, backend, Redis, Docker, and LLM APIs fit together in a real AI app.
- **Frontend developers** who want a ready backend for secure AI calls instead of putting API keys in browser code.
- **AI-assisted builders** who want Codex to customize an existing architecture rather than invent one from scratch.
- **Portfolio builders** who want a clear, explainable full-stack AI project with practical engineering tradeoffs.
- **Open-source maintainers** looking for a lightweight starter kit with docs, presets, safety notes, and verification commands.
- **Developers building prototypes** such as study coaches, coding tutors, support assistants, sales helpers, language tutors, or internal knowledge assistants.

## What Can You Build With This?

- Study coach
- Coding tutor
- Customer support assistant
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

## True AI Memory

This starter kit includes Redis-backed assistant memory that is used by the model, not just displayed in the UI.

When a user sends a message:

1. The frontend sends the selected context and message to the backend.
2. The backend stores recent prompt context in Redis.
3. The chat route fetches a bounded recent history window from Redis.
4. The prompt builder injects that recent history into the Groq message payload.
5. The model receives the current message plus recent conversation context.

This gives the assistant practical short-term memory while keeping the implementation easy to inspect and customize.

Current memory is intentionally simple for learning and prototyping: it stores recent user/context entries. Projects that need richer production memory can extend this into role-based transcripts, summaries, user-scoped sessions, or retrieval-backed memory.

## Features

- React + Vite frontend with chat UI, theme support, language switching, and prompt history
- Express backend API that keeps Groq credentials out of browser code
- Secure backend LLM API proxy pattern for Groq/Llama responses
- True AI Memory: recent Redis history is injected into the LLM prompt, not only displayed in the UI
- Bounded Redis memory window to keep assistant context useful and predictable
- Config-driven assistant behavior through `Backend/src/config/ai-config.json`
- Zero-code assistant customization for name, welcome message, system prompt, model settings, theme, blocked keywords, and fallback message
- Ready-to-copy presets for Study Coach, Coding Tutor, Customer Support, Sales, Wellness, Language Tutor, and Career Coach use cases
- Lightweight blocked keyword starter mechanism
- 30-second provider timeout for external LLM calls
- Graceful backend shutdown with safe Redis disconnect handling
- Strict request validation for malformed payloads
- Non-blocking frontend history save flow so chat can continue if Redis saving fails
- Docker Compose setup with persistent Redis volume
- Dynamic Docker ports for local development
- Codex-ready `AGENTS.md`, docs, and optional config-generation skill
- Multilingual documentation in English, Vietnamese, Traditional Chinese, and Simplified Chinese
- `npm run doctor` readiness check

The blocked keyword system is a lightweight starter mechanism. It is not a complete safety, moderation, or compliance system.

## Quick Start With Docker

1. Clone the repository. Replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` with the actual repository path:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Create a repo-root `.env` file next to `docker-compose.yml`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

3. Start the full stack:

```bash
docker compose up --build
```

4. Open the app:

```text
http://localhost:5173
```

5. Stop the stack:

```bash
docker compose down
```

Redis data is stored in the named Docker volume `redis_data`, so conversation history survives normal container recreation. To reset Docker Redis memory, remove volumes too:

```bash
docker compose down -v
```

### Dynamic Backend Port

The backend container runs on port `3000` internally, but Docker Compose lets you choose the host port with `BACKEND_PORT`.

If port `3000` is taken:

```bash
BACKEND_PORT=3001 docker compose up --build
```

If the frontend port is also taken:

```bash
BACKEND_PORT=3001 FRONTEND_PORT=5174 docker compose up --build
```

Then open:

```text
http://localhost:5174
```

## Run Locally Without Docker

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

If you change the backend to port `3001`, point Vite's dev proxy at that port:

```bash
VITE_API_PROXY_TARGET=http://localhost:3001 npm run dev:frontend
```

## Using Presets

The `presets/` folder contains ready-to-copy examples:

- `study-coach.json`
- `coding-tutor.json`
- `customer-support.json`
- `sales-assistant.json`
- `wellness-companion.json`
- `language-tutor.json`
- `career-coach.json`

Copy a preset into the active config:

```bash
cp presets/study-coach.json Backend/src/config/ai-config.json
```

Validate the JSON:

```bash
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
```

Restart the app after replacing the config. See `docs/presets.md` for details.

## Using This Repo With Codex

This repo includes `AGENTS.md` for Codex guidance and an optional `ai-assistant-config-generator` skill.

Codex can generate, review, and validate `Backend/src/config/ai-config.json` while following project-specific safety and documentation rules.

Use this repo when you want Codex to customize an AI assistant app, not invent the entire architecture from scratch.

See `docs/codex.md` for example prompts and verification commands.

This is not an official Codex plugin. It is repo-local guidance and an optional skill for a public beta starter kit.

## Why This Works Well With Codex

This repo gives Codex strong project rails:

- `AGENTS.md` explains the project purpose, safety rules, important files, and verification commands.
- `docs/codex.md` provides example prompts for common customization tasks.
- `.agents/skills/ai-assistant-config-generator/SKILL.md` helps generate and validate `ai-config.json`.
- `presets/` gives Codex concrete examples of assistant configurations.
- `npm run doctor`, `npm run build`, `npm run lint`, and `docker compose config` make changes easy to verify.

Use this repo when you want Codex to customize a working assistant app, not design the entire stack from a blank prompt.

## Claude-Assisted Config Workflow

This is not an official installable Claude Skill package. It is a copy-paste Claude-assisted workflow that helps users generate `ai-config.json` faster.

1. Copy the master prompt below into Claude.
2. Describe the assistant you want.
3. Claude generates a complete `ai-config.json`.
4. Paste it into `Backend/src/config/ai-config.json`.
5. Restart the app.

### Master Prompt

```text
Act as an expert AI Architect and product-focused prompt engineer.

I am using a Full-Stack AI Assistant Starter Kit built with React, Node.js, Redis, and Groq/Llama 3. The app is customized through one JSON file:

Backend/src/config/ai-config.json

Generate a high-quality ai-config.json for my app idea.

App idea:
<PASTE MY APP IDEA HERE>

Return only valid JSON. Do not wrap it in Markdown. Do not include comments.

Use the exact top-level structure from Backend/src/config/ai-config.json.

Requirements:
- assistantName should be short, memorable, and specific.
- welcomeMessage should invite the first useful action.
- systemPrompt should define role, target user, tone, boundaries, allowed behavior, disallowed behavior, and response style.
- blockedKeywords should be domain-specific but treated only as a lightweight starter mechanism.
- fallbackMessage should be brief and redirect users toward allowed behavior.
- Theme colors must be valid hex colors.
- Keep provider as "groq".
- Keep model_name as "llama-3.3-70b-versatile" unless I specifically request another Groq model.
- Do not frame the assistant as a doctor, therapist, lawyer, financial advisor, or other licensed professional unless I provide a compliant product context.
```

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

Set `DEBUG_AI=true` only when intentionally debugging locally. Do not enable it for real user traffic.

## Project Structure

```text
.
|-- Backend/
|-- Frontend/
|-- docs/
|   |-- codex.md
|   |-- customization.md
|   `-- presets.md
|-- presets/
|-- .agents/
|   `-- skills/
|       `-- ai-assistant-config-generator/
|           `-- SKILL.md
|-- scripts/
|   `-- doctor.js
|-- docker-compose.yml
|-- AGENTS.md
|-- README.md
|-- README.vi.md
|-- README.zh-TW.md
|-- README.zh-CN.md
|-- CONTRIBUTING.md
|-- SECURITY.md
`-- LICENSE
```

## Useful Commands

```bash
npm run install:all
npm run dev:backend
npm run dev:frontend
npm run build
npm run lint
npm run doctor
docker compose config
docker compose up --build
docker compose down
```

## Troubleshooting

- Groq API key not configured: set `GROQ_API_KEY` in the repo-root `.env` for Docker or in `Backend/.env` for local development, then restart the backend.
- Redis connection fails: make sure Redis is running. With Docker, use `docker compose up --build`; locally, run Redis and check `redis-cli ping`.
- Docker port already in use: set `BACKEND_PORT=3001` or `FRONTEND_PORT=5174` before `docker compose up --build`.
- `ai-config.json` invalid JSON: validate it with `node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"`.
- Changes to `Backend/src/config/ai-config.json` do not appear: restart the backend so the config is loaded again.
- Docker Redis memory reset: Docker uses the `redis_data` volume for persistence; run `docker compose down -v` to remove it.

## Security And Stability Notes

This starter kit includes several production-inspired patterns while remaining an educational public beta:

- Groq API keys stay on the backend and are never required in frontend code.
- External LLM requests use a 30-second timeout.
- Provider failures return controlled, user-friendly responses.
- Request validation checks malformed payloads before processing.
- The backend handles graceful shutdown for `SIGINT` and `SIGTERM`.
- Redis connections are closed safely during shutdown.
- Frontend chat submission continues even if saving prompt history fails.
- Docker Redis memory is persisted through the `redis_data` named volume.

This is still not production-ready by default. Before real public deployment, add authentication, rate limiting, monitoring, privacy review, stronger safety checks, and deployment-specific hardening.

## Security Checklist

- Never commit real `.env` files.
- Never commit real API keys.
- Keep `DEBUG_AI=false` unless debugging locally.
- Do not log private user messages in production.
- Rotate any API key that was ever committed by mistake.
- Restrict CORS origins in production.
- Review generated prompts before sensitive-domain use.
- Add rate limiting before public deployment.
- Do not commit Redis dumps, logs, or user data.

## Safety And Responsibility

This project is an educational starter kit for building AI assistant prototypes. It is not intended to provide medical, legal, financial, mental health, or other professional advice.

If users customize this starter kit for wellness, healthcare, HR, finance, legal, or other sensitive domains, they are responsible for adding appropriate safety checks, disclaimers, privacy protections, and human escalation paths.

The included blocked keyword and fallback message system is a lightweight starter mechanism, not a complete safety or compliance system.

## Public Beta Status

This repo is suitable for learning, prototyping, and portfolio use.

It is not production-ready by default. Developers should add auth, rate limiting, stronger safety checks, persistence strategy, monitoring, and privacy review before real public deployment.

## Portfolio Highlights

- Full-stack client-server architecture
- Secure backend API pattern for LLM apps
- Environment-based API key management
- Redis-backed memory
- Config-driven AI assistant behavior
- Dockerized development workflow
- Codex-ready repository guidance
- Optional Codex config-generation skill
- Claude-assisted config generation workflow

## License

MIT. See `LICENSE`.
