const express = require('express');
const allowAuthorization = require('../middlewares/allowAuthorization');
const { index, create, login, me } = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.post('/signup', create);
userRouter.post('/login', login);
userRouter.get('/me', allowAuthorization(false), me);

module.exports = userRouter;
