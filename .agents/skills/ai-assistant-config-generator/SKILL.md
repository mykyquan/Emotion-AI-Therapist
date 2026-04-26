---
name: ai-assistant-config-generator
description: Use this skill when the user wants to create, validate, or improve Backend/src/config/ai-config.json for a configurable full-stack AI assistant starter kit.
---

# AI Assistant Config Generator

## Purpose

This skill helps create safe, valid, beginner-friendly `ai-config.json` files for this repo.

## Target file

```text
Backend/src/config/ai-config.json
```

## Required JSON structure

```json
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
```

## Generation rules

- Return valid JSON only when the user asks for config contents.
- Do not wrap JSON in Markdown unless the user asks for explanation.
- Keep provider as `groq` unless user asks otherwise.
- Use readable valid hex colors.
- `assistantName` should be short and specific.
- `welcomeMessage` should invite the first useful action.
- `systemPrompt` should define role, target user, tone, boundaries, allowed behavior, disallowed behavior, and response style.
- `blockedKeywords` should be domain-specific but described only as a lightweight starter mechanism.
- `fallbackMessage` should be brief and redirect users toward allowed behavior.
- For sensitive domains like wellness, healthcare, HR, legal, finance, education, or safety-related apps, add stronger boundaries and recommend human review.
- Never generate prompts that claim to diagnose, treat, replace professionals, or provide regulated advice.
- Avoid encouraging cheating, credential abuse, privacy violations, harmful actions, or unsafe advice.

## Workflow

1. Ask for app idea if missing.
2. Identify target user.
3. Identify sensitive-domain risks.
4. Generate config.
5. Validate JSON mentally for required structure.
6. Recommend validation command.
7. Remind user to restart the app after replacing the config.

## Validation command

```bash
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
```
