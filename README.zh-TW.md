# Full-Stack AI Assistant Starter Kit

[English](README.md) | [Tiếng Việt](README.vi.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

這是一個輕量、Codex-ready 的 full-stack starter kit，可用來建立可設定的 AI assistant app，具備安全的 backend LLM calls、Redis-backed prompt memory、Dockerized local development，以及透過單一 JSON 檔進行 zero-code assistant customization。

<p align="center">
  <img src="https://raw.githubusercontent.com/mykyquan/Full-Stack-AI-Assistant-Starter-Kit/main/docs/assets/demo.gif" width="800" alt="Full-Stack AI Assistant Demo">
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](https://nodejs.org/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](docker-compose.yml)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-f59e0b.svg)](#public-beta-狀態)

它包含 React + Vite frontend、Node.js/Express backend、會被 inject 到 LLM prompt 的 Redis conversation memory、Groq/Llama responses、Docker Compose、multilingual docs、ready-to-copy presets，以及 project-specific Codex guidance。

## 為什麼使用這個 Starter Kit？

- 許多初學者 AI app 會把 API key 暴露在 frontend code。
- 這個 repo 透過 backend API proxy pattern 保留 LLM calls 在 backend。
- 已接好 Redis-backed memory。
- Assistant behavior 和 theme 設定集中在一個 JSON 檔。
- 比 enterprise AI agent generators 更輕量。
- 更容易讓學生與 junior developers 理解和客製化。
- Use this repo when you want Codex to customize an AI assistant app, not invent the whole architecture from scratch.

## 為什麼 Clone 這個 Repo？

這個 repo 是為想要真正 AI app foundation 的 builders 設計，而不是另一個 single-file chat demo。

你會得到：

- 一套可運作的 full-stack architecture，包含 frontend、backend、Redis 與 Docker
- 一個 backend-only LLM integration pattern，避免在 frontend code 暴露 API keys
- 真正被納入 model context 的 Redis-backed memory
- 對初學者友善的 config system，可建立新的 assistant personas 而不需要重寫 code
- Presets 與 docs，讓 repo 很容易透過 Codex 或其他 AI coding assistant 客製化
- 避免 overclaim production readiness 的 public-beta safety language

## 適合誰？

- **Junior engineers** 正在學習 frontend、backend、Redis、Docker 與 LLM APIs 如何在真實 AI app 中協作。
- **Frontend developers** 想要現成 backend 來處理 secure AI calls，而不是把 API keys 放進 browser code。
- **AI-assisted builders** 想讓 Codex 客製化既有 architecture，而不是從零發明整個 stack。
- **Portfolio builders** 想要清楚、可解釋，並且展現實際 engineering tradeoffs 的 full-stack AI project。
- **Open-source maintainers** 需要輕量 starter kit，包含 docs、presets、safety notes 與 verification commands。
- **Developers building prototypes**，例如 study coaches、coding tutors、support assistants、sales helpers、language tutors 或 internal knowledge assistants。

## 可以建立什麼？

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

這個 starter kit 包含 Redis-backed assistant memory，且會被 model 使用，而不只是顯示在 UI。

當使用者送出 message 時：

1. Frontend 將 selected context 與 message 傳送到 backend。
2. Backend 將 recent prompt context 儲存在 Redis。
3. Chat route 從 Redis 取得 bounded recent history window。
4. Prompt builder 將 recent history inject 到 Groq message payload。
5. Model 會收到 current message 加上 recent conversation context。

這讓 assistant 擁有實用的 short-term memory，同時保持 implementation 容易檢查與客製化。

目前的 memory 為了 learning 和 prototyping 刻意保持簡單：它會儲存 recent user/context entries。需要更豐富 production memory 的 project，可以擴充成 role-based transcripts、summaries、user-scoped sessions 或 retrieval-backed memory。

## 功能

- React + Vite frontend，包含 chat UI、theme support、language switching 與 prompt history
- Express backend API，讓 Groq credentials 不進入 browser code
- Secure backend LLM API proxy pattern，用於 Groq/Llama responses
- True AI Memory：recent Redis history 會被 inject 到 LLM prompt，而不只是顯示在 UI
- Bounded Redis memory window，讓 assistant context 保持有用且可預期
- 透過 `Backend/src/config/ai-config.json` 實現 config-driven assistant behavior
- Zero-code assistant customization，可調整 name、welcome message、system prompt、model settings、theme、blocked keywords 與 fallback message
- Ready-to-copy presets，涵蓋 Study Coach、Coding Tutor、Customer Support、Sales、Wellness、Language Tutor 與 Career Coach use cases
- Lightweight blocked keyword starter mechanism
- External LLM calls 具備 30-second provider timeout
- Graceful backend shutdown，並安全處理 Redis disconnect
- Strict request validation，處理 malformed payloads
- Non-blocking frontend history save flow，即使 Redis saving fails，chat 仍可繼續
- Docker Compose setup，包含 persistent Redis volume
- Dynamic Docker ports，方便 local development
- Codex-ready `AGENTS.md`、docs 與 optional config-generation skill
- Multilingual documentation，包含 English、Vietnamese、Traditional Chinese 與 Simplified Chinese
- `npm run doctor` readiness check

Blocked keyword system 是輕量 starter mechanism，不是完整 safety、moderation 或 compliance system。

## Quick Start With Docker

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

在 repo root 建立 `.env`：

```env
GROQ_API_KEY=your_groq_api_key_here
```

啟動：

```bash
docker compose up --build
```

開啟：

```text
http://localhost:5173
```

停止：

```bash
docker compose down
```

Redis data 會儲存在 Docker named volume `redis_data`，所以一般重新建立 container 後 conversation history 仍會保留。若要 reset Docker Redis memory，請連同 volumes 一起移除：

```bash
docker compose down -v
```

### Dynamic Backend Port

```bash
BACKEND_PORT=3001 docker compose up --build
BACKEND_PORT=3001 FRONTEND_PORT=5174 docker compose up --build
```

## Run Locally Without Docker

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
cp Backend/.env.example Backend/.env
npm run install:all
```

更新 `Backend/.env`：

```env
PORT=3000
REDIS_URL=redis://127.0.0.1:6379
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=http://localhost:5173
DEBUG_AI=false
```

檢查 Redis：

```bash
redis-cli ping
```

在兩個 terminal 執行：

```bash
npm run dev:backend
npm run dev:frontend
```

## Using Presets

`presets/` 包含可直接複製的範例：

```bash
cp presets/study-coach.json Backend/src/config/ai-config.json
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
```

替換 config 後請 restart app。詳見 `docs/presets.md`。

## Using This Repo With Codex

此 repo 包含 `AGENTS.md` 作為 Codex guidance，並提供 optional `ai-assistant-config-generator` skill。

Codex 可產生、review、validate `Backend/src/config/ai-config.json`，並遵守專案 safety 與 documentation rules。

Use this repo when you want Codex to customize an AI assistant app, not invent the entire architecture from scratch.

詳見 `docs/codex.md`。這不是 official Codex plugin。

## 為什麼這個 Repo 很適合 Codex

這個 repo 給 Codex 清楚的 project rails：

- `AGENTS.md` 說明 project purpose、safety rules、important files 與 verification commands。
- `docs/codex.md` 提供常見 customization tasks 的 example prompts。
- `.agents/skills/ai-assistant-config-generator/SKILL.md` 協助 generate 與 validate `ai-config.json`。
- `presets/` 提供具體 assistant configurations 範例給 Codex。
- `npm run doctor`、`npm run build`、`npm run lint` 與 `docker compose config` 讓 changes 容易 verify。

當你想讓 Codex 客製化一個已經可運作的 assistant app，而不是從 blank prompt 設計整個 stack 時，請使用這個 repo。

## Claude-Assisted Config Workflow

這不是 official installable Claude Skill package，而是 copy-paste workflow，用來更快產生 `ai-config.json`。

1. 將 `README.md` 中的 master prompt 貼到 Claude。
2. 描述你想建立的 assistant。
3. Claude 產生 `ai-config.json`。
4. 貼到 `Backend/src/config/ai-config.json`。
5. Restart app。

## Environment Variables

```bash
cp Backend/.env.example Backend/.env
```

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

只在 local debugging 時設定 `DEBUG_AI=true`。

## Project Structure

```text
.
|-- Backend/
|-- Frontend/
|-- docs/
|-- presets/
|-- .agents/
|-- scripts/
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

- Groq API key 尚未設定：使用 Docker 時在 repo root 的 `.env` 設定 `GROQ_API_KEY`；local development 時在 `Backend/.env` 設定，然後 restart backend。
- Redis connection fails：確認 Redis 正在執行。使用 Docker 時執行 `docker compose up --build`；local 時啟動 Redis 並檢查 `redis-cli ping`。
- Docker port already in use：在執行 `docker compose up --build` 前設定 `BACKEND_PORT=3001` 或 `FRONTEND_PORT=5174`。
- `ai-config.json` 是 invalid JSON：用 `node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"` validate。
- `Backend/src/config/ai-config.json` 的變更沒有出現：restart backend，讓 config 重新載入。
- Reset Docker Redis memory：Docker 使用 `redis_data` volume 持久化資料；執行 `docker compose down -v` 可移除它。

## Security And Stability Notes

這個 starter kit 包含多個 production-inspired patterns，但仍然是 educational public beta：

- Groq API keys 保留在 backend，不需要出現在 frontend code。
- External LLM requests 使用 30-second timeout。
- Provider failures 會回傳 controlled、user-friendly responses。
- Request validation 會在處理前檢查 malformed payloads。
- Backend 會處理 `SIGINT` 和 `SIGTERM` 的 graceful shutdown。
- Redis connections 會在 shutdown 時安全關閉。
- 即使 saving prompt history fails，Frontend chat submission 仍會繼續。
- Docker Redis memory 透過 `redis_data` named volume persisted。

此專案預設仍不是 production-ready。真正 public deployment 前，請加入 authentication、rate limiting、monitoring、privacy review、stronger safety checks 與 deployment-specific hardening。

## Security Checklist

- 不要 commit 真實 `.env` files。
- 不要 commit 真實 API keys。
- 除了 local debugging，保持 `DEBUG_AI=false`。
- 不要在 production log private user messages。
- 如果 API key 曾被誤 commit，請立即 rotate。
- Production 中限制 CORS origins。
- Sensitive-domain use 前要 review generated prompts。
- Public deployment 前加入 rate limiting。
- 不要 commit Redis dumps、logs 或 user data。

## Safety And Responsibility

This project is an educational starter kit for building AI assistant prototypes. It is not intended to provide medical, legal, financial, mental health, or other professional advice.

如果將此 starter kit 客製化到 wellness、healthcare、HR、finance、legal 或其他敏感領域，使用者需自行加入適當 safety checks、disclaimers、privacy protections 與 human escalation paths。

內建 blocked keyword 與 fallback message system 是輕量 starter mechanism，不是完整 safety 或 compliance system。

## Public Beta 狀態

此 repo 適合 learning、prototyping 和 portfolio use。預設不是 production-ready。真正公開部署前，請加入 auth、rate limiting、更強 safety checks、persistence strategy、monitoring 與 privacy review。

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
