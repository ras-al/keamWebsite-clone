// backend/clearDB.js
// Script to completely wipe all dummy and seed data from MongoDB Atlas database
// Clears: candidates, applications, notifications, and admins

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Candidate = require('./models/Candidate');
const Application = require('./models/Application');
const Notification = require('./models/Notification');
const Admin = require('./models/Admin');

async function clearDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI is not defined in backend/.env');
      process.exit(1);
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB Atlas successfully.');

    // Count before deletion
    const candidateCount = await Candidate.countDocuments();
    const applicationCount = await Application.countDocuments();
    const notificationCount = await Notification.countDocuments();
    const adminCount = await Admin.countDocuments();

    console.log(`Current Document Counts:`);
    console.log(`- Candidates: ${candidateCount}`);
    console.log(`- Applications: ${applicationCount}`);
    console.log(`- Notifications: ${notificationCount}`);
    console.log(`- Admins: ${adminCount}`);

    console.log('\nWiping all data from database collections...');
    await Candidate.deleteMany({});
    await Application.deleteMany({});
    await Notification.deleteMany({});
    await Admin.deleteMany({});

    // Verify
    const verifyCandidate = await Candidate.countDocuments();
    const verifyApplication = await Application.countDocuments();
    const verifyNotification = await Notification.countDocuments();
    const verifyAdmin = await Admin.countDocuments();

    console.log('\n✅ Database wiped successfully and is now completely clean & fresh:');
    console.log(`- Candidates: ${verifyCandidate}`);
    console.log(`- Applications: ${verifyApplication}`);
    console.log(`- Notifications: ${verifyNotification}`);
    console.log(`- Admins: ${verifyAdmin}`);

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB. Done.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error wiping database:', error);
    process.exit(1);
  }
}

clearDatabase();
