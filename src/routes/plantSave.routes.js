const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const {
  index,
  view,
  edit,
  delete: destroy,
} = require('../controllers/PlantSaveController');

const plantSaveRouter = express.Router();

plantSaveRouter.get('/', allowAuthorization(false), index);
plantSaveRouter.get('/view/:plantId', allowAuthorization(false), view);
plantSaveRouter.put('/edit/:plantId', allowAuthorization(false), edit);
plantSaveRouter.delete('/delete/:plantId', allowAuthorization(false), destroy);

module.exports = plantSaveRouter;
