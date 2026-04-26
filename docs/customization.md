# Customization Guide

This starter kit is designed to be customized primarily through:

```text
Backend/src/config/ai-config.json
```

Restart the backend after changing this file.

Codex can use the optional `ai-assistant-config-generator` skill to create or validate a new config:

```text
.agents/skills/ai-assistant-config-generator/SKILL.md
```

See also:

- `docs/codex.md` for Codex prompts and verification commands.
- `docs/presets.md` for ready-to-copy example configs.

## Change The Assistant Role

Update:

- `assistantName`
- `welcomeMessage`
- `systemPrompt`

Keep the system prompt specific and honest about the assistant's limits. Avoid presenting the app as a licensed professional service unless you have added the compliance, review, and escalation paths required for that domain.

## Change Model Settings

Update:

- `model_settings.provider`
- `model_settings.model_name`
- `model_settings.temperature`
- `model_settings.max_tokens`

The default provider is `groq` and the default model is `llama-3.3-70b-versatile`.

## Change Theme Colors

Update:

- `ui_theme.light`
- `ui_theme.dark`

Use valid hex colors and check contrast in both light and dark modes.

## Customize Blocked Keywords

Update:

- `blockedKeywords`
- `fallbackMessage`

This is a basic blocked keyword mechanism for prototypes. It is not a complete safety, moderation, or compliance system.

For sensitive domains such as wellness, healthcare, HR, finance, legal, education, or support workflows involving private data, add stronger safety checks, privacy review, data retention rules, and human escalation paths.
