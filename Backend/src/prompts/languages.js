const SUPPORTED_LANGUAGES = ['en', 'vi', 'zh-CN', 'zh-TW'];

const fallbackContexts = {
    en: 'General',
    vi: 'Chung',
    'zh-CN': '通用',
    'zh-TW': '通用'
};

const defaultMessages = {
    en: 'No user message provided.',
    vi: 'Người dùng chưa nhập nội dung.',
    'zh-CN': '用户未提供消息。',
    'zh-TW': '使用者未提供訊息。'
};

function resolveLanguage(lang) {
    return typeof lang === 'string' && SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
}

function getFallbackContext(lang) {
    return fallbackContexts[resolveLanguage(lang)];
}

function getDefaultMessage(lang) {
    return defaultMessages[resolveLanguage(lang)];
}

module.exports = {
    SUPPORTED_LANGUAGES,
    getDefaultMessage,
    getFallbackContext,
    resolveLanguage
};
