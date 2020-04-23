
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
    console.log('建立新curr:'+control_path); 
    return control_path;
};
 
Auth.prototype.cacheCurrent = function(req,url){
    // 建立新的 current 
    req.session.current_url = url; 
    console.log('最新的路由:'+req.session.current_url);
     
}
Auth.prototype.switchReferr = function(req){
    //轉置一路由 從current_url 到 last_referer
    var current_route = req.session.current_url;
    req.session.last_referer = current_route;

    var last_route = req.session.last_referer
    console.log('前一頁路由:'+last_route);
}

Auth.prototype.revelReferr = function(req){
    
}

Auth.prototype.directReferr = function(req,res){
    var last_route = req.session.last_referer;
    console.log('轉跳頁面:'+last_route);
    res.redirect(last_route);
}

Auth.prototype.bindUser = async function(req,dataUser){ 
        req.session.loginUser = dataUser.user_name;
        req.session.loginAccount = dataUser.user_account;
};

Auth.prototype.getUserRoute = function(req,res,next){

    var authInstance = req.app.get('auth');

    var notLoginRouteAvoid = [
        '/admin/console',
        '/admin/logout'
     ];

     var isLoginRouteAvoid = [
         '/admin/login'
     ];
 
     var flag = null;

     var currentPath = authInstance.inspectRoute(req);
     authInstance.switchReferr(req);
     authInstance.cacheCurrent(req,currentPath);

    console.log('存在session,身份為:'+req.session.loginUser);

    console.log('輸入的路由為:'+currentPath);

     if(req.session.loginUser == undefined){
        console.log('---檢查路由中---');
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
        //  console.log('未登入時不可去console頁');
        //  flag==true? res.redirect('back'):next();
          
     }else{
        console.log('---檢查路由中---');
        isLoginRouteAvoid.forEach(function(item, index, array){
            // console.log(item);
            if (item == currentPath){
                flag = true;
                return false;
            }
        }); 

        if(flag==true){
            req.flash('signalMsger','已登入時不可去登入頁');
            authInstance.directReferr(req,res);
         }else{
            
            next();
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