const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema({
  popularName: {
    type: String,
    required: true,
    trim: true,
  },
  scientificName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  care: {
    type: String,
    required: true,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = plantSchema;
