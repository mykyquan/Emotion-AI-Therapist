const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { validateContextRequest } = require('../middleware/validators');
const { saveContextEntry } = require('../services/historyService');

const router = express.Router();

router.post('/', validateContextRequest, asyncHandler(async (req, res) => {
    const entry = await saveContextEntry(req.contextInput);
    res.status(201).json({ message: 'Saved!', entry });
}));

module.exports = router;
