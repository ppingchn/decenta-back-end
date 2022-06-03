const jwt = require('jsonwebtoken');
const fs = require('fs');
const validator = require('validator');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const createError = require('../service/errorServices');
const genToken = require('../service/tokenService');
const validateRegisterForm = require('../service/validateFormServices');
const cloudinary = require('../config/cloudinary');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      createError('Invalid Username or password', 400);
    }
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      createError('Invalid username or Password', 400);
    }
    const token = genToken({ id: user.id });
    console.log(token);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.register = async (req, res, next) => {
  try {
    const {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber,
      departmentId,
    } = req.body;
    validateRegisterForm(req.body);
    if (!req.file) {
      createError('Profile Picture is required');
    }
    if (password !== confirmPassword) {
      createError('Password is not match', 400);
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const photoUpload = await cloudinary.upload(req.file.path);
    const sendProfilePic = photoUpload.secure_url;
    await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      profilePic: sendProfilePic,
      departmentId,
    });
    res.status(201).json();
  } catch (err) {
    console.log(err);
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
