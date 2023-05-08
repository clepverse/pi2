const express = require('express');
const { index, create } = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.get(index);
userRouter.post('/user', create);

module.exports = userRouter;
