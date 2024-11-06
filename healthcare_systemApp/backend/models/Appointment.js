const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('healthcare_system', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class Appointment extends Model {}

Appointment.init({
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
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  patientPhone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  }
}, {
  sequelize,
  modelName: 'appointments',
  tableName: 'appointments',
  timestamps: false
});

module.exports = Appointment;