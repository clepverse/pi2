const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const { index } = require('../controllers/PlantSaveController');

const plantSaveRouter = express.Router();

plantSaveRouter.get('/plantsave', allowAuthorization(false), index);
// plantSaveRouter.post('/plant', allowAuthorization(false), create);

module.exports = plantSaveRouter;
