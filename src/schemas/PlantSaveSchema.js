const mongoose = require('mongoose');

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
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = PlantSaveSchema;
