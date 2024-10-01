const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASS, // Database password
  {
    host: process.env.DB_HOST || 'localhost', // Default to localhost
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306, // MySQL port
    logging: false, // Disable logging queries in console
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
