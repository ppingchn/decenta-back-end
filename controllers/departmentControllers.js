const { Department } = require('../models');
exports.findId = async (req, res, next) => {
  const { departmentName } = req.params;
  const department = await Department.findOne({ where: { departmentName } });
  res.status(200).json({ id: department.id });
};
