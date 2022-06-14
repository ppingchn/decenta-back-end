const { User, Department } = require('../models');
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: { model: Department },
    });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      include: { model: Department },
    });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
