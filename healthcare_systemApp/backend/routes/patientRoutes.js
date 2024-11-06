const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require('../controllers/patientController');

// POST /appointments - Create a new appointment
router.post('/appointments', createAppointment);

// GET /appointments - Get all appointments
router.get('/appointments', getAllAppointments);

// GET /appointments/:id - Get an appointment by ID
router.get('/appointments/:id', getAppointmentById);

// PUT /appointments/:id - Update an appointment
router.put('/appointments/:id', updateAppointment);

// DELETE /appointments/:id - Delete an appointment
router.delete('/appointments/:id', deleteAppointment);

module.exports = router;