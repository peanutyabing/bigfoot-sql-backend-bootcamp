"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.removeColumn("sightings", "location");
    await queryInterface.addColumn("sightings", "location_description", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("sightings", "region", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("sightings", "city_town", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("sightings", "location", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeColumn("sightings", "location_description");
    await queryInterface.removeColumn("sightings", "country");
    await queryInterface.removeColumn("sightings", "region");
    await queryInterface.removeColumn("sightings", "city_town");
  },
};
