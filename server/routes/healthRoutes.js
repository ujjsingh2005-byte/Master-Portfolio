const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { successResponse } = require('../utils/apiResponse');

router.get('/health', (req, res) => {
  const status = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'PortfolioPro API',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected (Fallback mode active)'
  };
  return successResponse(res, 200, status, 'Server is running smoothly');
});

module.exports = router;
