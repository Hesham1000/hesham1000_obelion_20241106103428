import React from 'react';
import Search from './components/Search/Search.js';
import Booking from './components/Booking/Booking.js';
import Availability from './components/Availability/Availability.js';
import Reminders from './components/Reminders/Reminders.js';
import CalendarManagement from './components/CalendarManagement/CalendarManagement.js';
import AccessManagement from './components/AccessManagement/AccessManagement.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <Search />
        <Booking />
        <Availability />
        <Reminders />
        <CalendarManagement />
        <AccessManagement />
      </main>
    </div>
  );
}

export default App;
