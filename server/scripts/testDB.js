require('dotenv').config();
const dns = require('dns');
const mongoose = require('mongoose');

// Configure Google & Cloudflare DNS servers for reliable MongoDB Atlas SRV lookup on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore fallback if custom DNS set fails
}

const testConnection = async () => {
  console.log('--- 1. Environment Variable Validation ---');
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is missing.');
    process.exit(1);
  }
  console.log('✅ MONGODB_URI found in process.env (secured via dotenv, credentials hidden).');

  console.log('\n--- 2. Connecting to MongoDB ---');
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('✅ Connection reused. Mongoose already connected.');
    } else {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
        maxPoolSize: 10
      });
      console.log(`✅ MongoDB Connected Successfully to Host: ${conn.connection.host}`);
    }

    const db = mongoose.connection.db;
    const dbName = db ? db.databaseName : 'portfoliopro';
    console.log(`\n--- 3. Database Name ---`);
    console.log(`Database Name: ${dbName}`);

    console.log('\n--- 4. Collections Check & Creation ---');
    const Profile = require('../models/Profile');
    const Skill = require('../models/Skill');
    const Project = require('../models/Project');
    const Contact = require('../models/Contact');

    console.log('\n--- 5. Verifying CRUD Operations ---');
    
    // Create (C)
    const testDoc = await Contact.create({
      name: 'Atlas Verification Test',
      email: 'test.db@example.com',
      subject: 'Database CRUD Verification',
      message: 'Testing MongoDB Atlas connection, collection creation, and CRUD operations.'
    });
    console.log(`[CREATE] Contact Document Created with ID: ${testDoc._id}`);

    // Read (R)
    const readDoc = await Contact.findById(testDoc._id);
    console.log(`[READ] Retrieved Contact Name: "${readDoc.name}", Subject: "${readDoc.subject}"`);

    // Update (U)
    readDoc.subject = 'Database CRUD Verification (Updated)';
    await readDoc.save();
    console.log(`[UPDATE] Updated Contact Subject: "${readDoc.subject}"`);

    // Delete (D)
    await Contact.findByIdAndDelete(testDoc._id);
    console.log(`[DELETE] Test Contact Document Deleted cleanly.`);

    // Get list of existing collections
    const collections = await db.listCollections().toArray();
    console.log(`\n--- 6. Active Database Collections ---`);
    collections.forEach(col => console.log(` - Collection: ${col.name}`));

    console.log('\n✅ All Database Connection and CRUD Tests PASSED successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ MongoDB Connection / Operation Error:');
    console.error(error.message);
    process.exit(1);
  }
};

testConnection();
