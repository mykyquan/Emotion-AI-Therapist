class AppError extends Error {
    constructor(message, statusCode = 500, publicPayload = null) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.publicPayload = publicPayload;
    }
}

function notFoundHandler(req, res) {
    res.status(404).json({ message: 'Route not found.' });
}

function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    console.error(error);

    if (error.publicPayload) {
        return res.status(error.statusCode || 500).json(error.publicPayload);
    }

    return res.status(error.statusCode || 500).json({
        message: error.statusCode && error.statusCode < 500 ? error.message : 'Server error.'
    });
}

module.exports = {
    AppError,
    errorHandler,
    notFoundHandler
};
