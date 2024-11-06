module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('availability', [
    {
      monday: '',
      tuesday: ''
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('availability', null, {})
};
