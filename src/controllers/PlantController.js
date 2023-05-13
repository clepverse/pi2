const { Types, isValidObjectId } = require('mongoose');

const { popularName, scientificName, howToCare } = require('../services/gtp');

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

    const scientificNameResult = await scientificName(namePlant);

    const plantExists = await Plant.findOne({
      scientificName,
    });

    if (!plantExists) {
      const popularNameResult = await popularName(namePlant);
      const careResult = await howToCare(namePlant);

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
        message: 'Planta cadastrada com sucesso!',
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
      message: 'Planta cadastrada com sucesso!',
      plantSave,
    });
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao cadastrar planta';
    return res.status(500).json({
      message,
    });
  }
};
