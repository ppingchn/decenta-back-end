const validator = require('validator');
const createError = require('./errorServices');
module.exports = (signupForm) => {
  const {
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    department,
  } = signupForm;
  const statusCode = 400;
  if (validator.isEmpty(username + '')) {
    createError('Username is require', statusCode);
  }
  if (validator.isEmpty(password + '')) {
    createError('Password is require', statusCode);
  }
  if (validator.isEmpty(confirmPassword + '')) {
    createError('Comfirmpassword is require', statusCode);
  }
  if (validator.isEmpty(firstName + '')) {
    createError('Firstname is require', statusCode);
  }
  if (validator.isEmpty(lastName + '')) {
    createError('Lastname is require', statusCode);
  }
  if (validator.isEmpty(department + '')) {
    createError('Department is require', statusCode);
  }
};
