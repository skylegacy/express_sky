'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    Promise.all(
      await [
        queryInterface.addColumn('routers', 'deletedAt',
        { type: Sequelize.DATE,allowNull: true },
        { paranoid: true }
        ),
        queryInterface.addColumn('RouterRoles', 'deletedAt',
        { type: Sequelize.DATE,allowNull: true },
        { paranoid: true }
        ),
        queryInterface.addColumn('Roles', 'deletedAt',
        { type: Sequelize.DATE,allowNull: true },
        { paranoid: true }
        ),
        queryInterface.addColumn('RouRoUsers', 'deletedAt',
        { type: Sequelize.DATE,allowNull: true },
        { paranoid: true }
        ),
         
      ]
    )
  },

  down:async (queryInterface, Sequelize) => {
    Promise.all(
      await [
        queryInterface.removeColumn(
          'routers',
          'deletedAt',
          { paranoid: true }
        ),
        queryInterface.removeColumn(
          'RouterRoles',
          'deletedAt',
          { paranoid: true }
        ),
        queryInterface.removeColumn(
          'Roles',
          'deletedAt',
          { paranoid: true }
        ),
        queryInterface.removeColumn(
          'RouRoUsers',
          'deletedAt',
          { paranoid: true }
        )
      ]
    )
  }
};
