const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql'
});

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  appointmentTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patientEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patientPhone: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  tableName: 'appointments',
  timestamps: false
});

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { provider, appointmentDate, appointmentTime, patientName, patientEmail, patientPhone } = req.body;

    const newAppointment = await Appointment.create({
      provider,
      appointmentDate,
      appointmentTime,
      patientName,
      patientEmail,
      patientPhone
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating appointment', details: error.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments', details: error.message });
  }
};

// Get an appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointment', details: error.message });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { provider, appointmentDate, appointmentTime, patientName, patientEmail, patientPhone } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.provider = provider;
    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;
    appointment.patientName = patientName;
    appointment.patientEmail = patientEmail;
    appointment.patientPhone = patientPhone;

    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating appointment', details: error.message });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await appointment.destroy();

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting appointment', details: error.message });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};