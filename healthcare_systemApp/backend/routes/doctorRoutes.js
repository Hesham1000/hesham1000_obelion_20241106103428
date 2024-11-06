const express = require('express');
const router = express.Router();
const {
  getAvailability,
  updateAvailability,
  createAvailability,
  deleteAvailability
} = require('../controllers/doctorController');

router.get('/availability', getAvailability);
router.post('/availability', createAvailability);
router.put('/availability/:id', updateAvailability);
router.delete('/availability/:id', deleteAvailability);

module.exports = router;

// Make sure to update the model to match the database table
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Availability = sequelize.define('availability', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  monday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tuesday: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Availability;

// Ensure the database configuration uses 'db' as the host
const dbConfig = {
  host: 'db',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database',
  dialect: 'mysql'
};

module.exports = dbConfig;