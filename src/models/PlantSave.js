const mongoose = require('mongoose');

const PlantSaveSchema = require('../schemas/PlantSaveSchema');

PlantSaveSchema.pre(['save', 'findOneAndUpdate'], function (next) {
  this.updatedAt = Date.now();
  return next();
});

const PlantSave = mongoose.model('PlantSave', PlantSaveSchema, 'plantsaves');

module.exports = PlantSave;
