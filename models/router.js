'use strict';
module.exports = (sequelize, DataTypes) => {
  const router = sequelize.define('router', {
    contrlname: DataTypes.STRING,
    method: DataTypes.STRING
  }, {});
  router.associate = function(models) {
    // associations can be defined here
  };
  return router;
};