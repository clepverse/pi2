const mongoose = require('mongoose');

const { Schema } = mongoose;

const CalendarSchema = new Schema({
  plantSaveId: {
    type: Schema.Types.ObjectId,
    ref: 'PlantSave',
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  description: {
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

module.exports = CalendarSchema;
