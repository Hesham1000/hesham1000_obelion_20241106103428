import React, { useState } from 'react';
import axios from 'axios';
import './Availability.css';

function Availability() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  const handleDateTimeChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

  const handleNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setPatientEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPatientPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [appointmentDate, appointmentTime] = selectedDateTime.split('T');
      const response = await axios.post('https://healthcare-systemapp-backend.cloud-stacks.com/api/appointments', {
        provider: selectedProvider,
        appointmentDate,
        appointmentTime,
        patientName,
        patientEmail,
        patientPhone,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Redirect to dashboard or show success message
    } catch (error) {
      // Handle error, show error message
    }
  };

  return (
    <div className="availability">
      <header className="header">
        <h1>Healthcare System</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Providers</li>
            <li>Appointments</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Schedule an Appointment</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="provider">Healthcare Provider</label>
            <select id="provider" value={selectedProvider} onChange={handleProviderChange}>
              <option value="">Select Provider</option>
              <option value="provider1">Provider 1</option>
              <option value="provider2">Provider 2</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dateTime">Preferred Date & Time</label>
            <input type="datetime-local" id="dateTime" value={selectedDateTime} onChange={handleDateTimeChange} />
          </div>

          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input type="text" id="patientName" value={patientName} onChange={handleNameChange} />
          </div>

          <div className="form-group">
            <label htmlFor="patientEmail">Patient Email</label>
            <input type="email" id="patientEmail" value={patientEmail} onChange={handleEmailChange} />
          </div>

          <div className="form-group">
            <label htmlFor="patientPhone">Patient Phone</label>
            <input type="tel" id="patientPhone" value={patientPhone} onChange={handlePhoneChange} />
          </div>

          <button type="submit" className="primary-action-button">Schedule Appointment</button>
        </form>
      </main>

      <footer>
        <p>Contact us | Terms of Service</p>
      </footer>
    </div>
  );
}

export default Availability;
