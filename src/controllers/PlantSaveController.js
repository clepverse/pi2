const { Types, isValidObjectId } = require('mongoose');

const PlantSave = require('../models/PlantSave');
const DiaryEntry = require('../models/DiaryEntry');

exports.index = async (req, res) => {
  const { userId } = req;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

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

    return res.status(200).json(plants);
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : 'Erro ao indexar planta',
    });
  }
};

exports.view = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const plant = await PlantSave.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          _id: new Types.ObjectId(id),
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

    return res.status(200).json(plant);
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : 'Erro ao mostrar planta',
    });
  }
};

exports.edit = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { diaryEntries, ...plantSaveData } = req.body;

  console.log({ userId, id, plantSaveData });

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const diaryEntriesData = await DiaryEntry.upsertMany(diaryEntries).then(
      (updatedEntries) => {
        return updatedEntries;
      },
    );

    const plant = await PlantSave.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        _id: new Types.ObjectId(id),
      },
      {
        $set: {
          nickName: plantSaveData.nickName,
          dateOfPurchase: plantSaveData.dateOfPurchase,
        },
        $push: { diaryEntriesId: diaryEntriesData },
      },
      { new: true },
    );

    return res.status(200).json({ plant });
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao editar planta';
    return res.status(500).json({
      message,
    });
  }
};

exports.delete = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    await PlantSave.findOneAndDelete({
      userId: new Types.ObjectId(userId),
      _id: new Types.ObjectId(id),
    });

    return res.status(200).json({ message: 'Planta deletada com sucesso' });
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao deletar planta';
    return res.status(500).json({
      message,
    });
  }
};
