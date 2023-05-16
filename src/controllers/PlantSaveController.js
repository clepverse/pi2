const { Types, isValidObjectId } = require('mongoose');

const yup = require('yup');

const PlantSave = require('../models/PlantSave');
const DiaryEntry = require('../models/DiaryEntry');

const editPlantSaveValidator = require('../validators/PlantSave/editPlantSaveValidator');
// const createDiaryEntryValidator = require('../validators/DiaryEntry/createDiaryEntryValidator');

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
        $unwind: {
          path: '$plants',
          preserveNullAndEmptyArrays: false,
        },
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
        $unwind: {
          path: '$diaryEntries',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'diaryEntries.date': 1,
        },
      },
      {
        $addFields: {
          'diaryEntries.dateString': {
            $dateToString: {
              date: '$diaryEntries.date',
              format: '%Y-%m-%d',
            },
          },
        },
      },
      {
        $sort: {
          'diaryEntries.dateString': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          popularName: { $first: '$plants.popularName' },
          scientificName: { $first: '$plants.scientificName' },
          nickName: { $first: '$nickName' },
          dateOfPurchase: { $first: '$dateOfPurchase' },
          care: { $first: '$plants.care' },
          diaryEntries: { $push: '$diaryEntries' },
        },
      },
      {
        $project: {
          _id: 1,
          popularName: 1,
          scientificName: 1,
          nickName: 1,
          dateOfPurchase: {
            $dateToString: {
              date: '$dateOfPurchase',
              format: '%Y-%m-%d',
            },
          },
          care: 1,
          diaryEntries: {
            $map: {
              input: '$diaryEntries',
              in: {
                _id: '$$this._id',
                title: '$$this.title',
                dateString: {
                  $cond: {
                    if: { $ne: ['$$this.dateString', null] },
                    then: '$$this.dateString',
                    else: '$$REMOVE',
                  },
                },
              },
            },
          },
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
  const { plantId } = req.params;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    if (!isValidObjectId(plantId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const plant = await PlantSave.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          _id: new Types.ObjectId(plantId),
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
        $unwind: {
          path: '$plants',
          preserveNullAndEmptyArrays: false,
        },
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
        $unwind: {
          path: '$diaryEntries',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'diaryEntries.date': 1,
        },
      },
      {
        $addFields: {
          'diaryEntries.dateString': {
            $dateToString: {
              date: '$diaryEntries.date',
              format: '%Y-%m-%d',
            },
          },
        },
      },
      {
        $sort: {
          'diaryEntries.dateString': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          popularName: { $first: '$plants.popularName' },
          scientificName: { $first: '$plants.scientificName' },
          nickName: { $first: '$nickName' },
          dateOfPurchase: { $first: '$dateOfPurchase' },
          care: { $first: '$plants.care' },
          diaryEntries: { $push: '$diaryEntries' },
        },
      },
      {
        $project: {
          _id: 1,
          popularName: 1,
          scientificName: 1,
          nickName: 1,
          dateOfPurchase: {
            $dateToString: {
              date: '$dateOfPurchase',
              format: '%Y-%m-%d',
            },
          },
          care: 1,
          diaryEntries: {
            $map: {
              input: '$diaryEntries',
              in: {
                _id: '$$this._id',
                title: '$$this.title',
                dateString: {
                  $cond: {
                    if: { $ne: ['$$this.dateString', null] },
                    then: '$$this.dateString',
                    else: '$$REMOVE',
                  },
                },
              },
            },
          },
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
  const { plantId } = req.params;
  const data = req.body;
  // const {diaryEntries } = req.body;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    if (!isValidObjectId(plantId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const dataSaveSchema = yup.object().shape(editPlantSaveValidator);

    const plantSaveValidated = await dataSaveSchema.validate(data);

    const plantSave = await PlantSave.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        _id: new Types.ObjectId(plantId),
      },
      {
        $set: {
          nickName: plantSaveValidated.nickName,
          dateOfPurchase: plantSaveValidated.dateOfPurchase,
        },
      },
      { new: true },
    );

    if (!plantSave) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }

    return res.status(200).json(plantSave);

    // let diaryEntriesId = [];

    // if (diaryEntries && diaryEntries.length > 0) {
    //   const diaryDataSchema = yup
    //     .array()
    //     .of(yup.object().shape(createDiaryEntryValidator));

    //   const diaryEntriesValidated = await diaryDataSchema.validate(
    //     diaryEntries,
    //   );

    //   diaryEntriesId = await DiaryEntry.upsertMany(
    //     id,
    //     diaryEntriesValidated,
    //   ).then((entriesIds) => {
    //     return entriesIds;
    //   });
    // }

    // const plant = await PlantSave.findById(id);

    // if (!plant) {
    //   return res.status(404).json({ message: 'Planta não encontrada' });
    // }

    // const existingDiaryEntries = plant.diaryEntriesId.filter((entry) => {
    //   return diaryEntries?.some(
    //     (diaryEntry) => diaryEntry._id === entry._id.toString(),
    //   );
    // });

    // const unusedDiaryEntriesIds = plant.diaryEntriesId
    //   .filter((entry) => !existingDiaryEntries.includes(entry))
    //   .map((entry) => entry._id);

    // const dataSaveSchema = yup.object().shape(editPlantSaveValidator);

    // const plantSaveValidated = await dataSaveSchema.validate(plantSaveData);

    // const plantSaveUpdate = {
    //   nickName: plantSaveValidated.nickName,
    //   dateOfPurchase: plantSaveValidated.dateOfPurchase,
    //   diaryEntriesId: diaryEntriesId,
    // };

    // if (unusedDiaryEntriesIds.length > 0) {
    //   plantSaveUpdate.$pull = {
    //     diaryEntriesId: { $in: unusedDiaryEntriesIds },
    //   };
    //   plantSaveUpdate.$pull.diaryEntries = {
    //     _id: { $in: unusedDiaryEntriesIds },
    //   };
    // }

    // const updatedPlant = await PlantSave.findOneAndUpdate(
    //   { _id: id },
    //   { $set: plantSaveUpdate },
    //   { new: true },
    // );

    // return res.status(200).json(updatedPlant);

    // let plantSave;

    // if (diaryEntriesId !== null && diaryEntriesId !== undefined) {
    //   plantSave = await PlantSave.findOneAndUpdate(
    //     {
    //       userId: new Types.ObjectId(userId),
    //       _id: new Types.ObjectId(id),
    //     },
    //     {
    //       $set: {
    //         nickName: plantSaveData.nickName,
    //         dateOfPurchase: plantSaveData.dateOfPurchase,
    //       },
    //       $addToSet: { diaryEntriesId: { $each: diaryEntriesId } },
    //     },
    //     { new: true },
    //   );
    // } else {
    //   plantSave = await PlantSave.findOneAndUpdate(
    //     {
    //       userId: new Types.ObjectId(userId),
    //       _id: new Types.ObjectId(id),
    //     },
    //     {
    //       $set: {
    //         nickName: plantSaveData.nickName,
    //         dateOfPurchase: plantSaveData.dateOfPurchase,
    //       },
    //     },
    //     { new: true },
    //   );
    // }

    // return res.status(200).json({ plantSave });
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao editar planta';
    return res.status(500).json({
      message,
    });
  }
};

exports.delete = async (req, res) => {
  const { userId } = req;
  const { plantId } = req.params;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    if (!isValidObjectId(plantId)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const plantSave = await PlantSave.findOne({
      userId: new Types.ObjectId(userId),
      _id: new Types.ObjectId(plantId),
    });
    const diaryEntriesIds = plantSave.diaryEntriesId;

    await DiaryEntry.deleteMany({
      _id: { $in: diaryEntriesIds },
    });

    await PlantSave.findOneAndDelete({
      userId: new Types.ObjectId(userId),
      _id: new Types.ObjectId(plantId),
    });

    return res.status(200).json({ message: 'Planta deletada com sucesso' });
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao deletar planta';
    return res.status(500).json({
      message,
    });
  }
};
