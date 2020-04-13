'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.addColumn(
      'Articles',
      'deletedAt',
      {
        type: Sequelize.DATE,
              allowNull: true,
              validate: {
              }
      }, { paranoid: true }
  );
     
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn(
      'Articles',
      'deletedAt',
      { paranoid: true }
      );
     
  }
};
