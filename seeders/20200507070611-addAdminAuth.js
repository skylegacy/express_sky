'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RouRoUsers', [
      {
        RouRolId: 9,
        UserId: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        RouRolId: 10,
        UserId: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        RouRolId: 11,
        UserId: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        RouRolId: 12,
        UserId: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {}); 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RouRoUsers', null, {}); 
  }
};
