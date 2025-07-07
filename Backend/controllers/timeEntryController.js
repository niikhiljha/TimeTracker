const timeEntryService = require('../services/timeEntryService');
const { serializeTimeEntry } = require('../utils/serializers');

exports.getAllTimeEntries = async (req, res, next) => {
  try {
    const timeEntries = await timeEntryService.getAllTimeEntries(req.query);
    res.json({
      time_entries: timeEntries.map(serializeTimeEntry)
    });
  } catch (error) {
    next(error);
  }
};

exports.getTimeEntryById = async (req, res, next) => {
  try {
    const timeEntry = await timeEntryService.getTimeEntryById(req.params.id);
    if (!timeEntry) {
      return res.status(404).json({ error: 'Time entry not found' });
    }
    res.json(serializeTimeEntry(timeEntry));
  } catch (error) {
    next(error);
  }
};

exports.createTimeEntry = async (req, res, next) => {
  try {
    const {
      employee_id,
      project_id,
      task_id,
      start_time,
      end_time,
      description,
      ip_address,
      mac_address,
      hostname
    } = req.body;

    const timeEntry = await timeEntryService.createTimeEntry({
      employee_id,
      project_id,
      task_id,
      start_time,
      end_time,
      description,
      ip_address,
      mac_address,
      hostname
    });

    res.status(201).json(serializeTimeEntry(timeEntry));
  } catch (error) {
    next(error);
  }
};

exports.updateTimeEntry = async (req, res, next) => {
  try {
    const timeEntry = await timeEntryService.updateTimeEntry(req.params.id, req.body);
    if (!timeEntry) {
      return res.status(404).json({ error: 'Time entry not found' });
    }
    res.json(serializeTimeEntry(timeEntry));
  } catch (error) {
    next(error);
  }
};