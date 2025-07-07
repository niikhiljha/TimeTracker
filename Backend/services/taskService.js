const db = require('../models');

exports.getAllTasks = async (projectId) => {
  const where = projectId ? { project_id: projectId } : {};
  return await db.Task.findAll({
    where,
    order: [['created_at', 'DESC']]
  });
};

exports.getTaskById = async (id) => {
  return await db.Task.findByPk(id);
};

exports.createTask = async ({ name, project_id, assigned_employees = [] }) => {
  if (!name || !project_id) {
    throw new Error('Task name and project_id are required');
  }

  const project = await db.Project.findByPk(project_id);
  if (!project) {
    throw new Error('Project not found');
  }

  return await db.Task.create({
    name,
    project_id,
    assigned_employees
  });
};

exports.updateTask = async (id, { name, assigned_employees, status }) => {
  const task = await db.Task.findByPk(id);
  if (!task) return null;

  if (name) task.name = name;
  if (assigned_employees) task.assigned_employees = assigned_employees;
  if (status) task.status = status;

  await task.save();
  return task;
};

exports.deactivateTask = async (id) => {
  const task = await db.Task.findByPk(id);
  if (!task) return null;

  task.status = 'inactive';
  await task.save();
  return task;
};