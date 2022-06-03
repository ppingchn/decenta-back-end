const util = require('util');
const cloudinary = require('cloudinary').v2;
exports.upload = util.promisify(cloudinary.uploader.upload);
