import React, { useState } from 'react';
import './Reminders.css';
import axios from 'axios';

function Reminders() {
  const [provider, setProvider] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const handleProviderChange = (event) => {
    setProvider(event.target.value);
  };

  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const handleNameChange = (event) => {
    setPatientName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setPatientEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPatientPhone(event.target.value);
  };

  const scheduleAppointment = async () => {
    try {
      const response = await axios.post('https://healthcare-systemapp-backend.cloud-stacks.com/api/appointments', {
        provider,
        appointmentDate,
        appointmentTime,
        patientName,
        patientEmail,
        patientPhone
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Appointment scheduled successfully');
    } catch (error) {
      alert('Error scheduling appointment');
    }
  };

  return (
    <div className="reminders">
      <header className="reminders-header">
        <h1>Healthcare System</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Appointments</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <main className="reminders-main">
        <h2>Book an Appointment</h2>
        <form className="booking-form">
          <label>
            Select Healthcare Provider:
            <select value={provider} onChange={handleProviderChange}>
              <option value="">Select a provider</option>
              <option value="Provider 1">Provider 1</option>
              <option value="Provider 2">Provider 2</option>
            </select>
          </label>
          <label>
            Appointment Date:
            <input type="date" value={appointmentDate} onChange={handleDateChange} />
          </label>
          <label>
            Appointment Time:
            <input type="time" value={appointmentTime} onChange={handleTimeChange} />
          </label>
          <label>
            Patient Name:
            <input type="text" value={patientName} onChange={handleNameChange} />
          </label>
          <label>
            Patient Email:
            <input type="email" value={patientEmail} onChange={handleEmailChange} />
          </label>
          <label>
            Patient Phone:
            <input type="tel" value={patientPhone} onChange={handlePhoneChange} />
          </label>
          <button type="button" onClick={scheduleAppointment} className="schedule-button">
            Schedule Appointment
          </button>
        </form>
      </main>
      <footer className="reminders-footer">
        <p>Contact Us | Terms of Service</p>
      </footer>
    </div>
  );
}

export default Reminders;
