const mongoose = require('mongoose');

const PlantSchema = require('../schemas/PlantSchema');

PlantSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  return next();
});

PlantSchema.post('save', function ({ name, code }, _, next) {
  if (name === 'MongoServerError' && code === 11000) {
    next(new Error('Planta já cadastrada'));
  } else {
    next();
  }
});

PlantSchema.pre('save', async function (next) {
  const plant = this;

  const existingPlant = await Plant.findOne({
    name: plant.name,
  });

  if (existingPlant) {
    const error = new Error('Já existe uma planta com este nome');
    return next(error);
  }

  return next();
});

const Plant = mongoose.model('Plant', PlantSchema, 'plants');

module.exports = Plant;
