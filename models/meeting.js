module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define(
    'Meeting',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      meetingType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      meetingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscore: true,
    }
  );
  Meeting.associate = (models) => {
    Meeting.hasMany(models.Agenda, {
      foreignKey: {
        name: 'meetingId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Meeting.belongsTo(models.User, {
      foreignKey: {
        name: 'secretaryId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Meeting;
};
