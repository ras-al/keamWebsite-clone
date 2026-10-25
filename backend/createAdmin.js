// backend/createAdmin.js
// Utility script to manually create an Administrator account
// Usage:
//   node createAdmin.js [username] [password] [email] [fullName]
// Example:
//   node createAdmin.js admin Admin@123 admin@cee.kerala.gov.in "System Admin"
// If run without arguments, it defaults to:
//   Username: admin
//   Password: Admin@123
//   Email: admin@cee.kerala.gov.in
//   Full Name: CEE Administrator

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const Admin = require('./models/Admin');
const Candidate = require('./models/Candidate');

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI is missing in backend/.env');
      process.exit(1);
    }

    const args = process.argv.slice(2);
    const username = (args[0] || 'admin').trim();
    const password = (args[1] || 'Admin@123').trim();
    const email = (args[2] || 'admin@cee.kerala.gov.in').trim().toLowerCase();
    const fullName = (args[3] || 'CEE Administrator').trim();

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 1. Create or update in Admin model
    await Admin.deleteOne({ $or: [{ username }, { email }] });
    const adminDoc = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    // 2. Also register in Candidate model with role='admin' so both auth flows recognize the admin
    await Candidate.deleteOne({ $or: [{ applicationNumber: username }, { email }] });
    await Candidate.create({
      applicationNumber: username,
      fullName,
      dob: '1990-01-01',
      email,
      mobileNumber: '9999999999',
      gender: 'Male',
      category: 'General',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('\n=========================================');
    console.log('🎉 Administrator Account Created Successfully!');
    console.log('=========================================');
    console.log(`Username / App No : ${username}`);
    console.log(`Password          : ${password}`);
    console.log(`Email             : ${email}`);
    console.log(`Full Name         : ${fullName}`);
    console.log(`Role              : admin`);
    console.log('=========================================\n');
    console.log('You can now log in at http://localhost:3000/login using:');
    console.log(`Application Number / Username: ${username}`);
    console.log(`Password: ${password}\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin account:', error.message);
    process.exit(1);
  }
}

createAdmin();
