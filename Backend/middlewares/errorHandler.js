
const multer = require('multer');

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  if (err.message.includes('not found')) {
    return res.status(404).json({ error: err.message });
  }

  if (err.message.includes('already exists') || 
      err.message.includes('required') || 
      err.message.includes('Invalid')) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;