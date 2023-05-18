const express = require('express');
const userRouter = require('./user.routes');
const plantRouter = require('./plant.routes');
const plantSaveRouter = require('./plantSave.routes');
const diaryEntryRouter = require('./diaryEntry.routes');

const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/plant/', plantRouter);
routes.use('/save/', plantSaveRouter);
routes.use('/diary/', diaryEntryRouter);

module.exports = routes;
