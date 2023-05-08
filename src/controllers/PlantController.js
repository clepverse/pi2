const User = require('../models/User');
const Plant = require('../models/Plant');

const mongoose = require('mongoose');

exports.index = async (req, res) => {
  const { userId } = req;
  const plants = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'plants',
        localField: 'plants',
        foreignField: '_id',
        as: 'plants',
      },
    },
    { $unwind: '$plants' },
  ]);
  return res.json(plants);
};

exports.create = async (req, res) => {
  const { userId } = req;
  console.log({ userId });

  const { name, popularName, scientificName, care } = req.body;

  try {
    const plant = await Plant.create({
      name,
      popularName,
      scientificName,
      care,
      userId,
    });

    return res.status(201).json(plant);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
