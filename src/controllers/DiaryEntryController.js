const { Types, isValidObjectId } = require('mongoose');

const PlantSave = require('../models/PlantSave');
const DiaryEntry = require('../models/DiaryEntry');

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

// exports.create = async (req, res) => {
//   const { plantId, day, month, year, description } = req.body;

//   try {
//     if (!isValidObjectId(plantId)) {
//       return res.status(400).json({ message: 'ID de planta inválido.' });
//     }

//     const diaryEntry = new DiaryEntry({
//       day,
//       month,
//       year,
//       description,
//     });

//     const savedDiaryEntry = await diaryEntry.save();

//     const updatedPlant = await PlantSave.findOneAndUpdate(
//       { _id: plantId },
//       { $push: { diaryEntriesId: savedDiaryEntry._id } },
//       { new: true },
//     );

//     res.json(updatedPlant);
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: err ? err.message : 'Erro ao criar entrada de diário.',
//     });
//   }
// };

// exports.edit = async (req, res) => {
//   const { plantId, diaryEntryId } = req.params;
//   const { day, month, year, description } = req.body;

//   try {
//     if (!isValidObjectId(plantId)) {
//       return res.status(400).json({ message: 'ID de planta inválido.' });
//     }

//     if (!isValidObjectId(diaryEntryId)) {
//       return res.status(400).json({ message: 'ID de entrada de diário inválido.' });
//     }

//     const updatedDiaryEntry = await DiaryEntry.findOneAndUpdate(
//       { _id: diaryEntryId },
//       { day, month, year, description },
//       { new: true },
//     );

//     res.json(updatedDiaryEntry);
//   } catch (err) {
//     const message = err.message ? err.message : 'Erro ao editar entrada de diário.';

//     res.status(500).json({
//       message,
//     });
//   }
// };
