# AGENTS.md

## Project purpose

This is a public beta full-stack AI assistant starter kit for building configurable AI assistant apps with React, Vite, Express, Redis, Docker Compose, and Groq/Llama responses.

The assistant is mainly customized through:

```text
Backend/src/config/ai-config.json
```

Do not reposition this repo as a therapist, medical tool, legal tool, financial tool, or production-ready system. Do not claim `blockedKeywords` is a complete safety system. Keep public-facing wording honest and beta-safe.

## Repository layout

- `Backend/`: Express backend, API routes, config loading, Redis memory, Groq service.
- `Frontend/`: React + Vite frontend.
- `docs/`: Customization and supporting documentation.
- `presets/`: Ready-to-copy `ai-config.json` examples.
- `docker-compose.yml`: Local full-stack setup.
- `README.md`: English public-facing documentation.
- `README.vi.md`: Vietnamese documentation.
- `README.zh-TW.md`: Traditional Chinese documentation.
- `README.zh-CN.md`: Simplified Chinese documentation.

## Important files

- `Backend/src/config/ai-config.json`
- `Backend/.env.example`
- `Backend/src/routes/`
- `Backend/src/services/`
- `Backend/src/middleware/`
- `Frontend/src/services/`
- `Frontend/src/components/`
- `docs/codex.md`
- `docs/customization.md`
- `presets/`

## Commands to verify changes

```bash
npm run install:all
npm run build
npm run lint
npm run doctor
docker compose config
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
```

## Safety and security rules

- Never commit real `.env` files.
- Never commit API keys, tokens, Redis dumps, logs, or user data.
- Keep `DEBUG_AI=false` by default.
- Do not log private user messages in production code.
- Do not claim `blockedKeywords` is a complete safety system.
- Describe `blockedKeywords` as a lightweight starter mechanism.
- Do not claim the repo is production-ready.
- Do not claim this is an official Codex plugin.
- Do not claim this is an official Claude Skill.

## Documentation rules

When changing behavior, update:

- `README.md`
- `README.vi.md`
- `README.zh-TW.md`
- `README.zh-CN.md`
- `docs/customization.md` if config behavior changes
- `docs/codex.md` if Codex usage changes
- `Backend/.env.example` if env variables change

## Code style expectations

- Keep changes focused and beginner-friendly.
- Prefer clear service boundaries.
- Do not add large dependencies without a clear reason.
- Keep comments useful but not noisy.
- Keep public-facing wording honest and beta-safe.

## Definition of done

1. App still runs locally or limitation is clearly explained.
2. README commands match package scripts.
3. No secrets are introduced.
4. Public-facing wording stays honest.
5. Config changes are reflected in docs.
6. JSON config validates.
7. English README and localized READMEs stay aligned.
