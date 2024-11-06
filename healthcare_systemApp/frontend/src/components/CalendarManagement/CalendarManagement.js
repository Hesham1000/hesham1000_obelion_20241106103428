import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalendarManagement.css';

const CalendarManagement = () => {
  const [activeTab, setActiveTab] = useState('availability');
  const [availability, setAvailability] = useState({ monday: '', tuesday: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('https://healthcare-systemapp-backend.cloud-stacks.com/api/doctor/availability');
        if (response.data.length > 0) {
          setAvailability(response.data[0]);
        }
      } catch (err) {
        setError('Failed to load availability data');
      }
    };

    fetchAvailability();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAvailabilityChange = (event) => {
    const { name, value } = event.target;
    setAvailability({ ...availability, [name]: value });
  };

  const savePreferences = async () => {
    try {
      const response = await axios.post('https://healthcare-systemapp-backend.cloud-stacks.com/api/doctor/availability', availability, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Availability saved successfully');
    } catch (err) {
      setError('Failed to save availability');
    }
  };

  return (
    <div className="calendar-management">
      <header className="header">
        <div className="logo">Healthcare System</div>
        <h1>Doctor Calendar Management</h1>
      </header>
      <nav className="navigation-tabs">
        <ul>
          <li className={activeTab === 'availability' ? 'active' : ''} onClick={() => handleTabChange('availability')}>Availability</li>
          <li className={activeTab === 'preferences' ? 'active' : ''} onClick={() => handleTabChange('preferences')}>Preferences</li>
        </ul>
      </nav>
      <main className="main-content">
        <section className="calendar-view">
          <p>Calendar View Placeholder</p>
        </section>
        <aside className="form-fields">
          <h2>Set Availability</h2>
          <input type="text" name="monday" value={availability.monday} placeholder="Monday" onChange={handleAvailabilityChange} />
          <input type="text" name="tuesday" value={availability.tuesday} placeholder="Tuesday" onChange={handleAvailabilityChange} />
          <button className="primary-action" onClick={savePreferences}>Save Changes</button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </aside>
      </main>
      <footer className="footer">
        <div className="additional-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
        <p>© 2023 Healthcare System</p>
      </footer>
    </div>
  );
};

export default CalendarManagement;
