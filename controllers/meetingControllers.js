const { Meeting, User, Agenda, sequelize } = require('../models');
exports.getAllMeeting = async (req, res, next) => {
  try {
    const meeting = await Meeting.findAll({ order: ['meetingDate'] });
    res.status(200).json({ meeting });
  } catch (err) {
    next(err);
  }
};
exports.getMeetingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findOne({
      where: { id },
      include: {
        model: User,
        attributes: {
          exclude: ['password'],
        },
      },
    });
    const agenda = await Agenda.findAll({
      where: { meetingId: meeting.id },
      attributes: { exclude: ['id', 'description', 'createdAt', 'updatedAt'] },
    });
    res.status(200).json({ meeting, agenda });
  } catch (err) {
    next(err);
  }
};
exports.createMeeting = async (req, res, next) => {
  try {
    const { title, meetingDate, secretaryId, meetingType, agenda } = req.body;
    const newMeeting = await Meeting.create({
      title,
      meetingDate,
      secretaryId,
      meetingType,
    });
    await agenda.map(async (el) => {
      await Agenda.create({ title: el, meetingId: newMeeting.id });
    });
    res.status(200).json({ message: 'create Completed' });
  } catch (err) {
    next(err);
  }
};
exports.getSecretary = async (req, res, next) => {
  try {
    const sercretary = await User.findAll({ where: { departmentId: 1 } });
    res.json({ sercretary });
  } catch (err) {
    next(err);
  }
};
exports.deleteMeeting = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    await Agenda.destroy({ where: { meetingId: id } }, { transaction: t });
    await Meeting.destroy({ where: { id } }, { transaction: t });
    await t.commit();
    res.status(204).json();
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
