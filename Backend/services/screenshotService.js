const db = require('../models');

exports.getAllScreenshots = async (filters = {}) => {
  const where = {};
  
  if (filters.employee_id) where.employee_id = filters.employee_id;
  if (filters.time_entry_id) where.time_entry_id = filters.time_entry_id;
  if (filters.start_date) where.taken_at = { [db.Sequelize.Op.gte]: new Date(filters.start_date) };
  if (filters.end_date) where.taken_at = { [db.Sequelize.Op.lte]: new Date(filters.end_date) };

  return await db.Screenshot.findAll({
    where,
    order: [['taken_at', 'DESC']]
  });
};

exports.getScreenshotById = async (id) => {
  return await db.Screenshot.findByPk(id);
};

exports.createScreenshot = async ({
  employee_id,
  time_entry_id,
  taken_at,
  filename,
  url,
  permissions = {},
  activity_level = 0
}) => {
  if (!employee_id || !time_entry_id || !taken_at || !filename) {
    throw new Error('employee_id, time_entry_id, taken_at, and filename are required');
  }

  return await db.Screenshot.create({
    employee_id,
    time_entry_id,
    taken_at: new Date(taken_at),
    filename,
    url,
    permissions,
    activity_level
  });
};