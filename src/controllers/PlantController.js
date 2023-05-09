const { Types, isValidObjectId } = require('mongoose');

const { popularName, scientificName, howToCare } = require('../services/gtp');

const User = require('../models/User');
const Plant = require('../models/Plant');
const PlantSave = require('../models/PlantSave');

exports.index = async (req, res) => {
  // const { userId } = req;

  try {
    const plants = await Plant.find({});
    // const plants = await Plant.aggregate([
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'user',
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$user',
    //       preserveNullAndEmptyArrays: false,
    //     },
    //   },
    //   {
    //     $match: {
    //       'user._id': new Types.ObjectId(userId),
    //     },
    //   },
    // ]);
    return res.json(plants);
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : 'Erro ao indexar planta',
    });
  }
};

exports.create = async (req, res) => {
  const { userId } = req;

  const { namePlant, nickName, dateOfPurchase } = req.body;

  //chat gpt
  const popularNameResult = await popularName(namePlant);
  const scientificNameResult = await scientificName(namePlant);
  const careResult = await howToCare(namePlant);

  try {
    const plantExists = await Plant.findOne({ scientificName });

    if (!plantExists) {
      const plant = await Plant.create({
        popularName: popularNameResult,
        scientificName: scientificNameResult,
        care: careResult,
      });

      const plantSave = await PlantSave.create({
        nickName,
        dateOfPurchase,
        userId,
        plantId: plant._id,
      });

      return res.status(201).json({
        messsage: 'Planta cadastrada com sucesso!',
        plantSave,
        plant,
      });
    }
    const plantSave = await PlantSave.create({
      nickName,
      dateOfPurchase,
      userId,
      plantId: plantExists._id,
    });

    return res.status(201).json({
      messsage: 'Planta cadastrada com sucesso!',
      plantSave,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : 'Erro ao cadastrar planta',
    });
  }
};
