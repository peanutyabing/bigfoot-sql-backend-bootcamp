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
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content: "Salmon fishing is tight.",
          sighting_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "Do you think the big foot wanted salmon?",
          sighting_id: 1,
          created_at: new Date(new Date() + 10),
          updated_at: new Date(new Date() + 10),
        },
        {
          content:
            "Rock climing should be safe. Big foots (big feet?) are not known to be good climbers.",
          sighting_id: 2,
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
    await queryInterface.bulkDelete("comments", null, {});
  },
};
