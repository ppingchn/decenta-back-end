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
      profilePic,
      departmentId,
    } = req.body;
    validateRegisterForm(req.body);
    const hashedPassword = bcrypt.hashSync(password, 10);
    // const photoUpload = await cloudinary.upload(profilePic);
    // const sendProfilePic = photoUpload.secure_url;
    await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      profilePic: null,
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
