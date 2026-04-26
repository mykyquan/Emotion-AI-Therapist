# Presets

Presets are ready-to-copy `ai-config.json` examples for common assistant types.

Available presets:

- `presets/study-coach.json`
- `presets/coding-tutor.json`
- `presets/customer-support.json`
- `presets/sales-assistant.json`
- `presets/wellness-companion.json`
- `presets/language-tutor.json`
- `presets/career-coach.json`

## Use A Preset

Copy a preset into the active config:

```bash
cp presets/study-coach.json Backend/src/config/ai-config.json
```

Validate the JSON:

```bash
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/ai-config.json', 'utf8')); console.log('ai-config.json OK')"
```

Restart the app after replacing the config.

With Docker:

```bash
docker compose down
docker compose up --build
```

Without Docker, restart the backend:

```bash
npm run dev:backend
```

## Review Before Deployment

Presets are examples for learning and prototyping. Review prompts, blocked keywords, fallback messages, privacy expectations, and domain-specific safety needs before any public deployment.
