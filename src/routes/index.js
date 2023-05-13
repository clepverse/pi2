const express = require('express');
const userRouter = require('./user.routes');
const plantRouter = require('./plant.routes');
const plantSaveRouter = require('./plantSave.routes');
const diaryEntryRouter = require('./diaryEntry.routes');

const routes = express.Router();

routes.use('/api/user', userRouter);
routes.use('/api/plant/', plantRouter);
routes.use('/api/save/', plantSaveRouter);
routes.use('/api/save/', diaryEntryRouter);

module.exports = routes;
