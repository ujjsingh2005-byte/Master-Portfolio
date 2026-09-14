const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/apiResponse');

// General API rate limiter (100 requests per 15 minutes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 429, 'Too many requests from this IP, please try again after 15 minutes.');
  }
});

// Stricter rate limiter for contact form submissions (5 requests per 15 minutes)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 429, 'Contact submission limit reached. Please try again later.');
  }
});

module.exports = {
  apiLimiter,
  contactLimiter
};
