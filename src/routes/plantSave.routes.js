const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const { index, view, edit } = require('../controllers/PlantSaveController');

const plantSaveRouter = express.Router();

plantSaveRouter.get('/', allowAuthorization(false), index);
plantSaveRouter.get('/view/:id', allowAuthorization(false), view);
plantSaveRouter.put('/edit/:id', allowAuthorization(false), edit);

module.exports = plantSaveRouter;
