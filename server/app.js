require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Route Imports
const healthRoutes = require('./routes/healthRoutes');
const profileRoutes = require('./routes/profileRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Connect Database
connectDB();

// Security & Utility Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Support large payloads (for project image file uploads as Base64 Data URLs)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Apply General Rate Limiting to all /api routes
app.use('/api', apiLimiter);

// API Endpoint Declarations
app.use('/api', healthRoutes);
app.use('/api', profileRoutes);
app.use('/api', skillRoutes);
app.use('/api', projectRoutes);
app.use('/api', contactRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to PortfolioPro API Service',
    documentation: '/api/health'
  });
});

// Fallback & Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
