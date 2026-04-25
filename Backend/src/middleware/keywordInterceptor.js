const { getAiConfig } = require('../config/aiConfig');

function normalizeKeyword(keyword) {
    return String(keyword || '').trim().toLowerCase();
}

function getTextForKeywordScan(req) {
    const body = req.body || {};

    return [
        body.message,
        body.description,
        body.note,
        body.context,
        body.contextLabel
    ]
        .filter(value => typeof value === 'string')
        .join(' ')
        .toLowerCase();
}

function findBlockedKeyword(text, blockedKeywords) {
    return blockedKeywords
        .map(normalizeKeyword)
        .filter(Boolean)
        .find(keyword => text.includes(keyword));
}

/**
 * Lightweight blocked keyword middleware for starter-kit guardrails.
 *
 * This is intentionally simple so developers can understand and replace it.
 * It is not a complete moderation, safety, or compliance layer.
 */
function createKeywordInterceptor(config = getAiConfig()) {
    return (req, res, next) => {
        const blockedKeywords = Array.isArray(config.blockedKeywords) ? config.blockedKeywords : [];
        const matchedKeyword = findBlockedKeyword(getTextForKeywordScan(req), blockedKeywords);

        if (!matchedKeyword) {
            return next();
        }

        console.warn('Keyword interception triggered:', { matchedKeyword });

        // Keep blocked requests out of the LLM call path and return the configured fallback.
        return res.status(200).json({
            blocked: true,
            matchedKeyword,
            reply: config.fallbackMessage
        });
    };
}

module.exports = {
    createKeywordInterceptor,
    findBlockedKeyword
};
