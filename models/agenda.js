module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: true,
      },
    },
    description: DataTypes.STRING,
  });
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
