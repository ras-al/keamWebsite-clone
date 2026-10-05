// backend/models/Admin.js
// KEAM Portal - Admin Account Model
// Author: Shan M A (B24CSA59)
// Defines the MongoDB schema for administrator accounts

const mongoose = require('mongoose');

// mongoose.Schema() = defines the structure of a document in MongoDB
// This schema stores admin login credentials and role info
const adminSchema = new mongoose.Schema(
  {
    // Admin username — must be unique
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true          // removes extra spaces: " admin1 " → "admin1"
    },

    // Admin email — must be unique
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true      // auto-converts "ADMIN@Gmail.com" → "admin@gmail.com"
    },

    // Password — stored as a bcrypt HASH (never plain text!)
    password: {
      type: String,
      required: [true, 'Password is required']
    },

    // Role — either 'admin' or 'superadmin'
    // enum means only these exact values are allowed
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin'
    }
  },
  {
    timestamps: true  // auto-adds createdAt and updatedAt fields
  }
);

// mongoose.model('Admin', schema) creates an "admins" collection in MongoDB
module.exports = mongoose.model('Admin', adminSchema);
