const express = require('express');
const { AppError } = require('../middleware/errors');
const { createKeywordInterceptor } = require('../middleware/keywordInterceptor');
const { validateChatRequest } = require('../middleware/validators');
const { requestAssistantReply } = require('../services/groqService');
const { getRecentHistory } = require('../services/historyService');

const router = express.Router();

// Chat requests pass through validation, the starter keyword guardrail, then the Groq service.
router.post('/', validateChatRequest, createKeywordInterceptor(), async (req, res, next) => {
    try {
        const { context, message, lang } = req.chatInput;

        console.log('Received lang:', lang);

        const conversationHistory = await getRecentHistory(10);

        // Add retrieval, tools, or app-specific orchestration here before calling the model.
        const reply = await requestAssistantReply({ context, message, lang, conversationHistory });

        res.json({ reply });
    } catch (error) {
        if (error instanceof AppError && error.publicPayload) error.publicPayload.reply ||= error.message;

        next(error);
    }
});

module.exports = router;
