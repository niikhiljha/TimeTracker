exports.serializeEmployee = (employee) => ({
  id: employee.id,
  name: employee.name,
  email: employee.email,
  status: employee.status,
  created_at: employee.created_at.toISOString(),
  updated_at: employee.updated_at.toISOString()
});

exports.serializeProject = (project) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  status: project.status,
  assigned_employees: project.assigned_employees || [],
  created_at: project.created_at.toISOString(),
  updated_at: project.updated_at.toISOString()
});


exports.serializeTask = (task) => ({
  id: task.id,
  name: task.name,
  project_id: task.project_id,
  assigned_employees: task.assigned_employees || [],
  status: task.status,
  created_at: task.created_at.toISOString(),
  updated_at: task.updated_at.toISOString()
});

exports.serializeTimeEntry = (entry) => ({
  id: entry.id,
  employee_id: entry.employee_id,
  project_id: entry.project_id,
  task_id: entry.task_id,
  start_time: entry.start_time ? entry.start_time.toISOString() : null,
  end_time: entry.end_time ? entry.end_time.toISOString() : null,
  duration: entry.duration,
  description: entry.description,
  ip_address: entry.ip_address,
  mac_address: entry.mac_address,
  hostname: entry.hostname,
  created_at: entry.created_at.toISOString()
});

exports.serializeScreenshot = (screenshot) => ({
  id: screenshot.id,
  employee_id: screenshot.employee_id,
  time_entry_id: screenshot.time_entry_id,
  taken_at: screenshot.taken_at ? screenshot.taken_at.toISOString() : null,
  filename: screenshot.filename,
  url: screenshot.url,
  permissions: screenshot.permissions || {},
  activity_level: screenshot.activity_level,
  created_at: screenshot.created_at.toISOString()
});