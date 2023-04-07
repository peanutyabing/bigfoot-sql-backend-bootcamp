"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sightings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      region: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city_town: {
        type: Sequelize.STRING,
      },
      location_description: {
        type: Sequelize.STRING,
      },
      notes: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("sightings");
  },
};
