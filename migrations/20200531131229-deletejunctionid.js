'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'RouterRoles',
      'id',
      { paranoid: true }
    );
  },

  down: (queryInterface, Sequelize) => {
    return null;
  }
};
