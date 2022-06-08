module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define(
    'Agenda',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: DataTypes.STRING,
    },
    {
      underscore: true,
    }
  );
  Agenda.associate = (models) => {
    Agenda.belongsTo(models.Meeting, {
      foreignKey: {
        name: 'meetingId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Agenda;
};
