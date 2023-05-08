const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: 'Users retrieved successfully',
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    const token = user.generateToken(user._id);

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
