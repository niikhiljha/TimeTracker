module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    assigned_employees: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    tableName: 'projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Project.associate = (models) => {
    Project.hasMany(models.Task, { foreignKey: 'project_id' });
    Project.hasMany(models.TimeEntry, { foreignKey: 'project_id' });
  };

  return Project;
};