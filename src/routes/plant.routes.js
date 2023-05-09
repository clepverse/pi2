const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { index, create } = require('../controllers/PlantController');

const plantRouter = express.Router();

plantRouter.get('/plant', isAuthenticated(false), index);
plantRouter.post('/plant', isAuthenticated(false), create);

module.exports = plantRouter;
