const { Project, User, Department } = require('../models');
exports.getAllProject = async (req, res, next) => {
  try {
    const project = await Project.findAll({
      order: ['dueDate'],
      include: {
        model: User,
        attributes: {
          exclude: ['password'],
        },
        include: {
          model: Department,
        },
      },
    });
    res.status(200).json({ project });
  } catch (err) {
    next(err);
  }
};
exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      where: { id },
      include: {
        model: User,
        attributes: {
          exclude: ['password'],
        },
      },
    });
    res.status(200).json({ project });
  } catch (err) {
    next(err);
  }
};
exports.createProject = async (req, res, next) => {
  try {
    const {
      projectName,
      location,
      scopeFeild,
      dueDate,
      projectType,
      projectHeadId,
    } = req.body;
    await Project.create({
      projectName,
      location,
      scopeFeild,
      dueDate,
      projectType,
      projectHeadId,
    });
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Project.destroy({ where: { id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
