'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const adminsLogins = ['admin@log.in'];
    const adminsPasswords = ['Test1234'];
    const adminsData = adminsLogins.map(((login, i) => ({
      login,
      password: adminsPasswords[i],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })));
    return queryInterface.bulkInsert('Admins', adminsData);
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
