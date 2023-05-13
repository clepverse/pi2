const mongoose = require('mongoose');

const PlantSaveSchema = require('../schemas/PlantSaveSchema');

PlantSaveSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });

  next();
});

PlantSaveSchema.post('save', function ({ name, code }, _, next) {
  if (name === 'MongoServerError' && code === 11000) {
    next(new Error('Planta já cadastrada'));
  }

  next();
});

const PlantSave = mongoose.model('PlantSave', PlantSaveSchema, 'plantsaves');

module.exports = PlantSave;
