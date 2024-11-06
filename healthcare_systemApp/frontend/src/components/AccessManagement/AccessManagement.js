import React, { useState, useEffect } from 'react';
import './AccessManagement.css';
import axios from 'axios';

function AccessManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [accessLevel, setAccessLevel] = useState('');
  const [configOption1, setConfigOption1] = useState('');
  const [configOption2, setConfigOption2] = useState('');
  const [bookings, setBookings] = useState(['Booking 1', 'Booking 2', 'Booking 3']);

  useEffect(() => {
    axios.get('https://healthcare-systemapp-backend.cloud-stacks.com/api/admin/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Failed to retrieve users', error));
  }, []);

  const handleAccessChange = (userId) => {
    axios.put(`https://healthcare-systemapp-backend.cloud-stacks.com/api/admin/users/${userId}`, {
      accessLevel
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const updatedUsers = users.map(user => user.id === response.data.id ? response.data : user);
      setUsers(updatedUsers);
      alert('Access level updated successfully');
    })
    .catch(error => console.error('Failed to update user access level', error));
  };

  const handleConfirmBookings = () => {
    axios.post('https://healthcare-systemapp-backend.cloud-stacks.com/api/admin/bookings/confirm', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => alert('Bookings confirmed'))
    .catch(error => console.error('Failed to confirm bookings', error));
  };

  const handleApplyConfiguration = () => {
    axios.post('https://healthcare-systemapp-backend.cloud-stacks.com/api/admin/configuration/apply', {
      configOption1,
      configOption2
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => alert('Configuration applied'))
    .catch(error => console.error('Failed to apply configuration', error));
  };

  return (
    <div className="access-management">
      <header className="header">
        <h1>System Administrator Tools</h1>
        <div className="branding">Company Branding</div>
      </header>
      <nav className="navigation-tabs">
        <button>User Access Management</button>
        <button>Booking Oversight</button>
        <button>System Configuration Management</button>
      </nav>
      <main className="main-content">
        <section className="user-access-management">
          <h2>User Access Management</h2>
          <form onSubmit={e => e.preventDefault()}>
            <label>User Name</label>
            <select onChange={e => setSelectedUser(e.target.value)} value={selectedUser}>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
            <label>Access Level</label>
            <select onChange={e => setAccessLevel(e.target.value)} value={accessLevel}>
              <option value="">Select Access Level</option>
              <option>Admin</option>
              <option>User</option>
              <option>Guest</option>
            </select>
            <button className="primary-action" onClick={() => handleAccessChange(selectedUser)}>Save Changes</button>
          </form>
        </section>
        <section className="booking-oversight">
          <h2>Booking Oversight</h2>
          <div className="bookings-list">
            {bookings.map((booking, index) => (
              <p key={index}>{booking}</p>
            ))}
          </div>
          <button className="primary-action" onClick={handleConfirmBookings}>Confirm Bookings</button>
        </section>
        <section className="system-configuration-management">
          <h2>System Configuration Management</h2>
          <form onSubmit={e => e.preventDefault()}>
            <label>Configuration Option 1</label>
            <input type="text" value={configOption1} onChange={e => setConfigOption1(e.target.value)} />
            <label>Configuration Option 2</label>
            <input type="text" value={configOption2} onChange={e => setConfigOption2(e.target.value)} />
            <button className="primary-action" onClick={handleApplyConfiguration}>Apply Configuration</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#contact">Contact</a>
      </footer>
    </div>
  );
}

export default AccessManagement;
