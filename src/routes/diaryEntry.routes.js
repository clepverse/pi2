const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const { index, create, updateById } = require('../controllers/DiaryEntryController');

const diaryEntryRouter = express.Router();

diaryEntryRouter.get('/diary/:id', allowAuthorization(false), index);
diaryEntryRouter.post('/diary', allowAuthorization(false), create);
// diaryEntryRouter.put('/diary', allowAuthorization(false), updateById);

module.exports = diaryEntryRouter;
