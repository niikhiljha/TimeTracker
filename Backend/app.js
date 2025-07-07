const express = require('express');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const timeEntryRoutes = require('./routes/timeEntryRoutes');
const screenshotRoutes = require('./routes/screenshotRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use('/screenshots', express.static(path.join(__dirname, 'uploads/screenshots')));

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/time-entries', timeEntryRoutes);
app.use('/api/screenshots', screenshotRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;