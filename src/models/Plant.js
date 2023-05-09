const mongoose = require('mongoose');

const PlantSchema = require('../schemas/PlantSchema');

PlantSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  return next();
});

// PlantSchema.pre('save', async function (next) {
//   const plant = this;

//   const existingPlant = await Plant.findOne({
//     name: plant.name,
//     userId: plant.userId,
//   });

//   if (existingPlant) {
//     const error = new Error('Você já tem uma planta com este nome');
//     return next(error);
//   }

//   return next();
// });

const Plant = mongoose.model('Plant', PlantSchema, 'plants');

module.exports = Plant;
