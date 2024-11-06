const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('healthcare_system', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Availability extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      monday: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tuesday: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      // Additional days and fields as needed
    }, {
      sequelize,
      modelName: 'Availability',
      tableName: 'availability',
      timestamps: false,
    });
  }
}

Availability.init(sequelize);

module.exports = Availability;