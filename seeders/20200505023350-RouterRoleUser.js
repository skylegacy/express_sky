'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     
      return queryInterface.bulkInsert('RouRoUsers', [
        {
          RouRolId: 1,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouRolId: 2,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouRolId: 3,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouRolId: 4,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouRolId: 5,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },

        {
          RouRolId: 6,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouRolId: 7,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouRolId: 8,
          UserId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
      ], {}); 
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('RouRoUsers', null, {}); 
  }
};
