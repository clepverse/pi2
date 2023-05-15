const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const {
  index,
  save,
  delete: destroy,
} = require('../controllers/DiaryEntryController');

const diaryEntryRouter = express.Router();

diaryEntryRouter.get('/view/:plantId', allowAuthorization(false), index);
diaryEntryRouter.put('/save/:plantId', allowAuthorization(false), save);
diaryEntryRouter.delete('/delete/:plantId', allowAuthorization(false), destroy);

module.exports = diaryEntryRouter;
