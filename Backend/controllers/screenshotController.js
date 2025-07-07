const screenshotService = require('../services/screenshotService');
const upload = require('../config/multer');
const { serializeScreenshot } = require('../utils/serializers');

exports.upload = upload.single('screenshot');

exports.getAllScreenshots = async (req, res, next) => {
  try {
    const screenshots = await screenshotService.getAllScreenshots(req.query);
    res.json({
      screenshots: screenshots.map(serializeScreenshot)
    });
  } catch (error) {
    next(error);
  }
};

exports.getScreenshotById = async (req, res, next) => {
  try {
    const screenshot = await screenshotService.getScreenshotById(req.params.id);
    if (!screenshot) {
      return res.status(404).json({ error: 'Screenshot not found' });
    }
    res.json(serializeScreenshot(screenshot));
  } catch (error) {
    next(error);
  }
};

exports.createScreenshot = async (req, res, next) => {
  try {
    const { employee_id, time_entry_id, taken_at, permissions, activity_level } = req.body;
    
    if (!employee_id || !time_entry_id || !taken_at || !req.file) {
      return res.status(400).json({ error: 'employee_id, time_entry_id, taken_at, and screenshot file are required' });
    }

    const url = `${req.protocol}://${req.get('host')}/screenshots/${req.file.filename}`;

    const screenshot = await screenshotService.createScreenshot({
      employee_id,
      time_entry_id,
      taken_at,
      filename: req.file.filename,
      url,
      permissions: permissions ? JSON.parse(permissions) : {},
      activity_level: activity_level ? parseInt(activity_level) : 0
    });

    res.status(201).json(serializeScreenshot(screenshot));
  } catch (error) {
    next(error);
  }
};