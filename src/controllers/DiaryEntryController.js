const { Types, isValidObjectId } = require('mongoose');

const PlantSave = require('../models/PlantSave');
const DiaryEntry = require('../models/DiaryEntry');

exports.index = async (req, res) => {
  const { plantId } = req.params;

  try {
    const plant = await PlantSave.findById(plantId).populate('diaryentries');

    res.status(200).json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar entradas de diário.' });
  }
};

exports.create = async (req, res) => {
  const { plantId, day, month, year, description } = req.body;

  try {
    const diaryEntry = new DiaryEntry({
      day,
      month,
      year,
      description,
    });

    const savedDiaryEntry = await diaryEntry.save();

    const updatedPlant = await PlantSave.findOneAndUpdate(
      { _id: plantId },
      { $push: { diaryEntriesId: savedDiaryEntry._id } },
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

exports.updateById = async (req, res) => {
  const { diaryEntryId, description } = req.body;

  try {
    const diaryEntry = await DiaryEntry.findByIdAndUpdate(
      diaryEntryId,
      {
        description,
      },
      { new: true },
    );

    res.status(200).json(diaryEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar entrada de diário.' });
  }
};
