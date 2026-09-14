const dns = require('dns');
const mongoose = require('mongoose');

// Configure public DNS resolvers for MongoDB Atlas SRV lookup compatibility
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Safe ignore if DNS override is disallowed by system policies
}

const connectDB = async () => {
  // 1. Connection Reuse Check (Prevents redundant socket connections)
  if (mongoose.connection.readyState >= 1) {
    console.log('✅ Reusing existing MongoDB connection.');
    return true;
  }

  // 2. Environment Variable Validation
  const connString = process.env.MONGODB_URI;

  if (!connString) {
    console.warn('⚠️ MONGODB_URI is not defined in process.env. Operating with in-memory fallback datasets.');
    return false;
  }

  // 3. Production-Ready Connection Configuration
  try {
    const conn = await mongoose.connect(connString, {
      serverSelectionTimeoutMS: 15000, // 15 seconds timeout for Atlas DNS & TLS
      maxPoolSize: 10,                  // Connection pool reuse limit
      socketTimeoutMS: 45000            // Close sockets after 45s of inactivity
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`📂 Active Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection attempt failed (${error.message}). Operating with in-memory fallback datasets.`);
    return false;
  }
};

module.exports = connectDB;
