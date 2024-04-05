'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isWeekend = [false, false, true, true];
    const isAdult = [false, true, false, true];
    const prices = [15, 20, 20, 25];
    const tariffsData = prices.map(((price, i) => ({
      price,
      is_weekend: isWeekend[i],
      is_adult: isAdult[i],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })));
    return queryInterface.bulkInsert('Tariffs', tariffsData);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
