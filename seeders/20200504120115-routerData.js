'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     
      return queryInterface.bulkInsert('routers', [
        {
          contrlname: 'article', 
          method: 'list',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'article', 
          method: 'create',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'article', 
          method: 'del',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'article', 
          method: 'update',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'role', 
          method: 'list',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'role', 
          method: 'create',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'role', 
          method: 'del',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'role', 
          method: 'update',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'route', 
          method: 'list',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'route', 
          method: 'create',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          contrlname: 'route', 
          method: 'del',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        ,
        {
          contrlname: 'route', 
          method: 'update',
          createdAt: new Date(),
          updatedAt: new Date()
        }

    ], {}); 
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('routers', null, {});
  }
};
