// backend/seedParticipants.js
// Script to populate database with various participant (candidate) applications
// Uses team member names with diverse statuses, categories, and streams
// Preserves existing Administrator accounts

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const Candidate = require('./models/Candidate');
const Application = require('./models/Application');
const Notification = require('./models/Notification');

const participants = [
  {
    applicationNumber: '2600001',
    fullName: 'Faheem Shan',
    dob: '2005-06-15',
    email: 'faheem@test.com',
    mobileNumber: '9876543210',
    gender: 'Male',
    category: 'General',
    password: 'Password@123',
    role: 'candidate',
    application: {
      courseSelections: ['Engineering'],
      status: 'Submitted',
      currentStep: 4,
      remarks: 'Application submitted. Document scrutiny pending.',
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
        rollNumber: '8102451',
        totalMarks: '480',
        percentage: '96',
        schoolName: 'Govt. Model HSS Thiruvananthapuram'
      },
      communicationDetails: {
        permanentAddress: 'Shan House, Kazhakkoottam',
        district: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695001',
        mobileNumber: '9876543210',
        email: 'faheem@test.com',
        examCenterPref: 'Thiruvananthapuram'
      },
      paymentDetails: {
        amount: 800,
        paymentMode: 'Net Banking',
        paymentStatus: 'Paid',
        transactionId: 'TXN810001'
      }
    }
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
    role: 'candidate',
    application: {
      courseSelections: ['Engineering', 'Architecture'],
      status: 'Approved',
      currentStep: 6,
      remarks: 'All documents verified successfully. Approved for KEAM 2026.',
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
        rollNumber: '8102452',
        totalMarks: '465',
        percentage: '93',
        schoolName: 'TKM HSS Kollam'
      },
      communicationDetails: {
        permanentAddress: 'Arafath Villa, Chinnakkada',
        district: 'Kollam',
        state: 'Kerala',
        pincode: '691001',
        mobileNumber: '9876543211',
        email: 'safdil@test.com',
        examCenterPref: 'Kollam'
      },
      paymentDetails: {
        amount: 1000,
        paymentMode: 'UPI',
        paymentStatus: 'Paid',
        transactionId: 'TXN810002'
      }
    }
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
    role: 'candidate',
    application: {
      courseSelections: ['Engineering'],
      status: 'Defective',
      currentStep: 3,
      remarks: 'Community certificate scan is not legible. Please re-upload a clear copy.',
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
        rollNumber: '8102453',
        totalMarks: '440',
        percentage: '88',
        schoolName: 'Govt. Model HSS Ernakulam'
      },
      communicationDetails: {
        permanentAddress: 'Mohan Bhavan, Kakkanad',
        district: 'Ernakulam',
        state: 'Kerala',
        pincode: '682030',
        mobileNumber: '9876543212',
        email: 'shan@test.com',
        examCenterPref: 'Ernakulam'
      },
      paymentDetails: {
        amount: 400,
        paymentMode: 'Debit Card',
        paymentStatus: 'Paid',
        transactionId: 'TXN810003'
      }
    }
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
    role: 'candidate',
    application: {
      courseSelections: ['Medical', 'Pharmacy'],
      status: 'Rejected',
      currentStep: 3,
      remarks: 'Ineligible: Mandatory subject aggregate criteria not satisfied.',
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
        rollNumber: '8102454',
        totalMarks: '380',
        percentage: '76',
        schoolName: 'Kendriya Vidyalaya Kochi'
      },
      communicationDetails: {
        permanentAddress: 'Riaz Manzil, MG Road',
        district: 'Ernakulam',
        state: 'Kerala',
        pincode: '682016',
        mobileNumber: '9876543213',
        email: 'ayman@test.com',
        examCenterPref: 'Ernakulam'
      },
      paymentDetails: {
        amount: 800,
        paymentMode: 'UPI',
        paymentStatus: 'Paid',
        transactionId: 'TXN810004'
      }
    }
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
    role: 'candidate',
    application: {
      courseSelections: ['Engineering'],
      status: 'Submitted',
      currentStep: 4,
      remarks: 'Application under verification by scrutiny committee.',
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
        rollNumber: '8102455',
        totalMarks: '492',
        percentage: '98.4',
        schoolName: 'TKM College HSS Kollam'
      },
      communicationDetails: {
        permanentAddress: 'Musthafa House, Kottiyam',
        district: 'Kollam',
        state: 'Kerala',
        pincode: '691571',
        mobileNumber: '9876543214',
        email: 'rasal@test.com',
        examCenterPref: 'Kollam'
      },
      paymentDetails: {
        amount: 800,
        paymentMode: 'UPI',
        paymentStatus: 'Paid',
        transactionId: 'TXN810005'
      }
    }
  }
];

const sampleAnnouncements = [
  {
    title: 'KEAM 2026 Engineering Admissions Portal Now Active',
    message: 'Candidates can complete registration, upload certificates, and choose exam centers.',
    link: '#',
    category: 'Admission',
    isTicker: true,
    isNotice: true
  },
  {
    title: 'Document Defect Rectification Facility Available',
    message: 'Candidates with defective status can re-upload certificates until the specified deadline.',
    link: '#',
    category: 'Examination',
    isTicker: true,
    isNotice: true
  },
  {
    title: 'Admit Card Download Schedule Announced',
    message: 'Admit cards for approved applicants will be released one week prior to the examination.',
    link: '#',
    category: 'Allotment',
    isTicker: true,
    isNotice: true
  }
];

async function seedParticipants() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('Error: MONGO_URI missing in backend/.env');
      process.exit(1);
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Remove only test candidate records, keep any admin accounts intact
    const candidateAppNos = participants.map((p) => p.applicationNumber);
    const candidateEmails = participants.map((p) => p.email);

    await Candidate.deleteMany({
      $or: [
        { applicationNumber: { $in: candidateAppNos } },
        { email: { $in: candidateEmails } }
      ]
    });

    await Application.deleteMany({
      applicationNumber: { $in: candidateAppNos }
    });

    // Hash shared password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password@123', salt);

    console.log('\nInserting participant candidates and applications...');

    for (const p of participants) {
      const candidate = await Candidate.create({
        applicationNumber: p.applicationNumber,
        fullName: p.fullName,
        dob: p.dob,
        email: p.email,
        mobileNumber: p.mobileNumber,
        gender: p.gender,
        category: p.category,
        password: hashedPassword,
        role: 'candidate'
      });

      await Application.create({
        candidateId: candidate._id,
        applicationNumber: p.applicationNumber,
        ...p.application
      });

      console.log(`- Created Candidate: ${p.fullName} (App No: ${p.applicationNumber}, Status: ${p.application.status})`);
    }

    // Seed sample announcements if notice board is currently empty
    const currentNotices = await Notification.countDocuments();
    if (currentNotices === 0) {
      console.log('\nSeeding live announcements and ticker updates...');
      for (const notice of sampleAnnouncements) {
        await Notification.create(notice);
      }
      console.log(`- Inserted ${sampleAnnouncements.length} sample announcements.`);
    }

    console.log('\n=========================================');
    console.log('Participant Data Seeded Successfully!');
    console.log('=========================================');
    console.log('Candidate credentials (all use Password: Password@123):');
    participants.forEach((p) => {
      console.log(`- ${p.fullName.padEnd(16)} | App No: ${p.applicationNumber} | Status: ${p.application.status}`);
    });
    console.log('=========================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding participants:', error);
    process.exit(1);
  }
}

seedParticipants();
