const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = userSchema;
