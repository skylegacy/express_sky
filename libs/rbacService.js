var models = require('../models');

function Rbac(){}

Rbac.prototype.initEnv = function(req){
    this.req = req;
}

Rbac.prototype.listRouterGrop = async function(){
   var result = await models.sequelize.query('SELECT distinct contrlname FROM routers',
   { type: models.Sequelize.QueryTypes.SELECT});
   return result;
}

Rbac.prototype.listRouter = async function(){
    var result = await models.router.findAll();
    return result;
}

Rbac.prototype.getRouter = async function(routeId){
    var result = await models.sequelize.query('SELECT * FROM routers where id = :route_id',
    { replacements: { route_id: routeId  }, type: models.Sequelize.QueryTypes.SELECT });
    return result;
}

Rbac.prototype.editRouter = async function(routeId,jdata){
    
    var status = null;
    try {
        await models.router.update(jdata , {
            where: {
              id:routeId
            }
        });
        status = 'write completed!';
    }catch(err){
        console.log(err);
        status = 'error';
    }
    return status;
}

Rbac.prototype.addRouter = async function(jdata){
   
    var status = null;
    console.log(jdata);
    try{
        await models.router.create(jdata);
        status = 'write completed!';
    }catch(err){
        console.log(err);
        status = 'error';
    }

    return status;
}

Rbac.prototype.listRole = async function(){
    var result = await models.Role.findAll();
    return result;
}

Rbac.prototype.getRole = async function(roleId){
    var result = await models.sequelize.query('SELECT * FROM Roles where id = :role_id',
    { replacements: { role_id: roleId }, type: models.Sequelize.QueryTypes.SELECT });
    return result;

}

Rbac.prototype.nevDelegateRou = async function(roleId){
    var result = await models.sequelize.query(`select * from routers where Id not in
    ( select RouteId from RouterRoles where RoleId = :role_id ) `,
    { replacements: { role_id: roleId },type: models.Sequelize.QueryTypes.SELECT });
    return result;
}

Rbac.prototype.seletedRou = async function(roleId){
    var result = await models.sequelize.query(`SELECT RouteId,contrlname,method FROM 
    skyship.RouterRoles as A , skyship.routers as B where A.RoleId = :role_id and B.id = A.RouteId ;`,
    { replacements: { role_id: roleId },type: models.Sequelize.QueryTypes.SELECT });
    return result;
}

module.exports = Rbac;