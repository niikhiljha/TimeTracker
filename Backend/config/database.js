const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/timetracking',
  {
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;