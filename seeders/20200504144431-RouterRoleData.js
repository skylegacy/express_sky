'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('RouterRoles', [
        {
          RouteId: 1,
          RoleId: 5,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 1,
          RoleId: 6,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 1,
          RoleId:7,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 1,
          RoleId: 8,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 1,
          RoleId: 9,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 1,
          RoleId: 10,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 1,
          RoleId: 11,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 1,
          RoleId: 12,
          createdAt:new Date(),
          updatedAt:new Date()
        },

        {
          RouteId: 2,
          RoleId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 2,
          RoleId: 2,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 2,
          RoleId: 3,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 2,
          RoleId: 4,
          createdAt:new Date(),
          updatedAt:new Date()
        },

        {
          RouteId: 3,
          RoleId: 1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 3,
          RoleId: 2,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 3,
          RoleId: 3,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          RouteId: 3,
          RoleId: 4,
          createdAt:new Date(),
          updatedAt:new Date()
        },


    ], {}); 
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('RouterRoles', null, {});
    
  }
};
