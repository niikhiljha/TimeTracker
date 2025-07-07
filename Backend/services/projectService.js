const db = require('../models');

exports.getAllProjects = async () => {
  return await db.Project.findAll({
    order: [['created_at', 'DESC']]
  });
};

exports.getProjectById = async (id) => {
  return await db.Project.findByPk(id);
};

exports.createProject = async ({ name, description, assigned_employees = [] }) => {
  if (!name) {
    throw new Error('Project name is required');
  }

  const project = await db.Project.create({
    name,
    description,
    assigned_employees
  });

  // Create default task
  await db.Task.create({
    name: `Default Task - ${name}`,
    project_id: project.id,
    assigned_employees
  });

  return project;
};

exports.updateProject = async (id, { name, description, assigned_employees, status }) => {
  const project = await db.Project.findByPk(id);
  if (!project) return null;

  if (name) project.name = name;
  if (description) project.description = description;
  if (assigned_employees) project.assigned_employees = assigned_employees;
  if (status) project.status = status;

  await project.save();
  return project;
};

exports.deactivateProject = async (id) => {
  const project = await db.Project.findByPk(id);
  if (!project) return null;

  project.status = 'inactive';
  await project.save();
  return project;
};