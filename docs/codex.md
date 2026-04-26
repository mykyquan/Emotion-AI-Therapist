# Using This Repo With Codex

## Why Use This Repo With Codex?

This repo gives Codex a clean full-stack AI assistant foundation. Codex does not need to invent the architecture from scratch, because the project already includes a React + Vite frontend, Express backend, Redis memory layer, Groq/Llama response service, Docker Compose setup, and one-file assistant customization through `Backend/src/config/ai-config.json`.

Use this repo when you want Codex to customize an AI assistant app, not invent the entire architecture from scratch.

`AGENTS.md` gives Codex repo-specific guidance before it makes changes. The optional Codex skill helps generate and validate `ai-config.json`, so users can customize assistant behavior without rewriting the full codebase.

## What AGENTS.md Does

`AGENTS.md` gives Codex:

- Repository layout
- Important files
- Verification commands
- Safety and security rules
- Documentation expectations
- Definition of done

## What The Codex Skill Does

The optional `ai-assistant-config-generator` skill helps Codex:

- Create `Backend/src/config/ai-config.json`
- Validate the required config structure
- Turn the starter kit into a study coach, coding tutor, customer support assistant, wellness companion, sales assistant, language tutor, career coach, or another focused assistant
- Remind users that `blockedKeywords` is a lightweight starter mechanism, not complete safety

The skill lives at:

```text
.agents/skills/ai-assistant-config-generator/SKILL.md
```

## Example Codex Prompts

- "Use the ai-assistant-config-generator skill to create an ai-config.json for a JavaScript debugging tutor for beginners."
- "Review Backend/src/config/ai-config.json for JSON validity, safety boundaries, and beginner-friendly assistant behavior."
- "Turn the default assistant into a customer support assistant for a SaaS billing dashboard."
- "Customize the assistant into a study coach, then update docs/customization.md with the new behavior."
- "Audit this repo for public beta readiness and check that no secrets are committed."

## Recommended Verification Commands

```bash
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
npm run build
npm run lint
npm run doctor
docker compose config
```

## Safety Reminder

Generated configs for sensitive domains need human review, stronger safety checks, privacy review, and escalation paths. This starter kit is educational and prototype-friendly; it is not production-ready by default.
