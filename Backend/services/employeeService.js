const db = require('../models');

exports.getAllEmployees = async () => {
  return await db.Employee.findAll({
    order: [['created_at', 'DESC']]
  });
};

exports.getEmployeeById = async (id) => {
  return await db.Employee.findByPk(id);
};

exports.createEmployee = async ({ name, email, status = 'active' }) => {
  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  const existingEmployee = await db.Employee.findOne({ where: { email } });
  if (existingEmployee) {
    throw new Error('Employee with this email already exists');
  }

  return await db.Employee.create({
    name,
    email,
    status
  });
};

exports.updateEmployee = async (id, { name, email, status }) => {
  const employee = await db.Employee.findByPk(id);
  if (!employee) return null;

  if (name) employee.name = name;
  if (email) employee.email = email;
  if (status) employee.status = status;

  await employee.save();
  return employee;
};

exports.deactivateEmployee = async (id) => {
  const employee = await db.Employee.findByPk(id);
  if (!employee) return null;

  employee.status = 'inactive';
  await employee.save();
  return employee;
};