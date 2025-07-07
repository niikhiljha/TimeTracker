const express = require('express');
const router = express.Router();
const timeEntryController = require('../controllers/timeEntryController');

router.get('/', timeEntryController.getAllTimeEntries);
router.post('/', timeEntryController.createTimeEntry);
router.get('/:id', timeEntryController.getTimeEntryById);
router.put('/:id', timeEntryController.updateTimeEntry);

module.exports = router;