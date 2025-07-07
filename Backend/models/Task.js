module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    assigned_employees: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Project, { foreignKey: 'project_id' });
    Task.hasMany(models.TimeEntry, { foreignKey: 'task_id' });
  };

  return Task;
};