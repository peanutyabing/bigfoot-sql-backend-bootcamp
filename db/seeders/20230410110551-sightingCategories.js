"use strict";

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    queryInterface.bulkInsert(
      "sighting_categories",
      [
        {
          sighting_id: 1,
          category_id: 1,
          intensity: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 1,
          category_id: 2,
          intensity: 60,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 2,
          category_id: 2,
          intensity: 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          category_id: 2,
          intensity: 80,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          category_id: 4,
          intensity: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sighting_categories", null, {});
  },
};
