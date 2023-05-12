const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = require('../schemas/UserSchema');

UserSchema.pre('findOneAndUpdate', function (next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.post('save', function ({ name, code }, _, next) {
  if (name === 'MongoServerError' && code === 11000) {
    next(new Error('Usuário já cadastrado'));
  }

  next();
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();
  try {
    const hash = await bcrypt.hash(this.password_hash, 10);
    this.password_hash = hash;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.compareHash = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password_hash || '');
    return match;
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.methods.generateToken = function ({ setExpiresIn }) {
  const { id } = this;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: setExpiresIn ? setExpiresIn : '1d',
  });
  return token;
};

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
