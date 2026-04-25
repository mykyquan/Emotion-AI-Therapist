// Backend/server.js
require('dotenv').config();

const express = require('express');
const apiRoutes = require('./src/routes');
const { createCorsMiddleware } = require('./src/middleware/cors');
const { errorHandler, notFoundHandler } = require('./src/middleware/errors');
const { connectRedis } = require('./src/services/redisService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(createCorsMiddleware());
app.use(express.json());
app.use('/api', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

connectRedis()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });
