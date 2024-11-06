const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.use('/api', patientRoutes);
app.use('/api', doctorRoutes);
app.use('/api', adminRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
