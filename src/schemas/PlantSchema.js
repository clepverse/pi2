const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  popularName: {
    type: String,
  },
  scientificName: {
    type: String,
  },
  care: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
  updatedAt: {
    default: Date.now(),
    type: Date,
  },
});

module.exports = plantSchema;
