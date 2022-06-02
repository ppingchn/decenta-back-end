module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      scopeFeild: DataTypes.STRING,
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      projectType: {
        type: DataTypes.ENUM(['ClubProject', 'ClubEvent']),
      },
    },
    {
      underscore: true,
    }
  );
  Project.associate = (models) => {
    Project.belongsTo(
      models.User,
      {
        foreignKey: {
          allowNull: false,
          name: 'projectHeadId',
        },
      },
      {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }
    );
  };
  return Project;
};
