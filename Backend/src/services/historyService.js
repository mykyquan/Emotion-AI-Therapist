const { redisClient } = require('./redisService');

const HISTORY_KEY = 'assistant_history';
const DEFAULT_RECENT_HISTORY_LIMIT = 10;

function parseHistoryItems(items) {
    return items
        .map(item => {
            try {
                return JSON.parse(item);
            } catch (error) {
                console.warn('Skipping invalid history entry in Redis.');
                return null;
            }
        })
        .filter(Boolean);
}

async function saveContextEntry({ context, message }) {
    const newEntry = {
        id: Date.now(),
        context,
        message,
        timestamp: new Date().toISOString()
    };

    await redisClient.rPush(HISTORY_KEY, JSON.stringify(newEntry));
    return newEntry;
}

async function getHistory() {
    const history = await redisClient.lRange(HISTORY_KEY, 0, -1);
    return parseHistoryItems(history).reverse();
}

async function getRecentHistory(limit = DEFAULT_RECENT_HISTORY_LIMIT) {
    const boundedLimit = Math.min(Math.max(Number(limit) || DEFAULT_RECENT_HISTORY_LIMIT, 1), DEFAULT_RECENT_HISTORY_LIMIT);
    const history = await redisClient.lRange(HISTORY_KEY, -boundedLimit, -1);
    return parseHistoryItems(history);
}

async function clearHistory() {
    await redisClient.del(HISTORY_KEY);
}

module.exports = {
    clearHistory,
    getHistory,
    getRecentHistory,
    saveContextEntry
};
