const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const { index, create } = require('../controllers/PlantController');

const plantRouter = express.Router();

plantRouter.get('/', allowAuthorization(false), index);
plantRouter.post('/create', allowAuthorization(false), create);

module.exports = plantRouter;
