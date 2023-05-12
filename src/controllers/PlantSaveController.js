const { Types, isValidObjectId } = require('mongoose');

const PlantSave = require('../models/PlantSave');

exports.index = async (req, res) => {
  const { userId } = req;
  try {
    const plants = await PlantSave.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'plants',
          localField: 'plantId',
          foreignField: '_id',
          as: 'plants',
        },
      },
      {
        $unwind: '$plants',
      },
      {
        $lookup: {
          from: 'diaryentries',
          localField: 'diaryEntriesId',
          foreignField: '_id',
          as: 'diaryEntries',
        },
      },
      // {
      //   $unwind: {
      //     path: '$diaryEntries',
      //   },
      // },
      {
        $project: {
          _id: 1,
          popularName: '$plants.popularName',
          scientificName: '$plants.scientificName',
          nickName: '$nickName',
          dateOfPurchase: '$dateOfPurchase',
          care: '$plants.care',
          diaryEntries: '$diaryEntries',
        },
      },
    ]);

    console.log({ plants });
    return res.json(plants);
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : 'Erro ao indexar planta',
    });
  }
};
