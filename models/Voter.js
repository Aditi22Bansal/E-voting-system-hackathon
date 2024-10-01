const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the Sequelize instance

const Voter = sequelize.define('Voter', {
  voter_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'voters', // Your actual table name in the database
  timestamps: false,   // Disable timestamps if not used in the table
});

module.exports = Voter;
