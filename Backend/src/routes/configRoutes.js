const express = require('express');
const { getPublicAiConfig } = require('../config/aiConfig');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(getPublicAiConfig());
});

module.exports = router;
