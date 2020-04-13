'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        comment: '使用者名',
        allowNull:false,
        unique: true
      },
      account: {
        type: DataTypes.STRING,
        comment: '帳號名稱',
        allowNull:false,
        unique: true
      },
      salt: {
        type: DataTypes.STRING,
        comment: '加鹽數據',
        allowNull:false 
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false ,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false ,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }

    
  },
  {
    paranoid: true,
    indexes: [ {
        unique: true,
        fields: ['username', 'account','email']
      } ]
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};