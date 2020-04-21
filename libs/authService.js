
function Auth(){ };

Auth.prototype.inspectRoute = function(req){ 
    console.log('--- 控制器+方法 ---');
    var control_path = req.baseUrl.replace("/","");
    var method_path = req.path.split("/");
    var currentRouter = {
        contrl:method_path[1],
        method:method_path[2]
    } 
    console.log(currentRouter);
    return '/'+currentRouter.contrl+'/'+currentRouter.method;
};

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
            
         }
        //  console.log('未登入時不可去console頁');
         flag==true? res.redirect('back'):next();
    
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
            
         }
        //  console.log('已登入時不可去登入頁');
        flag==true? res.redirect('back'):next();
        
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