const validator = require('validator');
const createError = require('./errorServices');
module.exports = (signupForm, pic) => {
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
  } else if (validator.isEmpty(confirmPassword + '')) {
    createError('Comfirm Password is require', statusCode);
  } else if (password !== confirmPassword) {
    createError('Password is not match', statusCode);
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
  // if (!pic) {
  //   createError('Profile Picture is required', statusCode);
  // }
};
