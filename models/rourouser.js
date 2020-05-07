'use strict';
module.exports = (sequelize, DataTypes) => {
  const RouRoUser = sequelize.define('RouRoUser', {
    RouRolId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  RouRoUser.associate = function(models) {
    // associations can be defined here
    RouRoUser.belongsTo(models.RouterRole, {foreignKey: 'RouRolId', sourceKey: 'id'});
    RouRoUser.belongsTo(models.User, {foreignKey: 'UserId', sourceKey: 'id'});
  };
  return RouRoUser;
};