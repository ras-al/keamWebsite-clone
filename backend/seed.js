// backend/seed.js
// KEAM Portal - Database Seed Script
// Inserts sample candidates and applications for demonstration purposes
//
// Usage:
//   cd backend
//   node seed.js
//
// This will:
//   1. Connect to MongoDB Atlas
//   2. Clear existing candidates and applications
//   3. Insert 5 sample candidates with hashed passwords
//   4. Insert 5 sample applications with different statuses
//   5. Disconnect and exit

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const Candidate = require('./models/Candidate');
const Application = require('./models/Application');

// ===== SAMPLE DATA =====

const candidates = [
  {
    applicationNumber: '2600001',
    fullName: 'Faheem Shan',
    dob: '2005-06-15',
    email: 'faheem@test.com',
    mobileNumber: '9876543210',
    gender: 'Male',
    category: 'General',
    password: 'Password@123',
    role: 'candidate'
  },
  {
    applicationNumber: '2600002',
    fullName: 'Safdil Arafath',
    dob: '2005-03-22',
    email: 'safdil@test.com',
    mobileNumber: '9876543211',
    gender: 'Male',
    category: 'OBC',
    password: 'Password@123',
    role: 'candidate'
  },
  {
    applicationNumber: '2600003',
    fullName: 'Shan M A',
    dob: '2005-09-10',
    email: 'shan@test.com',
    mobileNumber: '9876543212',
    gender: 'Male',
    category: 'SC',
    password: 'Password@123',
    role: 'admin'
  },
  {
    applicationNumber: '2600004',
    fullName: 'Ayman Riaz',
    dob: '2005-01-18',
    email: 'ayman@test.com',
    mobileNumber: '9876543213',
    gender: 'Male',
    category: 'General',
    password: 'Password@123',
    role: 'candidate'
  },
  {
    applicationNumber: '2600005',
    fullName: 'Rasal Musthafa',
    dob: '2005-11-05',
    email: 'rasal@test.com',
    mobileNumber: '9876543214',
    gender: 'Male',
    category: 'OBC',
    password: 'Password@123',
    role: 'candidate'
  }
];

