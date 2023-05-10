const express = require('express');
const allowAuthorization = require('../middleware/allowAuthorization');
const { index, create } = require('../controllers/PlantController');

const plantRouter = express.Router();

plantRouter.get('/plant', allowAuthorization(false), index);
plantRouter.post('/plant', allowAuthorization(false), create);

module.exports = plantRouter;
