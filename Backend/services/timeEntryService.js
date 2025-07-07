const db = require('../models');

exports.getAllTimeEntries = async (filters = {}) => {
  const where = {};
  
  if (filters.employee_id) where.employee_id = filters.employee_id;
  if (filters.project_id) where.project_id = filters.project_id;
  if (filters.start_date) where.start_time = { [db.Sequelize.Op.gte]: new Date(filters.start_date) };
  if (filters.end_date) where.end_time = { [db.Sequelize.Op.lte]: new Date(filters.end_date) };

  return await db.TimeEntry.findAll({
    where,
    include: [
      { model: db.Employee, attributes: ['name', 'email'] },
      { model: db.Project, attributes: ['name'] },
      { model: db.Task, attributes: ['name'] }
    ],
    order: [['created_at', 'DESC']]
  });
};

exports.getTimeEntryById = async (id) => {
  return await db.TimeEntry.findByPk(id, {
    include: [
      { model: db.Employee, attributes: ['name', 'email'] },
      { model: db.Project, attributes: ['name'] },
      { model: db.Task, attributes: ['name'] }
    ]
  });
};

exports.createTimeEntry = async ({
  employee_id,
  project_id,
  task_id,
  start_time,
  end_time,
  description,
  ip_address,
  mac_address,
  hostname
}) => {
  if (!employee_id || !project_id || !task_id || !start_time) {
    throw new Error('employee_id, project_id, task_id, and start_time are required');
  }

  let duration = null;
  if (end_time) {
    duration = Math.floor((new Date(end_time) - new Date(start_time)) / 1000);
  }

    return await db.TimeEntry.create({
    employee_id,
    project_id,
    task_id,
    start_time: new Date(start_time),
    end_time: end_time ? new Date(end_time) : null,
    duration,
    description,
    ip_address: ip_address || null,
    mac_address: mac_address || null,
    hostname: hostname || null
  });
};

exports.updateTimeEntry = async (id, { end_time, description }) => {
  const timeEntry = await db.TimeEntry.findByPk(id);
  if (!timeEntry) return null;

  if (end_time) {
    timeEntry.end_time = new Date(end_time);
    timeEntry.duration = Math.floor((timeEntry.end_time - timeEntry.start_time) / 1000);
  }
  if (description) timeEntry.description = description;

  await timeEntry.save();
  return timeEntry;
};