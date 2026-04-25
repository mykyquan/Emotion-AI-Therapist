const { redisClient } = require('./redisService');

async function saveContextEntry({ context, message }) {
    const newEntry = {
        id: Date.now(),
        context,
        message,
        timestamp: new Date().toISOString()
    };

    await redisClient.rPush('assistant_history', JSON.stringify(newEntry));
    return newEntry;
}

async function getHistory() {
    const history = await redisClient.lRange('assistant_history', 0, -1);
    return history.map(item => JSON.parse(item)).reverse();
}

async function clearHistory() {
    await redisClient.del('assistant_history');
}

module.exports = {
    clearHistory,
    getHistory,
    saveContextEntry
};
