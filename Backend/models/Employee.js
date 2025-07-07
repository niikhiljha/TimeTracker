module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Employee.associate = (models) => {
    Employee.hasMany(models.TimeEntry, { foreignKey: 'employee_id' });
    Employee.hasMany(models.Screenshot, { foreignKey: 'employee_id' });
  };

  return Employee;
};