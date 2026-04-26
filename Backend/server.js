// Backend/server.js
require('dotenv').config();

const express = require('express');
const apiRoutes = require('./src/routes');
const { createCorsMiddleware } = require('./src/middleware/cors');
const { errorHandler, notFoundHandler } = require('./src/middleware/errors');
const { connectRedis, redisClient } = require('./src/services/redisService');

const app = express();
const PORT = process.env.PORT || 3000;
let server;
let isShuttingDown = false;

// Middleware
app.use(createCorsMiddleware());
app.use(express.json());
app.use('/api', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

connectRedis()
    .then(() => {
        server = app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });

async function closeHttpServer() {
    if (!server) return;

    await new Promise((resolve, reject) => {
        server.close(error => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}

async function closeRedisClient() {
    if (!redisClient.isOpen) return;

    try {
        await redisClient.quit();
    } catch (error) {
        if (redisClient.isOpen) {
            console.warn('Redis quit failed during shutdown:', error.message);
        }
    }
}

async function shutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`Received ${signal}. Shutting down gracefully...`);

    try {
        await closeHttpServer();
        await closeRedisClient();
        process.exit(0);
    } catch (error) {
        console.error('Graceful shutdown failed:', error);
        process.exit(1);
    }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
