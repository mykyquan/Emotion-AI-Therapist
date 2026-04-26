# Full-Stack AI Assistant Starter Kit

[English](README.md) | [Tiếng Việt](README.vi.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

这是一个轻量、Codex-ready 的 full-stack starter kit，用于构建可配置的 AI assistant app，具备安全的 backend LLM calls、Redis-backed prompt memory、Dockerized local development，以及通过单个 JSON 文件进行 zero-code assistant customization。

<p align="center">
  <img src="https://raw.githubusercontent.com/mykyquan/Full-Stack-AI-Assistant-Starter-Kit/main/docs/assets/demo.gif" width="800" alt="Full-Stack AI Assistant Demo">
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](https://nodejs.org/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](docker-compose.yml)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-f59e0b.svg)](#public-beta-状态)

它包含 React + Vite frontend、Node.js/Express backend、会被 inject 到 LLM prompt 的 Redis conversation memory、Groq/Llama responses、Docker Compose、multilingual docs、ready-to-copy presets，以及 project-specific Codex guidance。

## 为什么使用这个 Starter Kit？

- 很多入门 AI app 会把 API key 暴露在 frontend code 中。
- 这个 repo 通过 backend API proxy pattern 把 LLM calls 保留在 backend。
- 已经接入 Redis-backed memory。
- Assistant behavior 和 theme 设置集中在一个 JSON 文件。
- 比 enterprise AI agent generators 更轻量。
- 更容易让学生和 junior developers 理解、修改和讲清楚。
- Use this repo when you want Codex to customize an AI assistant app, not invent the whole architecture from scratch.

## 为什么 Clone 这个 Repo？

这个 repo 面向想要真正 AI app foundation 的 builders，而不是另一个 single-file chat demo。

你会获得：

- 一套可运行的 full-stack architecture，包含 frontend、backend、Redis 和 Docker
- 一个 backend-only LLM integration pattern，避免在 frontend code 中暴露 API keys
- 真正进入 model context 的 Redis-backed memory
- 对新手友好的 config system，可以创建新的 assistant personas，而不需要重写 code
- Presets 和 docs，让 repo 可以轻松通过 Codex 或其他 AI coding assistant 进行自定义
- 避免 overclaim production readiness 的 public-beta safety language

## 适合谁？

- **Junior engineers** 正在学习 frontend、backend、Redis、Docker 和 LLM APIs 如何在真实 AI app 中协作。
- **Frontend developers** 想要现成 backend 来处理 secure AI calls，而不是把 API keys 放进 browser code。
- **AI-assisted builders** 想让 Codex 自定义已有 architecture，而不是从零发明整个 stack。
- **Portfolio builders** 想要清晰、可解释，并体现实际 engineering tradeoffs 的 full-stack AI project。
- **Open-source maintainers** 需要轻量 starter kit，包含 docs、presets、safety notes 和 verification commands。
- **Developers building prototypes**，例如 study coaches、coding tutors、support assistants、sales helpers、language tutors 或 internal knowledge assistants。

## 可以构建什么？

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

这个 starter kit 包含 Redis-backed assistant memory，并且会被 model 使用，而不只是显示在 UI 中。

当用户发送 message 时：

1. Frontend 将 selected context 和 message 发送到 backend。
2. Backend 将 recent prompt context 存入 Redis。
3. Chat route 从 Redis 获取 bounded recent history window。
4. Prompt builder 将 recent history inject 到 Groq message payload。
5. Model 会收到 current message 以及 recent conversation context。

这让 assistant 拥有实用的 short-term memory，同时保持 implementation 易于查看和自定义。

当前 memory 为了 learning 和 prototyping 有意保持简单：它存储 recent user/context entries。需要更丰富 production memory 的 project，可以扩展为 role-based transcripts、summaries、user-scoped sessions 或 retrieval-backed memory。

## 功能

- React + Vite frontend，包含 chat UI、theme support、language switching 和 prompt history
- Express backend API，让 Groq credentials 不进入 browser code
- Secure backend LLM API proxy pattern，用于 Groq/Llama responses
- True AI Memory：recent Redis history 会被 inject 到 LLM prompt，而不只是显示在 UI 中
- Bounded Redis memory window，让 assistant context 保持有用且可预测
- 通过 `Backend/src/config/ai-config.json` 实现 config-driven assistant behavior
- Zero-code assistant customization，可调整 name、welcome message、system prompt、model settings、theme、blocked keywords 和 fallback message
- Ready-to-copy presets，覆盖 Study Coach、Coding Tutor、Customer Support、Sales、Wellness、Language Tutor 和 Career Coach use cases
- Lightweight blocked keyword starter mechanism
- External LLM calls 具备 30-second provider timeout
- Graceful backend shutdown，并安全处理 Redis disconnect
- Strict request validation，处理 malformed payloads
- Non-blocking frontend history save flow，即使 Redis saving fails，chat 仍可继续
- Docker Compose setup，包含 persistent Redis volume
- Dynamic Docker ports，方便 local development
- Codex-ready `AGENTS.md`、docs 和 optional config-generation skill
- Multilingual documentation，包含 English、Vietnamese、Traditional Chinese 和 Simplified Chinese
- `npm run doctor` readiness check

Blocked keyword system 是轻量 starter mechanism，不是完整的 safety、moderation 或 compliance system。

## Quick Start With Docker

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

在 repo root 创建 `.env`：

```env
GROQ_API_KEY=your_groq_api_key_here
```

启动：

```bash
docker compose up --build
```

打开：

```text
http://localhost:5173
```

停止：

```bash
docker compose down
```

Redis data 会存储在 Docker named volume `redis_data` 中，所以普通重新创建 container 后 conversation history 仍会保留。若要 reset Docker Redis memory，请同时移除 volumes：

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

检查 Redis：

```bash
redis-cli ping
```

在两个 terminal 中运行：

```bash
npm run dev:backend
npm run dev:frontend
```

## Using Presets

`presets/` 包含可直接复制的示例：

```bash
cp presets/study-coach.json Backend/src/config/ai-config.json
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
```

替换 config 后请 restart app。详见 `docs/presets.md`。

## Using This Repo With Codex

此 repo 包含 `AGENTS.md` 作为 Codex guidance，并提供 optional `ai-assistant-config-generator` skill。

Codex 可以生成、review、validate `Backend/src/config/ai-config.json`，并遵守项目 safety 和 documentation rules。

Use this repo when you want Codex to customize an AI assistant app, not invent the entire architecture from scratch.

详见 `docs/codex.md`。这不是 official Codex plugin。

## 为什么这个 Repo 很适合 Codex

这个 repo 给 Codex 清晰的 project rails：

- `AGENTS.md` 说明 project purpose、safety rules、important files 和 verification commands。
- `docs/codex.md` 提供常见 customization tasks 的 example prompts。
- `.agents/skills/ai-assistant-config-generator/SKILL.md` 帮助 generate 和 validate `ai-config.json`。
- `presets/` 为 Codex 提供具体 assistant configurations 示例。
- `npm run doctor`、`npm run build`、`npm run lint` 和 `docker compose config` 让 changes 容易 verify。

当你想让 Codex 自定义一个已经可运行的 assistant app，而不是从 blank prompt 设计整个 stack 时，请使用这个 repo。

## Claude-Assisted Config Workflow

这不是 official installable Claude Skill package，而是 copy-paste workflow，用来更快生成 `ai-config.json`。

1. 将 `README.md` 中的 master prompt 粘贴到 Claude。
2. 描述你想构建的 assistant。
3. Claude 生成 `ai-config.json`。
4. 粘贴到 `Backend/src/config/ai-config.json`。
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

只在 local debugging 时设置 `DEBUG_AI=true`。

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

- Groq API key 未配置：使用 Docker 时在 repo root 的 `.env` 设置 `GROQ_API_KEY`；local development 时在 `Backend/.env` 设置，然后 restart backend。
- Redis connection fails：确认 Redis 正在运行。使用 Docker 时运行 `docker compose up --build`；local 时启动 Redis 并检查 `redis-cli ping`。
- Docker port already in use：在运行 `docker compose up --build` 前设置 `BACKEND_PORT=3001` 或 `FRONTEND_PORT=5174`。
- `ai-config.json` 是 invalid JSON：用 `node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"` validate。
- `Backend/src/config/ai-config.json` 的修改没有生效：restart backend，让 config 重新加载。
- Reset Docker Redis memory：Docker 使用 `redis_data` volume 持久化数据；运行 `docker compose down -v` 可以移除它。

## Security And Stability Notes

这个 starter kit 包含多个 production-inspired patterns，但仍然是 educational public beta：

- Groq API keys 保留在 backend，不需要出现在 frontend code。
- External LLM requests 使用 30-second timeout。
- Provider failures 会返回 controlled、user-friendly responses。
- Request validation 会在处理前检查 malformed payloads。
- Backend 会处理 `SIGINT` 和 `SIGTERM` 的 graceful shutdown。
- Redis connections 会在 shutdown 时安全关闭。
- 即使 saving prompt history fails，Frontend chat submission 仍会继续。
- Docker Redis memory 通过 `redis_data` named volume persisted。

此项目默认仍不是 production-ready。真正 public deployment 前，请添加 authentication、rate limiting、monitoring、privacy review、stronger safety checks 和 deployment-specific hardening。

## Security Checklist

- 不要 commit 真实 `.env` files。
- 不要 commit 真实 API keys。
- 除 local debugging 外，保持 `DEBUG_AI=false`。
- 不要在 production 记录 private user messages。
- 如果 API key 曾被误 commit，请立即 rotate。
- Production 中限制 CORS origins。
- Sensitive-domain use 前 review generated prompts。
- Public deployment 前添加 rate limiting。
- 不要 commit Redis dumps、logs 或 user data。

## Safety And Responsibility

This project is an educational starter kit for building AI assistant prototypes. It is not intended to provide medical, legal, financial, mental health, or other professional advice.

如果将此 starter kit 自定义到 wellness、healthcare、HR、finance、legal 或其他敏感领域，用户需要自行添加适当的 safety checks、disclaimers、privacy protections 和 human escalation paths。

内置 blocked keyword 和 fallback message system 是轻量 starter mechanism，不是完整 safety 或 compliance system。

## Public Beta 状态

此 repo 适合 learning、prototyping 和 portfolio use。默认不是 production-ready。真正公开部署前，请添加 auth、rate limiting、更强 safety checks、persistence strategy、monitoring 和 privacy review。

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
