const { Types, isValidObjectId } = require('mongoose');

const bcrypt = require('bcrypt');

const User = require('../models/User');
const PlantSave = require('../models/PlantSave');

exports.index = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: 'Todos usuários',
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 8);

    const user = await User.create({ name, email, password: password_hash });

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    const token = user.generateToken({ setExpiresIn: '1d' });

    user.password = undefined;

    return res.status(200).json({ user, token });
  } catch (err) {
    const message = err.message ? err.message : 'Usuário e senha inválidos';
    return res.status(500).json({ message });
  }
};

exports.me = async (req, res) => {
  const { userId } = req;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    const user = await User.findById(userId, {
      password: 0,
    });

    const plantSaves = await PlantSave.find(
      { userId: new Types.ObjectId(userId) },
      {},
    );

    return res.status(200).json({ user, plantSaves });
  } catch (error) {
    const message = error.message ? error.message : 'Erro ao buscar usuário';
    return res.status(500).json({ message });
  }
};

exports.edit = async (req, res) => {
  const { userId } = req;
  const { name, email, password } = req.body;

  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    return res.status(200).json({ user });
  } catch (err) {
    const message = err.message ? err.message : 'Erro ao editar usuário';
    return res.status(500).json({ message });
  }
};
