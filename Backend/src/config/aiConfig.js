const baseConfig = require('./ai-config.json');

function parseListEnv(value) {
    if (!value) return null;

    return value
        .split(',')
        .map(item => item.trim())
        .filter(Boolean);
}

function parseNumberEnv(value, fallback) {
    if (value == null || value === '') return fallback;

    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function getAiConfig() {
    const modelSettings = baseConfig.model_settings || {};

    return {
        ...baseConfig,
        assistantName: process.env.ASSISTANT_NAME || baseConfig.assistantName,
        welcomeMessage: process.env.WELCOME_MESSAGE || baseConfig.welcomeMessage,
        // Modify SYSTEM_PROMPT in .env or ai-config.json to change the assistant's personality.
        systemPrompt: process.env.SYSTEM_PROMPT || baseConfig.systemPrompt,
        model_settings: {
            ...modelSettings,
            provider: process.env.AI_PROVIDER || modelSettings.provider,
            model_name: process.env.AI_MODEL_NAME || process.env.GROQ_MODEL || modelSettings.model_name,
            temperature: parseNumberEnv(process.env.AI_TEMPERATURE, modelSettings.temperature),
            max_tokens: parseNumberEnv(process.env.AI_MAX_TOKENS, modelSettings.max_tokens)
        },
        blockedKeywords: parseListEnv(process.env.BLOCKED_KEYWORDS) || baseConfig.blockedKeywords,
        fallbackMessage: process.env.FALLBACK_MESSAGE || baseConfig.fallbackMessage
    };
}

function getPublicAiConfig() {
    const { assistantName, ui_theme, welcomeMessage } = getAiConfig();

    return { assistantName, ui_theme, welcomeMessage };
}

module.exports = {
    getAiConfig,
    getPublicAiConfig
};
