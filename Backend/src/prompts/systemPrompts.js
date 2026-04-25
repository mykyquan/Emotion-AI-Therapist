const { getAiConfig } = require('../config/aiConfig');
const { getDefaultMessage, resolveLanguage } = require('./languages');

function buildGroqMessages({ context, message, lang }) {
    const selectedLang = resolveLanguage(lang);
    const { systemPrompt } = getAiConfig();
    const userMessage = message || getDefaultMessage(selectedLang);
    const contextLine = context ? `User-selected context: ${context}` : 'User-selected context: General';

    return [
        // Keep broad persona rules in ai-config.json and add per-request data below.
        { role: 'system', content: `${systemPrompt}\nRespond using this language code when practical: ${selectedLang}.` },
        // Inject custom RAG, database results, or product state into this user message.
        { role: 'user', content: `${contextLine}\n\nUser message:\n${userMessage}` }
    ];
}

module.exports = {
    buildGroqMessages
};
