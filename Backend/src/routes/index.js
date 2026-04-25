const express = require('express');
const chatRoutes = require('./chatRoutes');
const configRoutes = require('./configRoutes');
const contextRoutes = require('./contextRoutes');
const historyRoutes = require('./historyRoutes');

const router = express.Router();

router.use('/chat', chatRoutes);
router.use('/config', configRoutes);
router.use('/context', contextRoutes);
router.use('/history', historyRoutes);

module.exports = router;
