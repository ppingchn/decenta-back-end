module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      departmentName: {
        type: DataTypes.STRING,
      },
    },
    {
      underscore: true,
    }
  );
  Department.associate = (models) => {
    Department.hasMany(models.User, {
      foreignKey: {
        name: 'departmentId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
};
