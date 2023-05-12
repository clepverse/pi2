const mongoose = require('mongoose');

const PlantSaveSchema = require('../schemas/PlantSaveSchema');

PlantSaveSchema.pre(['findOneAndUpdate'], function (next) {
  this.updatedAt = new Date();
  next();
});

const PlantSave = mongoose.model('PlantSave', PlantSaveSchema, 'plantsaves');

module.exports = PlantSave;
