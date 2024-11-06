const express = require('express');
const router = express.Router();
const {
  getUserAccessManagement,
  updateUserAccess,
  confirmBookings,
  applySystemConfiguration,
} = require('../controllers/adminController');

// GET /api/admin/users - Retrieve all users for user access management
router.get('/users', getUserAccessManagement);

// PUT /api/admin/users/:id - Update user access level
router.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { accessLevel } = req.body;
  try {
    await updateUserAccess({ body: { userId, accessLevel } }, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user access level' });
  }
});

// POST /api/admin/bookings/confirm - Confirm bookings
router.post('/bookings/confirm', confirmBookings);

// POST /api/admin/configuration/apply - Apply system configuration
router.post('/configuration/apply', applySystemConfiguration);

module.exports = router;

// User model file (e.g., models/User.js)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessLevel: {
    type: DataTypes.ENUM('Admin', 'User', 'Guest'),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;

// database configuration (e.g., config/database.js)
module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'healthcare_system',
    host: 'db',
    dialect: 'mysql',
  },
  // other environments...
};