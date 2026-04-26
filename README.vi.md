# Full-Stack AI Assistant Starter Kit

[English](README.md) | [Tiếng Việt](README.vi.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

Bộ starter kit full-stack nhẹ, sẵn sàng dùng với Codex để xây dựng ứng dụng AI assistant có thể cấu hình, với backend LLM calls an toàn, Redis-backed prompt memory, Dockerized local development, và zero-code assistant customization thông qua một file JSON.

<p align="center">
  <img src="https://raw.githubusercontent.com/mykyquan/Full-Stack-AI-Assistant-Starter-Kit/main/docs/assets/demo.gif" width="800" alt="Full-Stack AI Assistant Demo">
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](https://nodejs.org/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](docker-compose.yml)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-f59e0b.svg)](#trang-thai-public-beta)

Dự án gồm React + Vite frontend, Node.js/Express backend, Redis conversation memory được inject vào LLM prompt, Groq/Llama responses, Docker Compose, multilingual docs, ready-to-copy presets, và project-specific Codex guidance.

## Vì Sao Nên Dùng Starter Kit Này?

- Nhiều app AI cho người mới vô tình để lộ API key trong frontend.
- Repo này giữ lệnh gọi LLM ở backend thông qua mẫu API proxy an toàn hơn.
- Có sẵn Redis-backed memory.
- Hành vi assistant và theme nằm trong một file JSON.
- Nhẹ hơn nhiều so với các bộ tạo AI agent cấp enterprise.
- Dễ hiểu và dễ tùy biến cho sinh viên và junior developer.
- Dùng repo này khi bạn muốn Codex tùy biến app AI assistant, không phải tự nghĩ toàn bộ kiến trúc từ đầu.

## Vì Sao Nên Clone Repo Này?

Repo này dành cho builders muốn một nền tảng AI app thật sự, không chỉ là một single-file chat demo khác.

Bạn có:

- Một full-stack architecture hoạt động sẵn với frontend, backend, Redis, và Docker
- Một backend-only LLM integration pattern giúp tránh để lộ API keys trong frontend code
- Redis-backed memory thực sự được đưa vào model context
- Một config system thân thiện với người mới để tạo assistant persona mới mà không cần viết lại code
- Presets và docs giúp repo dễ tùy biến bằng Codex hoặc một AI coding assistant khác
- Public-beta safety language giúp tránh overclaim về production readiness

## Dành Cho Ai?

- **Junior engineers** đang học cách frontend, backend, Redis, Docker, và LLM APIs kết nối với nhau trong một AI app thực tế.
- **Frontend developers** muốn có backend sẵn sàng cho secure AI calls thay vì đặt API keys trong browser code.
- **AI-assisted builders** muốn Codex tùy biến một architecture có sẵn thay vì tạo mọi thứ từ đầu.
- **Portfolio builders** muốn một full-stack AI project rõ ràng, dễ giải thích, và có các engineering tradeoffs thực tế.
- **Open-source maintainers** cần một starter kit nhẹ với docs, presets, safety notes, và verification commands.
- **Developers xây prototype** như study coaches, coding tutors, support assistants, sales helpers, language tutors, hoặc internal knowledge assistants.

## Có Thể Xây Gì?

- Study coach
- Coding tutor
- Customer support assistant
- Sales assistant
- Wellness companion
- Internal knowledge helper
- Language tutor
- Career coach

## Tổng Quan Kiến Trúc

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

Starter kit này có Redis-backed assistant memory được model sử dụng, không chỉ hiển thị trong UI.

Khi người dùng gửi message:

1. Frontend gửi selected context và message tới backend.
2. Backend lưu recent prompt context vào Redis.
3. Chat route lấy một bounded recent history window từ Redis.
4. Prompt builder inject recent history đó vào Groq message payload.
5. Model nhận current message cùng recent conversation context.

Cách này giúp assistant có short-term memory thực tế, đồng thời vẫn giữ implementation dễ đọc và dễ tùy biến.

Memory hiện tại được cố ý giữ đơn giản để phục vụ learning và prototyping: nó lưu recent user/context entries. Các project cần production memory phong phú hơn có thể mở rộng thành role-based transcripts, summaries, user-scoped sessions, hoặc retrieval-backed memory.

## Tính Năng

- React + Vite frontend với chat UI, theme support, language switching, và prompt history
- Express backend API giữ Groq credentials bên ngoài browser code
- Secure backend LLM API proxy pattern cho Groq/Llama responses
- True AI Memory: recent Redis history được inject vào LLM prompt, không chỉ hiển thị trong UI
- Bounded Redis memory window để giữ assistant context hữu ích và dễ dự đoán
- Config-driven assistant behavior thông qua `Backend/src/config/ai-config.json`
- Zero-code assistant customization cho name, welcome message, system prompt, model settings, theme, blocked keywords, và fallback message
- Ready-to-copy presets cho các use case Study Coach, Coding Tutor, Customer Support, Sales, Wellness, Language Tutor, và Career Coach
- Lightweight blocked keyword starter mechanism
- 30-second provider timeout cho external LLM calls
- Graceful backend shutdown với safe Redis disconnect handling
- Strict request validation cho malformed payloads
- Non-blocking frontend history save flow để chat vẫn tiếp tục nếu Redis saving fails
- Docker Compose setup với persistent Redis volume
- Dynamic Docker ports cho local development
- Codex-ready `AGENTS.md`, docs, và optional config-generation skill
- Multilingual documentation bằng English, Vietnamese, Traditional Chinese, và Simplified Chinese
- `npm run doctor` readiness check

Hệ thống blocked keyword chỉ là cơ chế khởi đầu nhẹ. Nó không phải hệ thống safety, moderation, hoặc compliance hoàn chỉnh.

## Quick Start Với Docker

1. Clone repo. Thay `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` bằng đường dẫn repo thật:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Tạo file `.env` ở root, cạnh `docker-compose.yml`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

3. Start full stack:

```bash
docker compose up --build
```

4. Mở app:

```text
http://localhost:5173
```

5. Dừng stack:

```bash
docker compose down
```

Redis data được lưu trong Docker named volume `redis_data`, nên conversation history vẫn còn sau khi tạo lại container thông thường. Để reset Docker Redis memory, xóa cả volumes:

```bash
docker compose down -v
```

### Dynamic Backend Port

Backend container luôn chạy nội bộ ở port `3000`, nhưng Docker Compose cho phép đổi host port bằng `BACKEND_PORT`.

```bash
BACKEND_PORT=3001 docker compose up --build
```

Nếu frontend port cũng bị chiếm:

```bash
BACKEND_PORT=3001 FRONTEND_PORT=5174 docker compose up --build
```

## Chạy Local Không Cần Docker

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
cp Backend/.env.example Backend/.env
npm run install:all
```

Cập nhật `Backend/.env`:

```env
PORT=3000
REDIS_URL=redis://127.0.0.1:6379
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=http://localhost:5173
DEBUG_AI=false
```

Kiểm tra Redis:

```bash
redis-cli ping
```

Chạy backend và frontend trong hai terminal:

```bash
npm run dev:backend
npm run dev:frontend
```

## Dùng Presets

Thư mục `presets/` chứa các ví dụ `ai-config.json` có thể copy ngay:

```bash
cp presets/study-coach.json Backend/src/config/ai-config.json
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
```

Restart app sau khi thay config. Xem thêm `docs/presets.md`.

## Dùng Repo Này Với Codex

Repo này có `AGENTS.md` để hướng dẫn Codex và optional `ai-assistant-config-generator` skill.

Codex có thể tạo, review, và validate `Backend/src/config/ai-config.json` theo rule safety và docs của dự án.

Use this repo when you want Codex to customize an AI assistant app, not invent the entire architecture from scratch.

Xem `docs/codex.md` để có prompt mẫu và lệnh kiểm tra.

Đây không phải official Codex plugin.

## Vì Sao Repo Này Hoạt Động Tốt Với Codex

Repo này cung cấp cho Codex project rails rõ ràng:

- `AGENTS.md` giải thích project purpose, safety rules, important files, và verification commands.
- `docs/codex.md` cung cấp example prompts cho các customization tasks phổ biến.
- `.agents/skills/ai-assistant-config-generator/SKILL.md` giúp generate và validate `ai-config.json`.
- `presets/` cho Codex các ví dụ assistant configurations cụ thể.
- `npm run doctor`, `npm run build`, `npm run lint`, và `docker compose config` giúp verify changes dễ dàng.

Dùng repo này khi bạn muốn Codex tùy biến một assistant app đang hoạt động, không phải thiết kế toàn bộ stack từ blank prompt.

## Claude-Assisted Config Workflow

Đây không phải official installable Claude Skill package. Đây là workflow copy-paste giúp tạo `ai-config.json` nhanh hơn.

1. Copy master prompt trong `README.md` vào Claude.
2. Mô tả assistant bạn muốn.
3. Claude tạo `ai-config.json`.
4. Dán vào `Backend/src/config/ai-config.json`.
5. Restart app.

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

Chỉ bật `DEBUG_AI=true` khi debug local. Không bật cho traffic thật.

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

## Lệnh Hữu Ích

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

- Chưa cấu hình Groq API key: đặt `GROQ_API_KEY` trong file `.env` ở repo root khi dùng Docker, hoặc trong `Backend/.env` khi chạy local, rồi restart backend.
- Redis connection fails: đảm bảo Redis đang chạy. Với Docker, dùng `docker compose up --build`; khi chạy local, khởi động Redis và kiểm tra `redis-cli ping`.
- Docker port đã bị chiếm: đặt `BACKEND_PORT=3001` hoặc `FRONTEND_PORT=5174` trước khi chạy `docker compose up --build`.
- `ai-config.json` không phải JSON hợp lệ: validate bằng `node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"`.
- Thay đổi trong `Backend/src/config/ai-config.json` chưa xuất hiện: restart backend để config được load lại.
- Reset Docker Redis memory: Docker dùng volume `redis_data` để lưu dữ liệu; chạy `docker compose down -v` để xóa volume này.

## Security And Stability Notes

Starter kit này có nhiều production-inspired patterns nhưng vẫn là educational public beta:

- Groq API keys ở lại backend và không cần xuất hiện trong frontend code.
- External LLM requests dùng 30-second timeout.
- Provider failures trả về controlled, user-friendly responses.
- Request validation kiểm tra malformed payloads trước khi xử lý.
- Backend xử lý graceful shutdown cho `SIGINT` và `SIGTERM`.
- Redis connections được đóng an toàn trong shutdown.
- Frontend chat submission vẫn tiếp tục ngay cả khi saving prompt history fails.
- Docker Redis memory được persisted thông qua Docker named volume `redis_data`.

Mặc định project này vẫn chưa production-ready. Trước khi public deployment thật, hãy thêm authentication, rate limiting, monitoring, privacy review, stronger safety checks, và deployment-specific hardening.

## Security Checklist

- Không commit file `.env` thật.
- Không commit API key thật.
- Giữ `DEBUG_AI=false` trừ khi debug local.
- Không log private user messages trong production.
- Rotate API key nếu từng commit nhầm.
- Giới hạn CORS origins trong production.
- Review generated prompts trước khi dùng cho sensitive domain.
- Thêm rate limiting trước public deployment.
- Không commit Redis dumps, logs, hoặc user data.

## Safety And Responsibility

Dự án này là educational starter kit để xây AI assistant prototype. Nó không nhằm cung cấp lời khuyên y tế, pháp lý, tài chính, sức khỏe tinh thần, hoặc lời khuyên chuyên môn khác.

Nếu tùy biến cho wellness, healthcare, HR, finance, legal, hoặc domain nhạy cảm khác, bạn chịu trách nhiệm thêm safety checks, disclaimers, privacy protections, và human escalation paths phù hợp.

Blocked keyword và fallback message chỉ là cơ chế khởi đầu nhẹ, không phải safety hoặc compliance system hoàn chỉnh.

## Trạng Thái Public Beta

Repo phù hợp cho học tập, prototype, và portfolio. Mặc định chưa production-ready. Trước khi deploy công khai thật, hãy thêm auth, rate limiting, safety checks mạnh hơn, persistence strategy, monitoring, và privacy review.

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

MIT. Xem `LICENSE`.
