const cors = require('cors');

const DEFAULT_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

function buildAllowedOrigins() {
    const configuredAllowedOrigins = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || '')
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean);

    return [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredAllowedOrigins])];
}

function createCorsMiddleware() {
    const allowedOrigins = buildAllowedOrigins();

    return cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS blocked request from origin: ${origin}`));
        }
    });
}

module.exports = { createCorsMiddleware };
