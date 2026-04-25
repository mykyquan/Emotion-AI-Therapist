const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { clearHistory, getHistory } = require('../services/historyService');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const history = await getHistory();
    res.status(200).json(history);
}));

router.delete('/', asyncHandler(async (req, res) => {
    await clearHistory();
    res.json({ message: 'History cleared!' });
}));

module.exports = router;
