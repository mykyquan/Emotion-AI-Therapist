const { AppError } = require('./errors');
const { getFallbackContext, resolveLanguage } = require('../prompts/languages');

function getRequestBody(req) {
    const body = req.body === undefined ? {} : req.body;

    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
        throw new AppError('Request body must be a JSON object.', 400, {
            message: 'Please send a JSON object with text fields.'
        });
    }

    return body;
}

function readOptionalString(body, fieldName) {
    const value = body[fieldName];

    if (value == null) {
        return '';
    }

    if (typeof value !== 'string') {
        throw new AppError(`"${fieldName}" must be text.`, 400, {
            message: `Please send "${fieldName}" as text.`
        });
    }

    return value.trim();
}

function validateContextRequest(req, res, next) {
    try {
        const body = getRequestBody(req);
        const context = readOptionalString(body, 'context');
        const contextLabel = readOptionalString(body, 'contextLabel');
        const description = readOptionalString(body, 'description');
        const message = readOptionalString(body, 'message');

        req.contextInput = {
            context: context || contextLabel || 'General',
            message: message || description || ''
        };

        next();
    } catch (error) {
        next(error);
    }
}

function validateChatRequest(req, res, next) {
    try {
        const body = getRequestBody(req);
        const context = readOptionalString(body, 'context');
        const contextLabel = readOptionalString(body, 'contextLabel');
        const description = readOptionalString(body, 'description');
        const message = readOptionalString(body, 'message');
        const note = readOptionalString(body, 'note');
        const lang = readOptionalString(body, 'lang');
        const selectedLang = resolveLanguage(lang);
        const normalizedMessage = message || description || note || '';

        req.chatInput = {
            context: context || contextLabel || getFallbackContext(selectedLang),
            message: normalizedMessage,
            lang: selectedLang
        };

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateContextRequest,
    validateChatRequest
};
