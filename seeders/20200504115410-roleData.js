'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     
    //   return queryInterface.bulkInsert('Roles',
    //   [
    //     {
    //       RoleName: 'admin',
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     },
    //     {
    //       RoleName: 'normal',
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     },
    //     {
    //       RoleName: 'visitor',
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     }
    // ]
    
    // ,null,{});
    return queryInterface.bulkInsert('Roles',null,{});
   
  },

  down: (queryInterface, Sequelize) => {
     
      return queryInterface.bulkDelete('Roles', null, {});
    
  }
};
