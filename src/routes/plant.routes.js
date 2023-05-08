const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { index, create } = require('../controllers/PlantController');

const plantRouter = express.Router();

plantRouter.use(isAuthenticated);
plantRouter.get('/plant', index);
plantRouter.post('/plant', create);

module.exports = plantRouter;
