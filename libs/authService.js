
var models = require('../models');


function Auth(){
};

Auth.prototype.inspectRoute = function(req){ 
    console.log('============ 控制器+方法 ============');
    var control_path = req.baseUrl.replace("/","");
    var method_path = req.path.split("/");
    var currentRouter = {
        contrl:method_path[1],
        method:method_path[2]
    } 
    
    if(currentRouter.contrl!=undefined && currentRouter.method!=undefined){
       control_path = '/'+currentRouter.contrl+'/'+currentRouter.method;
    }else{
       control_path = '/';
    }
    return control_path;
};

 // 建立新的 current 
Auth.prototype.cacheCurrent = function(req,url){
    req.session.current_url = url; 
    console.log('最新的路由:'+req.session.current_url);
}

// 轉置一路由 從current_url 到 last_referer
Auth.prototype.switchReferr = function(req){
    var current_route = req.session.current_url;
    req.session.last_referer = current_route;
    var last_route = req.session.last_referer
    console.log('前一頁路由:'+last_route);
}

// 取得路由列表
Auth.prototype.retrivRoleRoute = async function(userId){
    
    var result =  await models.sequelize.query(
    'select  contrlname,method from '+
    'Users as A join RouRoUsers as B join routers as C '+
    'on A.id = B.UserId and B.RouRolId = C.id and A.id = :user_id ',
      { replacements: { user_id: userId  }, type: models.Sequelize.QueryTypes.SELECT }
    );

    return result;
}

Auth.prototype.directReferr = function(req,res){
    var last_route = req.session.last_referer;
    console.log('轉跳頁面:'+last_route);
    res.redirect(last_route);
}

Auth.prototype.bindUser = async function(req,dataUser){ 
        req.session.loginUser = dataUser.user_name;
        req.session.loginAccount = dataUser.user_account;
        req.session.loginUserID = dataUser.user_id;
};

Auth.prototype.mappUserRoute = async function(req){

    var authInstance = req.app.get('auth');

    var currentPath = authInstance.inspectRoute(req);
    
    console.log('輸入的路由為:'+currentPath);
    console.log('存在session,身份為:'+req.session.loginUser);
    console.log('存在session,ID為:'+req.session.loginUserID);

      var isLoginRouteMap =[
          '/admin/console'
      ];
      var permitt = false;

        var permitPaths = await authInstance.retrivRoleRoute(req.session.loginUserID);

        for (const [index, valObj] of permitPaths.entries()) {
            var item = '/'+valObj.contrlname+'/'+valObj.method;
           isLoginRouteMap.push(item);
         }

        //  console.log('=======授權路由========');
        //  console.log(isLoginRouteMap);

         isLoginRouteMap.forEach(function(item, index, array){
            if (item == currentPath){
                permitt = true;
                console.log('找到授權路徑');
                return false;
            }
         });

         return permitt;

}

Auth.prototype.getUserRoute = async function(req,res,next){

    var authInstance = req.app.get('auth');

    var notLoginRouteAvoid = [
        '/admin/console',
        '/admin/logout'
     ];

     var isLoginRouteAvoid = [
         '/admin/login'
     ];

     var flag = null;
     var flag_route = null;
     var currentPath = authInstance.inspectRoute(req);
     authInstance.switchReferr(req);
     authInstance.cacheCurrent(req,currentPath);

     if(req.session.loginUser == undefined){

        notLoginRouteAvoid.forEach(function(item, index, array){
            if (item == currentPath){
                flag = true;
                return false;
            }
        })

        if(flag==true){
            req.flash('signalMsger','未登入時不可去console頁');
            authInstance.directReferr(req,res);
        }else{
            next();
        }
          
     }else if(req.session.loginUser != undefined){

        isLoginRouteAvoid.forEach(function(item, index, array){
            if (item == currentPath){
                flag = true;
                return false;
            }
        });

        var flag_route = authInstance.mappUserRoute(req);
        // var flag_route = true;

        if(flag==true){
            req.flash('signalMsger','已登入時不可去登入頁');
            authInstance.directReferr(req,res);
         }else if(!flag){

            if(flag_route){
                next();
            }else{
                req.flash('signalMsger','已登入但路由驗證失敗');
                authInstance.directReferr(req,res);
            }
            
         }
     } 

}


Auth.prototype.destroySess = function(req){
    req.session.destroy(function(){
        console.log('清除seesion');
    });   
}

Auth.sessInitData = {
    secret : "skyline",
    resave : true,
    cookie :{
        maxAge:1*60*60*1000
    },
    saveUninitialized:true
} 

module.exports = Auth;