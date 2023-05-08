const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plant',
    },
  ],
  createdAt: {
    default: Date.now(),
    type: Date,
  },
  updatedAt: {
    default: Date.now(),
    type: Date,
  },
});

module.exports = userSchema;
