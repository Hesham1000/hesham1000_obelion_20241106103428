import React, { useState } from "react";
import "./Booking.css";
import axios from "axios";

const Booking = () => {
  const [provider, setProvider] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleProviderChange = (e) => setProvider(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handlePatientDetailChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const scheduleAppointment = async () => {
    const appointmentData = {
      provider,
      appointmentDate: date,
      appointmentTime: time,
      patientName: patientDetails.name,
      patientEmail: patientDetails.email,
      patientPhone: patientDetails.phone
    };

    try {
      const response = await axios.post("https://healthcare-systemapp-backend.cloud-stacks.com/api/appointments", appointmentData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 201) {
        alert("Appointment Scheduled");
      }
    } catch (error) {
      alert("Error Scheduling Appointment");
    }
  };

  return (
    <div className="booking-container">
      <header className="booking-header">
        <h1>Healthcare System</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Booking</li>
            <li>Profile</li>
          </ul>
        </nav>
      </header>
      <main className="booking-main">
        <form className="booking-form">
          <div className="form-group">
            <label htmlFor="provider">Healthcare Provider</label>
            <select
              id="provider"
              value={provider}
              onChange={handleProviderChange}
            >
              <option value="">Select a provider</option>
              <option value="provider1">Provider 1</option>
              <option value="provider2">Provider 2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Preferred Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Preferred Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Patient Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={patientDetails.name}
              onChange={handlePatientDetailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={patientDetails.email}
              onChange={handlePatientDetailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={patientDetails.phone}
              onChange={handlePatientDetailChange}
            />
          </div>
          <button
            type="button"
            className="primary-action-button"
            onClick={scheduleAppointment}
          >
            Schedule Appointment
          </button>
        </form>
      </main>
      <footer className="booking-footer">
        <p>Contact us | Terms of Service</p>
      </footer>
    </div>
  );
};

export default Booking;
