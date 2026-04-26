# CHANGELOG

## 🚀 v1.0.0 Beta Release Overview

The v1.0.0 Public Beta marks the project’s transition into a robust, Codex-ready, full-stack AI Assistant Starter Kit. This release brings together a React frontend, an Express backend, Redis-backed memory, Groq/Llama responses, Docker Compose, multilingual documentation, and config-first assistant customization in a lightweight educational template designed for learning, prototypes, and portfolio-ready AI apps.

## 🧠 True AI Memory & Core Architecture

- **React + Vite frontend:** The client app provides the assistant UI, language switching, theme support, context selection, chat submission, and history display while keeping provider credentials out of browser code.
- **Node.js/Express proxy pattern:** The backend owns all Groq API calls, reads environment variables server-side, validates incoming requests, applies the starter keyword guardrail, and returns controlled responses to the frontend.
- **True AI Memory:** Redis conversation history is now part of the assistant’s prompt context, not just a UI history panel. The backend fetches a bounded set of recent Redis entries, preserves oldest-to-newest order, and injects the last messages into the Groq prompt so the model can answer with recent conversation context.
- **Config-driven prompt assembly:** `Backend/src/config/ai-config.json` defines the assistant’s public identity, system prompt, model settings, fallback behavior, blocked keywords, and theme, while backend prompt builders add per-request language, selected context, current message, and recent Redis memory.

## 🛡️ Security & Stability Upgrades

- **30-second LLM timeout:** Groq requests now use `AbortSignal.timeout(30000)` with a fallback approach, preventing external provider calls from hanging indefinitely.
- **Controlled timeout response:** Provider timeouts return a user-friendly error message without leaking secrets or internal request details.
- **Graceful shutdown:** The backend handles `SIGINT` and `SIGTERM`, stops the HTTP server safely, and closes Redis connections without throwing if Redis is already disconnected.
- **Non-blocking UI flow:** Chat requests continue even if Redis context saving fails, with safe development-only warnings instead of user-facing breakage.
- **Strict input validation:** Backend validators now confirm request bodies and selected fields are the expected types before trimming or processing them, returning beginner-friendly `400` responses for malformed payloads.
- **Docker Redis persistence:** Docker Compose now uses the named volume `redis_data:/data`, so Redis-backed memory survives normal container recreation. Developers can reset it with `docker compose down -v`.
- **Improved Docker ignores:** Backend and frontend Docker builds now ignore environment variants, logs, coverage output, and platform metadata while preserving `.env.example`.

## 🛠️ Developer Experience (DX) & Extensibility

- **Single-file customization:** Developers can reshape the assistant through `Backend/src/config/ai-config.json` without rewriting the app architecture.
- **Pre-built presets:** The `presets/` directory includes ready-to-copy assistant examples such as Study Coach, Coding Tutor, Customer Support, Sales Assistant, Wellness Companion, Language Tutor, and Career Coach.
- **Codex-ready workflow:** `AGENTS.md`, `docs/codex.md`, and the optional repo-local `ai-assistant-config-generator` skill help Codex customize configs while following the project’s safety and documentation rules.
- **Claude-assisted config workflow:** The README includes a copy-paste workflow for generating valid `ai-config.json` files from an app idea, while preserving the starter kit’s public-beta boundaries.
- **Environment validation:** `npm run doctor` gives developers a fast readiness check for required files, JSON validity, documentation presence, presets, and public-beta guardrails.
- **Multilingual documentation:** English, Vietnamese, Traditional Chinese, and Simplified Chinese READMEs document setup, troubleshooting, Docker Redis persistence, safety notes, and customization paths.

This release keeps the project intentionally beginner-friendly and beta-safe. It is an educational starter kit for AI assistant prototypes, not a production-ready system or a substitute for domain-specific safety, privacy, compliance, authentication, monitoring, or rate-limiting work.
