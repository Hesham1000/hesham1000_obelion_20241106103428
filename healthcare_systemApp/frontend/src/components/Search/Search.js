import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
  const [provider, setProvider] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
  };

  const handleDateChange = (e) => {
    setAppointmentDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setAppointmentTime(e.target.value);
  };

  const handlePatientNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handlePatientEmailChange = (e) => {
    setPatientEmail(e.target.value);
  };

  const handlePatientPhoneChange = (e) => {
    setPatientPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (response.status === 201) {
        alert('Appointment scheduled successfully');
        setProvider('');
        setAppointmentDate('');
        setAppointmentTime('');
        setPatientName('');
        setPatientEmail('');
        setPatientPhone('');
      }
    } catch (error) {
      alert('Error scheduling appointment: ' + error.response.data.error);
    }
  };

  return (
    <div className="search-container">
      <header className="search-header">
        <h1>Healthcare System</h1>
        <nav className="navigation-menu">
          <a href="#home">Home</a>
          <a href="#appointments">Appointments</a>
          <a href="#profile">Profile</a>
        </nav>
      </header>
      <div className="booking-form">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="provider">Healthcare Provider</label>
            <select id="provider" value={provider} onChange={handleProviderChange}>
              <option value="">Select Provider</option>
              <option value="provider1">Provider 1</option>
              <option value="provider2">Provider 2</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="date">Preferred Date</label>
            <input type="date" id="date" value={appointmentDate} onChange={handleDateChange} />
          </div>
          <div className="form-field">
            <label htmlFor="time">Preferred Time</label>
            <input type="time" id="time" value={appointmentTime} onChange={handleTimeChange} />
          </div>
          <div className="form-field">
            <label htmlFor="patient-name">Patient Name</label>
            <input type="text" id="patient-name" value={patientName} onChange={handlePatientNameChange} />
          </div>
          <div className="form-field">
            <label htmlFor="patient-email">Patient Email</label>
            <input type="email" id="patient-email" value={patientEmail} onChange={handlePatientEmailChange} />
          </div>
          <div className="form-field">
            <label htmlFor="patient-phone">Patient Phone</label>
            <input type="tel" id="patient-phone" value={patientPhone} onChange={handlePatientPhoneChange} />
          </div>
          <button type="submit" className="primary-action-button">Schedule Appointment</button>
        </form>
      </div>
      <footer className="search-footer">
        <a href="#contact">Contact Us</a>
        <a href="#terms">Terms of Service</a>
      </footer>
    </div>
  );
}

export default Search;
