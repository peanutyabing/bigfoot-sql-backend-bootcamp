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
      "categories",
      [
        { name: "funny", created_at: new Date(), updated_at: new Date() },
        { name: "spooky", created_at: new Date(), updated_at: new Date() },
        { name: "shocking", created_at: new Date(), updated_at: new Date() },
        { name: "nighttime", created_at: new Date(), updated_at: new Date() },
        { name: "daytime", created_at: new Date(), updated_at: new Date() },
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
