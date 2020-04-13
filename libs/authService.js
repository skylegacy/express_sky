
function Auth(){
     
}


Auth.prototype.getSess = function(key){
    console.log('取得seesion變數');
    return req.session[key];
}

Auth.prototype.setSess = function(obj){
    console.log('設至seesion變數');
    for(var key in obj){
        req.session[key] = obj[key];
    }
}

Auth.prototype.bindUser = function(obj){
    console.log('設至seesion.loginUser變數');
    return function(req){
        for(var key in obj){
            req.session.loginUser[key] = obj[key];
        }
    }

};

Auth.prototype.getUserRoute = function(req,res,next){

    var notLoginRouteAvoid = [
        '/admin/console/'
     ];

     var isLoginRouteAvoid = [
         '/admin/login/'
     ]

     var currentPath = req.path;
     var flag = null;

     console.log('控制器:'+req.baseUrl+',方法:'+req.path);
     console.log(req.session.loginUser);
    // todo:驗證身份並前往資料庫取得該會員可造訪的路由清單
     if(req.session.loginUser == undefined){

        console.log('存在session,不存在身份');

        notLoginRouteAvoid.forEach(function(item, index, array){
            flag = item == currentPath? true:false;
        })

         flag==true? res.redirect('back'):next();
    
     }else{

        console.log('存在session,身份為:'+req.session.loginUser);

        isLoginRouteAvoid.forEach(function(item, index, array){
            flag = item == currentPath? true:false;
        })

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