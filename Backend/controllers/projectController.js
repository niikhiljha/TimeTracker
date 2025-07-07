const projectService = require('../services/projectService');
const { serializeProject } = require('../utils/serializers');

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json({
      projects: projects.map(serializeProject)
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(serializeProject(project));
  } catch (error) {
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { name, description, assigned_employees } = req.body;
    const project = await projectService.createProject({ name, description, assigned_employees });
    res.status(201).json(serializeProject(project));
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(serializeProject(project));
  } catch (error) {
    next(error);
  }
};

exports.deactivateProject = async (req, res, next) => {
  try {
    const project = await projectService.deactivateProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};