const { Department, User } = require('../models');

exports.getDepartmentName = async (id) => {
  const name = Department.findOne({
    where: {
      id,
    },
  });
  return name;
};
