const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = require('../schemas/UserSchema');

UserSchema.pre(['save', 'findOneAndUpdate'], function (next) {
  this.updatedAt = Date.now();
  return next();
});

UserSchema.post('save', function (error, doc, next) {
  if (error && error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Usuário já cadastrado'));
  } else {
    next();
  }
});

UserSchema.methods.compareHash = function (password) {
  return bcrypt.compare(password, this.password_hash || '');
};

UserSchema.methods.generateToken = function () {
  const { id } = this;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
