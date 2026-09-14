require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 PortfolioPro Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
