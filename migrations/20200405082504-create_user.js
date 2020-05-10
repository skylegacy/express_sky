'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        comment: '使用者名',
        allowNull:false,
        unique: true
      },
      account: {
        type: Sequelize.STRING,
        comment: '帳號名稱',
        allowNull:false,
        unique: true
      },
      salt: {
        type: Sequelize.STRING,
        comment: '加鹽數據',
        allowNull:false 
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false ,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false ,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }

    },{ 
      paranoid: true ,
      indexes: [ {
        unique: true,
        fields: ['username', 'account','email']
      } ]
      
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
