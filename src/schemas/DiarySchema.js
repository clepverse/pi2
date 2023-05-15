const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiaryEntrySchema = new Schema({
  plantSaveId: {
    type: Schema.Types.ObjectId,
    ref: 'PlantSave',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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

module.exports = DiaryEntrySchema;
