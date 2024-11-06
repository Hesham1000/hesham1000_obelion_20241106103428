CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provider VARCHAR(255) NOT NULL,
    appointmentDate DATE NOT NULL,
    appointmentTime TIME NOT NULL,
    patientName VARCHAR(255) NOT NULL,
    patientEmail VARCHAR(255) NOT NULL,
    patientPhone VARCHAR(15) NOT NULL
);
