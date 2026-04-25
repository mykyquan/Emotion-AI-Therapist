# Security Policy

This project is an educational starter kit and is not production-ready by default.

## Reporting Security Issues

Do not post secrets, private user data, or sensitive exploit details publicly.

For non-sensitive security suggestions, open a GitHub issue with a clear description.

For sensitive vulnerabilities, please avoid posting exploit details publicly. Open a minimal issue asking for a private contact path.

## Security Notes

- Never commit real `.env` files or API keys.
- Rotate any API key that was ever committed by mistake.
- Keep LLM provider keys on the backend.
- Restrict CORS origins before public deployment.
- Add authentication, rate limiting, monitoring, and stronger safety checks before exposing the app to real users.
