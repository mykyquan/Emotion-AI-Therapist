const { getFallbackContext, resolveLanguage } = require('../prompts/languages');

function validateContextRequest(req, res, next) {
    const { context, contextLabel, description, message } = req.body || {};

    req.contextInput = {
        context: context || contextLabel || 'General',
        message: message || description || ''
    };

    next();
}

function validateChatRequest(req, res, next) {
    const { context, contextLabel, description, message, note, lang } = req.body || {};
    const selectedLang = resolveLanguage(lang);
    const normalizedMessage = (message || description || note || '').trim();

    req.chatInput = {
        context: context || contextLabel || getFallbackContext(selectedLang),
        message: normalizedMessage,
        lang: selectedLang
    };

    next();
}

module.exports = {
    validateContextRequest,
    validateChatRequest
};
