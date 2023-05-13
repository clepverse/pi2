const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const { index } = require('../controllers/PlantSaveController');

const plantSaveRouter = express.Router();

plantSaveRouter.get('/', allowAuthorization(false), index);

module.exports = plantSaveRouter;
