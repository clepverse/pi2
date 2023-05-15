const { isValidObjectId } = require('mongoose');

const yup = require('yup');

const PlantSave = require('../models/PlantSave');
const DiaryEntry = require('../models/DiaryEntry');

const createDiaryEntryValidator = require('../Validations/DiaryEntry/createDiaryEntryValidator');

exports.index = async (req, res) => {
  const { plantId } = req.params;

  try {
    if (!isValidObjectId(plantId)) {
      return res.status(400).json({ message: 'ID de planta inválido.' });
    }

    const plant = await PlantSave.findById(plantId).populate('diaryentries');

    res.status(200).json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar entradas de diário.' });
  }
};

exports.save = async (req, res) => {
  const { plantId } = req.params;
  const data = req.body;

  try {
    if (!isValidObjectId(plantId)) {
      return res.status(400).json({ message: 'ID de planta inválido.' });
    }

    const diaryEntrySchema = yup.object().shape(createDiaryEntryValidator);

    const diaryEntryValidated = await diaryEntrySchema.validate(data);

    const diaryEntryId = await DiaryEntry.upsertOne(
      plantId,
      diaryEntryValidated,
    ).then((entryId) => {
      return entryId;
    });

    const updatedPlant = await PlantSave.findOneAndUpdate(
      { _id: plantId },
      { $addToSet: { diaryEntriesId: diaryEntryId } },
      { new: true },
    );

    res.json(updatedPlant);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err ? err.message : 'Erro ao criar entrada de diário.',
    });
  }
};

exports.delete = async (req, res) => {
  const { plantId } = req.params;
  const { diaryEntryId } = req.body;

  try {
    if (!isValidObjectId(plantId)) {
      return res.status(400).json({ message: 'ID de planta inválido.' });
    }

    if (!isValidObjectId(diaryEntryId)) {
      return res
        .status(400)
        .json({ message: 'ID de entrada de diário inválido.' });
    }

    const deletedDiaryEntry = await DiaryEntry.findOneAndDelete({
      _id: diaryEntryId,
    });

    if (!deletedDiaryEntry) {
      return res
        .status(400)
        .json({ message: 'Entrada de diário não encontrada.' });
    }

    const updatedPlant = await PlantSave.findOneAndUpdate(
      { _id: plantId },
      { $pull: { diaryEntriesId: diaryEntryId } },
      { new: true },
    );

    res.json(updatedPlant);
  } catch (err) {
    const message = err ? err.message : 'Erro ao deletar entrada de diário.';

    res.status(500).json({
      message,
    });
  }
};