// Applications with different statuses for demo variety
function buildApplications(candidateIds) {
  return [
    {
      candidateId: candidateIds[0],
      applicationNumber: '2600001',
      personalDetails: {
        candidateName: 'Faheem Shan',
        dob: '2005-06-15',
        gender: 'Male',
        category: 'General',
        religion: 'Islam',
        nationality: 'Indian',
        aadhaarNumber: '1234 5678 9012',
        fatherName: 'Shan M',
        motherName: 'Amina K'
      },
      academicDetails: {
        qualifyingExam: 'Plus Two (HSE Kerala)',
        board: 'DHSE Kerala',
        passYear: '2026',
        totalMarks: '480',
        percentage: '96',
        schoolName: 'Govt. HSS Thiruvananthapuram',
        schoolDistrict: 'Thiruvananthapuram'
      },
      courseSelections: ['Engineering'],
      communicationDetails: {
        permanentAddress: 'Shan House, Santhi Nagar, Kazhakkoottam',
        district: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695001',
        mobileNumber: '9876543210',
        email: 'faheem@test.com'
      },
      paymentDetails: {
        amount: 800,
        paymentMethod: 'Net Banking',
        transactionId: 'TXN1001001',
        status: 'Paid',
        paidAt: new Date()
      },
      status: 'Submitted',
      currentStep: 4,
      remarks: ''
    },
    {
      candidateId: candidateIds[1],
      applicationNumber: '2600002',
      personalDetails: {
        candidateName: 'Safdil Arafath',
        dob: '2005-03-22',
        gender: 'Male',
        category: 'OBC',
        religion: 'Islam',
        nationality: 'Indian',
        aadhaarNumber: '2345 6789 0123',
        fatherName: 'Arafath M',
        motherName: 'Fathima S'
      },
      academicDetails: {
        qualifyingExam: 'Plus Two (HSE Kerala)',
        board: 'DHSE Kerala',
        passYear: '2026',
        totalMarks: '465',
        percentage: '93',
        schoolName: 'TKM HSS Kollam',
        schoolDistrict: 'Kollam'
      },
      courseSelections: ['Engineering', 'Architecture'],
      communicationDetails: {
        permanentAddress: 'Arafath Villa, Chinnakkada, Kollam',
        district: 'Kollam',
        state: 'Kerala',
        pincode: '691001',
        mobileNumber: '9876543211',
        email: 'safdil@test.com'
      },
      paymentDetails: {
        amount: 800,
        paymentMethod: 'UPI',
        transactionId: 'TXN1001002',
        status: 'Paid',
        paidAt: new Date()
      },
      status: 'Approved',
      currentStep: 6,
      remarks: 'All documents verified successfully. Admit card will be generated shortly.'
    },
    {
      candidateId: candidateIds[2],
      applicationNumber: '2600003',
      personalDetails: {
        candidateName: 'Shan M A',
        dob: '2005-09-10',
        gender: 'Male',
        category: 'SC',
        religion: 'Hindu',
        nationality: 'Indian',
        aadhaarNumber: '3456 7890 1234',
        fatherName: 'Mohandas A',
        motherName: 'Sreelatha M'
      },
      academicDetails: {
        qualifyingExam: 'Plus Two (HSE Kerala)',
        board: 'DHSE Kerala',
        passYear: '2026',
        totalMarks: '440',
        percentage: '88',
        schoolName: 'Govt. Model HSS Ernakulam',
        schoolDistrict: 'Ernakulam'
      },
      courseSelections: ['Engineering'],
      communicationDetails: {
        permanentAddress: 'Mohan Bhavan, Kakkanad, Ernakulam',
        district: 'Ernakulam',
        state: 'Kerala',
        pincode: '682030',
        mobileNumber: '9876543212',
        email: 'shan@test.com'
      },
      paymentDetails: {
        amount: 800,
        paymentMethod: 'Debit Card',
        transactionId: 'TXN1001003',
        status: 'Paid',
        paidAt: new Date()
      },
      status: 'Defective',
      currentStep: 3,
      remarks: 'Community certificate scan is not legible. Please re-upload a clear scanned copy.'
    },
    {
      candidateId: candidateIds[3],
      applicationNumber: '2600004',
      personalDetails: {
        candidateName: 'Ayman Riaz',
        dob: '2005-01-18',
        gender: 'Male',
        category: 'General',
        religion: 'Islam',
        nationality: 'Indian',
        aadhaarNumber: '4567 8901 2345',
        fatherName: 'Riaz K',
        motherName: 'Nafeesa R'
      },
      academicDetails: {
        qualifyingExam: 'CBSE Board',
        board: 'CBSE',
        passYear: '2026',
        totalMarks: '455',
        percentage: '91',
        schoolName: 'Kendriya Vidyalaya Kochi',
        schoolDistrict: 'Ernakulam'
      },
      courseSelections: ['Engineering', 'Architecture'],
      communicationDetails: {
        permanentAddress: 'Riaz Manzil, MG Road, Kochi',
        district: 'Ernakulam',
        state: 'Kerala',
        pincode: '682016',
        mobileNumber: '9876543213',
        email: 'ayman@test.com'
      },
      paymentDetails: {
        amount: 800,
        paymentMethod: 'Credit Card',
        transactionId: 'TXN1001004',
        status: 'Paid',
        paidAt: new Date()
      },
      status: 'Under Verification',
      currentStep: 3,
      remarks: 'Documents under verification by CEE officer.'
    },
    {
      candidateId: candidateIds[4],
      applicationNumber: '2600005',
      personalDetails: {
        candidateName: 'Rasal Musthafa',
        dob: '2005-11-05',
        gender: 'Male',
        category: 'OBC',
        religion: 'Islam',
        nationality: 'Indian',
        aadhaarNumber: '5678 9012 3456',
        fatherName: 'Musthafa P',
        motherName: 'Rukhiya M'
      },
      academicDetails: {
        qualifyingExam: 'Plus Two (HSE Kerala)',
        board: 'DHSE Kerala',
        passYear: '2026',
        totalMarks: '490',
        percentage: '98',
        schoolName: 'TKM College HSS Kollam',
        schoolDistrict: 'Kollam'
      },
      courseSelections: ['Engineering'],
      communicationDetails: {
        permanentAddress: 'Musthafa House, Kottiyam, Kollam',
        district: 'Kollam',
        state: 'Kerala',
        pincode: '691571',
        mobileNumber: '9876543214',
        email: 'rasal@test.com'
      },
      paymentDetails: {
        amount: 800,
        paymentMethod: 'UPI',
        transactionId: 'TXN1001005',
        status: 'Paid',
        paidAt: new Date()
      },
      status: 'Submitted',
      currentStep: 4,
      remarks: ''
    }
  ];
}

// ===== SEED FUNCTION =====

async function seed() {
  try {
    // 1. Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // 2. Clear existing data
    await Candidate.deleteMany({});
    await Application.deleteMany({});
    console.log('🗑️  Cleared existing candidates and applications');

    // 3. Hash passwords and insert candidates
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password@123', salt);

    const candidateDocs = candidates.map(c => ({
      ...c,
      password: hashedPassword
    }));

    const insertedCandidates = await Candidate.insertMany(candidateDocs);
    const candidateIds = insertedCandidates.map(c => c._id);
    console.log(`👤 Inserted ${insertedCandidates.length} candidates`);

    // 4. Insert applications
    const applications = buildApplications(candidateIds);
    const insertedApps = await Application.insertMany(applications);
    console.log(`📝 Inserted ${insertedApps.length} applications`);

    // 5. Print login credentials
    console.log('\n════════════════════════════════════════════');
    console.log('  DEMO LOGIN CREDENTIALS');
    console.log('  All passwords: Password@123');
    console.log('════════════════════════════════════════════');
    console.log('');
    insertedCandidates.forEach(c => {
      const app = insertedApps.find(a => a.applicationNumber === c.applicationNumber);
      console.log(`  ${c.fullName}`);
      console.log(`    App No: ${c.applicationNumber}  |  Status: ${app ? app.status : 'N/A'}`);
      console.log('');
    });
    console.log('════════════════════════════════════════════');
    console.log('✅ Seeding complete! Start the server with: npm run dev');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
