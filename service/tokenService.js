const jwt = require('jsonwebtoken');
module.exports = (payload) => {
  console.log('gen start');
  console.log(payload);
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};
