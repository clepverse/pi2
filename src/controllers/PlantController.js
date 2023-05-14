const { isValidObjectId } = require('mongoose');

const Queue = require('../lib/Queue');

const Plant = require('../models/Plant');
const PlantSave = require('../models/PlantSave');

exports.index = async (req, res) => {
  try {
    const plants = await Plant.find({});

    return res.json(plants);
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao indexar plantas';

    return res.status(500).json({
      message,
    });
  }
};

exports.create = async (req, res) => {
  const { userId } = req;
  const { namePlant, nickName, dateOfPurchase } = req.body;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        message: 'Id do usuário inválido',
      });
    }

    if (!namePlant || typeof namePlant !== 'string') {
      return res.status(400).json({
        message: 'Nome da planta inválido',
      });
    }

    const scientificNameResult = await Queue.add('SearchScientificName', {
      namePlant,
    }).then((job) => job.finished().then((result) => result));

    const plant = await Plant.findOne({
      scientificName: scientificNameResult,
    });

    if (!plant) {
      const popularNameResult = await Queue.add('SearchPopularName', {
        namePlant,
      }).then((job) => job.finished().then((result) => result));

      const careResult = await Queue.add('SearchHowToCare', {
        namePlant,
      }).then((job) => job.finished().then((result) => result));

      const newPlant = new Plant({
        popularName: popularNameResult,
        scientificName: scientificNameResult,
        care: careResult,
      });

      await newPlant.save();

      const plantSave = await PlantSave.create({
        nickName,
        dateOfPurchase,
        userId,
        plantId: newPlant._id,
      });

      return res.status(201).json({
        message: 'Planta cadastrada com sucesso!',
        plantSave,
        plant: newPlant,
      });
    }

    const plantSave = await PlantSave.create({
      nickName,
      dateOfPurchase,
      userId,
      plantId: plant._id,
    });

    return res.status(201).json({
      message: 'Planta cadastrada com sucesso!',
      plantSave,
      plant,
    });
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao criar planta';

    return res.status(500).json({
      message,
    });
  }
};
