const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/apiResponse');

const validateContactInput = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters')
    .escape(),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters')
    .escape(),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters long')
    .isLength({ max: 3000 })
    .withMessage('Message cannot exceed 3000 characters')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorArray = errors.array().map(err => err.msg);
      return errorResponse(res, 400, 'Invalid request input', errorArray);
    }
    next();
  }
];

module.exports = {
  validateContactInput
};
