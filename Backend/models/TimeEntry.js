module.exports = (sequelize, DataTypes) => {
  const TimeEntry = sequelize.define('TimeEntry', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    ip_address: {
      type: DataTypes.STRING(45)
    },
    mac_address: {
      type: DataTypes.STRING(17)
    },
    hostname: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'time_entries',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  TimeEntry.associate = (models) => {
    TimeEntry.belongsTo(models.Employee, { foreignKey: 'employee_id' });
    TimeEntry.belongsTo(models.Project, { foreignKey: 'project_id' });
    TimeEntry.belongsTo(models.Task, { foreignKey: 'task_id' });
    TimeEntry.hasMany(models.Screenshot, { foreignKey: 'time_entry_id' });
  };

  return TimeEntry;
};