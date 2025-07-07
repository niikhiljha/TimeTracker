const app = require('./app');
const db = require('./models');
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    await db.sequelize.sync({ alter: true });
    console.log('Database models synchronized.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();