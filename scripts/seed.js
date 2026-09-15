/**
 * FinBud Financial — Database Seed Script
 * Usage: node scripts/seed.js
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Read .env file manually (no dotenv dependency needed)
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(function(line) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) return;
      const key = trimmed.slice(0, eqIndex).trim();
      const val = trimmed.slice(eqIndex + 1).trim();
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    });
  } catch (e) {
    console.log('No .env file found, using defaults');
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finbud';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@finbudfinancial.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'FinBud@Admin2025';

async function dropCollection(db, name) {
  try {
    await db.collection(name).drop();
  } catch (e) {
    // Collection might not exist, ignore error
  }
}

function getInitials(name) {
  return name
    .split(' ')
    .map(function(p) { return p[0]; })
    .join('')
    .toUpperCase();
}

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB at:', MONGODB_URI);

  const db = mongoose.connection;

  // Clear old data
  const collections = ['admins', 'slideshows', 'staffs', 'banks', 'reviews', 'settings'];
  for (let i = 0; i < collections.length; i++) {
    await dropCollection(db, collections[i]);
  }
  console.log('Cleared old collections');

  // ── Admin ──────────────────────────────────────
  const hashedPw = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.collection('admins').insertOne({
    email: ADMIN_EMAIL,
    password: hashedPw,
    name: 'FinBud Admin',
    role: 'superadmin',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log('Admin created:', ADMIN_EMAIL);

  // ── Slideshow ──────────────────────────────────
  await db.collection('slideshows').insertMany([
    {
      title: 'Smart Financial Solutions',
      subtitle: 'Personal · Home · Business Loans',
      imageUrl: '',
      gradient: 'linear-gradient(135deg,#1B4FD8,#00B4D8)',
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Your Goals, Our Mission',
      subtitle: 'End-to-end loan advisory services',
      imageUrl: '',
      gradient: 'linear-gradient(135deg,#0A1628,#1B4FD8)',
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Expert Financial Guidance',
      subtitle: 'Backed by Finance Buddha trusted network',
      imageUrl: '',
      gradient: 'linear-gradient(135deg,#003366,#00B4D8)',
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '50+ Bank Partnerships',
      subtitle: 'Best rates. Fastest approvals.',
      imageUrl: '',
      gradient: 'linear-gradient(135deg,#1a2a4a,#F4A524)',
      order: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Trusted by 10,000+ Clients',
      subtitle: 'Building financial futures across India',
      imageUrl: '',
      gradient: 'linear-gradient(135deg,#0e2444,#00B4D8)',
      order: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log('Slideshow seeded (5 slides)');

  // ── Staff ──────────────────────────────────────
  await db.collection('staffs').insertMany([
    {
      name: 'Nilamber Dutta',
      role: 'Business Head',
      department: '',
      type: 'leader',
      photoUrl: "/team/business-head.jpg",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name:   'Anjali Bisht',
      role: 'Human Resources',
      department: 'HR Manager',
      type: 'hr',
      photoUrl: "/team/hr.jpg",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Akash Deep Kohli',
      role: 'Branch Manager',
      department: 'Operations Head',
      type: 'manager',
      photoUrl: "/team/manager.jpg",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Mansi Dwivedi',
      role: 'Manager',
      department: '',
      type: 'leader',
      photoUrl: "/team/tl1.jpg",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Prashant Saini',
      role: 'Manager',
      department: '',
      type: 'leader',
      photoUrl: "/team/tl2.jpg",
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Neha Kohli ',
      role: 'Manager',
      department: '',
      type: 'leader',
      photoUrl: "/team/tl3.jpg",
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sandarbh Goswami',
      role: 'Manager',
      department: '',
      type: 'leader',
      photoUrl: "/team/tl4.jpg",
      order: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bhawna Puri',
      role: 'Manager',
      department: '',
      type: 'leader',
      photoUrl: "/team/tl5.jpg",
      order: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '',
      role: 'Team Leader',
      department: '',
      type: 'leader',
      photoUrl: '',
      order: 6,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log('Staff seeded (1 Business Head,1 HR, 1 Manager, 6 Leaders)');

  // ── Banks ──────────────────────────────────────
  const bankNames = [
    'SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'PNB',
    'Bank of Baroda', 'Canara Bank', 'IndusInd', 'Yes Bank', 'Bajaj Finserv', 'IDFC First',
  ];
  const bankDocs = bankNames.map(function(name, i) {
    return {
      name: name,
      logoUrl: '',
      website: '',
      order: i + 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await db.collection('banks').insertMany(bankDocs);
  console.log('Banks seeded (12 banks)');

  // ── Reviews ────────────────────────────────────
  const reviewData = [
    {
      reviewerName: 'Amit Kumar',
      city: 'Delhi',
      rating: 5,
      text: 'FinBud Financial helped me get my home loan approved in under 7 days! The team was incredibly professional and transparent about every step.',
    },
    {
      reviewerName: 'Sunita Rathi',
      city: 'Mumbai',
      rating: 5,
      text: 'I needed a business loan urgently and FinBud Financial connected me with the right bank partner. The interest rate was the best I found.',
    },
    {
      reviewerName: 'Vijay Patil',
      city: 'Pune',
      rating: 4,
      text: 'Very knowledgeable team. They explained every loan option in detail and helped me choose the one that best suited my financial situation.',
    },
    {
      reviewerName: 'Neha Desai',
      city: 'Bangalore',
      rating: 5,
      text: 'As a first-time borrower I was nervous, but the FinBud Financial team guided me through the entire process with patience and expertise.',
    },
    {
      reviewerName: 'Rohit Gupta',
      city: 'Hyderabad',
      rating: 5,
      text: 'Excellent service from start to finish. FinBud network of bank partners meant I got multiple offers to compare. Saved me lakhs in interest!',
    },
    {
      reviewerName: 'Meera Sinha',
      city: 'Chennai',
      rating: 5,
      text: 'Being part of the Finance Buddha family, FinBud Financial carries immense credibility. Their digital process made applying incredibly convenient.',
    },
  ];

  const reviewDocs = reviewData.map(function(r, i) {
    return {
      reviewerName: r.reviewerName,
      city: r.city,
      rating: r.rating,
      text: r.text,
      initials: getInitials(r.reviewerName),
      order: i + 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await db.collection('reviews').insertMany(reviewDocs);
  console.log('Reviews seeded (6 reviews)');

  // ── Settings ───────────────────────────────────
  await db.collection('settings').insertOne({
    about: {
      heading: 'A Trusted Name in Financial Services',
      body: 'FinBud Financial is a dedicated sub-initiative of Finance Buddha — one of India most trusted loan advisory platforms. We bring the same commitment to transparency and client-first values to every interaction.',
      mission: 'To make financial products accessible, understandable, and actionable for every Indian.',
      vision: 'To become India most client-centric loan advisory brand, trusted by millions.',
      images: [],
    },
    contact: {
      address: ' D-47, 1st Floor, Sector 7, Noida - 201301.',
      phone: '+91 9540303660',
      email: 'info@finbudfinancial.com',
      mapEmbed: '',
    },
    social: {
      instagram: '@finbud_financial',
      facebook: '',
      whatsapp: '+91 9540303660',
      linkedin: '#',
    },
    hero: {
      tagline: 'Your Trusted Financial Partner',
      subtitle: 'A proud initiative of Finance Buddha',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log('Settings seeded');

  console.log('\n========================================');
  console.log('  SEED COMPLETE');
  console.log('========================================');
  console.log('  Admin Email:    ' + ADMIN_EMAIL);
  console.log('  Admin Password: ' + ADMIN_PASSWORD);
  console.log('  Now run: npm run dev');
  console.log('========================================\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(function(err) {
  console.error('Seed failed:', err.message);
  process.exit(1);
});