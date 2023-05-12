const express = require('express');
const userRouter = require('./user.routes');
const plantRouter = require('./plant.routes');
const plantSaveRouter = require('./plantSave.routes');
const diaryEntryRouter = require('./diaryEntry.routes');

const routes = express.Router();

routes.use('/', userRouter);
routes.use('/', plantRouter);
routes.use('/', plantSaveRouter);
routes.use('/', diaryEntryRouter);

module.exports = routes;
