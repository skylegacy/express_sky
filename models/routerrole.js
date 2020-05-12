'use strict';
module.exports = (sequelize, DataTypes) => {
  const RouterRole = sequelize.define('RouterRole', {
    RouteId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER
  }, {});
  RouterRole.associate = function(models) {
    // associations can be defined here
    RouterRole.belongsTo(models.router, {foreignKey: 'RouteId', sourceKey: 'id'});
    RouterRole.belongsTo(models.Role, {foreignKey: 'RoleId', sourceKey: 'id'});
  };
  return RouterRole;
};