const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error('[Error Handler Log]:', err.stack || err.message || err);

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred. Please try again later.'
    : (err.message || 'Internal Server Error');

  return errorResponse(res, statusCode, message);
};

const notFoundHandler = (req, res) => {
  return errorResponse(res, 404, `Route not found - ${req.originalUrl}`);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
