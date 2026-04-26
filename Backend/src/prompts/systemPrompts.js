const { getAiConfig } = require('../config/aiConfig');
const { getDefaultMessage, resolveLanguage } = require('./languages');

function buildHistoryBlock({ conversationHistory = [], context, userMessage }) {
    const validHistory = conversationHistory
        .filter(entry => entry && typeof entry.message === 'string')
        .map(entry => ({
            context: typeof entry.context === 'string' && entry.context.trim() ? entry.context.trim() : 'General',
            message: entry.message.trim()
        }))
        .filter(entry => entry.message);

    const latestEntry = validHistory.at(-1);
    const historyWithoutCurrent = latestEntry
        && latestEntry.message === userMessage
        && latestEntry.context === context
        ? validHistory.slice(0, -1)
        : validHistory;

    if (historyWithoutCurrent.length === 0) {
        return 'Recent Redis conversation history: none yet.';
    }

    const historyLines = historyWithoutCurrent
        .map((entry, index) => `${index + 1}. Context: ${entry.context}\nUser: ${entry.message}`)
        .join('\n\n');

    return `Recent Redis conversation history (oldest to newest, bounded):\n${historyLines}`;
}

function buildGroqMessages({ context, message, lang, conversationHistory = [] }) {
    const selectedLang = resolveLanguage(lang);
    const { systemPrompt } = getAiConfig();
    const userMessage = message || getDefaultMessage(selectedLang);
    const selectedContext = context || 'General';
    const contextLine = `User-selected context: ${selectedContext}`;
    const historyBlock = buildHistoryBlock({ conversationHistory, context: selectedContext, userMessage });

    return [
        // Keep broad persona rules in ai-config.json and add per-request data below.
        { role: 'system', content: `${systemPrompt}\nRespond using this language code when practical: ${selectedLang}.` },
        // Inject custom RAG, database results, or product state into this user message.
        { role: 'user', content: `${historyBlock}\n\n${contextLine}\n\nCurrent user message:\n${userMessage}` }
    ];
}

module.exports = {
    buildHistoryBlock,
    buildGroqMessages
};
