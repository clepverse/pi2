const mongoose = require('mongoose');

const DiaryEntrySchema = require('./DiarySchema');

const { Schema } = mongoose;

const PlantSaveSchema = new Schema({
  nickName: {
    type: String,
  },
  dateOfPurchase: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  plantId: {
    type: Schema.Types.ObjectId,
    ref: 'Plant',
    unique: true,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  diaryEntriesId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DiaryEntry',
    },
  ],
});

module.exports = PlantSaveSchema;
