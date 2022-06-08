const jwt = require('jsonwebtoken');
const createError = require('../service/errorServices');
const { User } = require('../models');
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      createError('You are unauthorized', 401);
    }
    const [, token] = authorization.split(' ');
    if (!token) {
      createError('You are unauthorized', 401);
    }
    const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      where: { id: decodedPayload.id },
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      createError('User not found', 400);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
