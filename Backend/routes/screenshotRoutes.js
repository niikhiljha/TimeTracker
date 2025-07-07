const express = require('express');
const router = express.Router();
const screenshotController = require('../controllers/screenshotController');

router.get('/', screenshotController.getAllScreenshots);
router.post('/', screenshotController.upload, screenshotController.createScreenshot);
router.get('/:id', screenshotController.getScreenshotById);

module.exports = router;