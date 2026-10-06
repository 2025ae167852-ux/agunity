const { AppError } = require('../utils/errors');

function errorHandler(err, _req, res, _next) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Internal server error';
  const details = err instanceof AppError ? err.details : undefined;

  const payload = {
    status: 'error',
    message,
  };

  if (details) {
    payload.details = details;
  }

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err?.stack;
  }

  res.status(statusCode).json(payload);
}

module.exports = {
  errorHandler,
};
