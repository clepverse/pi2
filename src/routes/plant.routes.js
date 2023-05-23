const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const { getAll, create } = require('../controllers/PlantController');

const plantRouter = express.Router();

plantRouter.get('/', allowAuthorization(false), getAll);
plantRouter.post('/create', allowAuthorization(false), create);

module.exports = plantRouter;
