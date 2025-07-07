module.exports = (sequelize, DataTypes) => {
  const Screenshot = sequelize.define('Screenshot', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    time_entry_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    taken_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(500)
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    activity_level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    tableName: 'screenshots',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  Screenshot.associate = (models) => {
    Screenshot.belongsTo(models.Employee, { foreignKey: 'employee_id' });
    Screenshot.belongsTo(models.TimeEntry, { foreignKey: 'time_entry_id' });
  };

  return Screenshot;
};