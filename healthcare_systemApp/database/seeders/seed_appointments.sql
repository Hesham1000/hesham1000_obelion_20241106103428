-- Seeders for appointments table

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('appointments', [
    {
      provider: 'Provider 1',
      appointmentDate: '2023-09-15',
      appointmentTime: '09:00:00',
      patientName: 'John Doe',
      patientEmail: 'john.doe@example.com',
      patientPhone: '1234567890'
    },
    {
      provider: 'Provider 2',
      appointmentDate: '2023-09-16',
      appointmentTime: '10:00:00',
      patientName: 'Jane Doe',
      patientEmail: 'jane.doe@example.com',
      patientPhone: '0987654321'
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('appointments', null, {})
};
