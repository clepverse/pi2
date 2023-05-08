const express = require('express');
const userRouter = require('./user.routes');
const plantRouter = require('./plant.routes');

const routes = express.Router();

routes.use('/', userRouter);
routes.use('/', plantRouter);

module.exports = routes;
