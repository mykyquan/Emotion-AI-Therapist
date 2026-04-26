const { AppError } = require('../middleware/errors');
const { getAiConfig } = require('../config/aiConfig');
const { buildGroqMessages } = require('../prompts/systemPrompts');

const GROQ_CHAT_COMPLETIONS_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_REQUEST_TIMEOUT_MS = 30000;

function createTimeoutSignal(timeoutMs) {
    if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
        return AbortSignal.timeout(timeoutMs);
    }

    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeoutMs);
    return controller.signal;
}

/**
 * Calls Groq through the backend so provider credentials never need to be
 * exposed to browser code. The prompt is assembled from ai-config.json plus
 * request-specific context in buildGroqMessages().
 */
async function requestAssistantReply({ context, message, lang, conversationHistory = [] }) {
    const { model_settings: modelSettings } = getAiConfig();
    const modelName = modelSettings.model_name;

    if (!process.env.GROQ_API_KEY) {
        throw new AppError('Missing GROQ_API_KEY.', 500, {
            reply: "Sorry, I can't think right now. (Make sure Groq is configured!)",
            error: 'Missing GROQ_API_KEY'
        });
    }

    const messages = buildGroqMessages({ context, message, lang, conversationHistory });

    if (process.env.DEBUG_AI === 'true') {
        // Local debugging only: these logs may contain user messages.
        console.log('Groq model:', modelName);
        console.log('FINAL SYSTEM INSTRUCTION SENT TO AI:', messages[0].content);
        console.log('FINAL USER PROMPT SENT TO AI:', messages[1].content);
    }

    let response;

    try {
        response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            signal: createTimeoutSignal(GROQ_REQUEST_TIMEOUT_MS),
            body: JSON.stringify({
                model: modelName,
                temperature: modelSettings.temperature,
                max_tokens: modelSettings.max_tokens,
                messages
            })
        });
    } catch (error) {
        if (error.name === 'AbortError' || error.name === 'TimeoutError') {
            console.error('Groq request timed out:', { model: modelName, timeoutMs: GROQ_REQUEST_TIMEOUT_MS });
            throw new AppError('Groq request timed out.', 504, {
                reply: "Sorry, the AI provider took too long to respond. Please try again.",
                error: 'AI provider request timed out'
            });
        }

        throw error;
    }

    const rawData = await response.text();
    let data = {};

    // Groq usually returns JSON. Parse explicitly so proxy or provider errors are easier to diagnose.
    try {
        data = rawData ? JSON.parse(rawData) : {};
    } catch (parseError) {
        console.error('Groq returned non-JSON response:', {
            status: response.status,
            statusText: response.statusText,
            body: rawData
        });
        throw new AppError('Groq returned a non-JSON response.', 502, {
            reply: "Sorry, I couldn't read the AI response. Please try again.",
            error: 'Groq returned a non-JSON response'
        });
    }

    if (process.env.DEBUG_AI === 'true') {
        console.log('RAW AI RESPONSE:', data.choices?.[0]?.message?.content);
    }

    if (response.status === 429 || response.status === 503) {
        console.error('Groq capacity/rate-limit failure:', {
            status: response.status,
            statusText: response.statusText,
            model: modelName,
            data
        });
    }

    if (!response.ok) {
        console.error('Groq API error response:', {
            status: response.status,
            statusText: response.statusText,
            model: modelName,
            data
        });

        throw new AppError('Groq request failed.', response.status, {
            reply: "Sorry, I can't think right now. Please try again soon.",
            error: data.error?.message || response.statusText || 'Groq request failed'
        });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (reply == null) {
        console.error('Groq response missing choices[0].message.content:', data);
        throw new AppError('Groq response missing message content.', 502, {
            reply: "Sorry, I couldn't read the AI response. Please try again.",
            error: 'Groq response missing message content'
        });
    }

    return reply;
}

module.exports = {
    GROQ_REQUEST_TIMEOUT_MS,
    requestAssistantReply
};
