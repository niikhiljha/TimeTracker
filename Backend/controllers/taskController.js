const taskService = require('../services/taskService');
const { serializeTask } = require('../utils/serializers');

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(req.query.project_id);
    res.json({
      tasks: tasks.map(serializeTask)
    });
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { name, project_id, assigned_employees } = req.body;
    const task = await taskService.createTask({ name, project_id, assigned_employees });
    res.status(201).json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

exports.deactivateTask = async (req, res, next) => {
  try {
    const task = await taskService.deactivateTask(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};