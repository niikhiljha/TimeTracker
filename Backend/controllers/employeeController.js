const employeeService = require('../services/employeeService');
const { serializeEmployee } = require('../utils/serializers');

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json({
      employees: employees.map(serializeEmployee)
    });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(serializeEmployee(employee));
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, status } = req.body;
    const employee = await employeeService.createEmployee({ name, email, status });
    res.status(201).json(serializeEmployee(employee));
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(serializeEmployee(employee));
  } catch (error) {
    next(error);
  }
};

exports.deactivateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deactivateEmployee(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};