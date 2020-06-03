var express = require('express');
var router = express.Router();

  /* GET */
  router.get('/console',function(req, res, next){
       res.render('admin');
  })
  
  /* GET */
  router.get('/logout',function(req, res, next){
        req.flash('signalMsger','已成功登出')
        res.locals.signalMsger = req.flash('signalMsger').toString();
       var auth = req.app.get('auth');
       auth.destroySess(req);
       res.redirect('/');
  });
  
  /* GET */
  router.get('/login',function(req,res,next){
       res.locals.loadCss = '/stylesheets/login.css';
       res.locals.signalMsger = req.flash('signalMsger').toString();
       res.render('login',  { 
         title: '管理後台登入',
          csstags: ["/stylesheets/login.css"]
        });
  })

  /* GET */
  router.get('/router',async function(req,res,next){
    var modelRouter = req.app.get('rbac');
    var rendata = await modelRouter.listRouterGrop();
    var alldata = await modelRouter.listRouter();
    // console.log(rendata);
    res.render('route/index',{ 
      title: '控制路由編輯',
      $listData: JSON.stringify(rendata),
      $allData: JSON.stringify(alldata)
     });
  })

  /* GET */
  router.get('/router/edit/:id?',async function(req,res,next){
    var modelRouter = req.app.get('rbac');
    var num = req.params.id | 0;
    var jsonData;
      if(num){
        var rendata = await modelRouter.getRouter(num);
        console.log(rendata);
        jsonData = rendata[0];
      }else{
        jsonData = num;
      }
       res.render('route/add',{
        title: '控制路由編輯',
         $dataObjt:JSON.stringify(jsonData),
         loadId:num
       });
  })

  /* GET */
  router.get('/role/edit/:id?',async function(req,res,next){
    var modelRole = req.app.get('rbac');
    var num = req.params.id | 0;
    var jsonRoute = await modelRole.nevDelegateRou(num);
    var hasRoute = await modelRole.seletedRou(num);
    var jsonData;
      if(num){
        var rendata = await modelRole.getRole(num);
        jsonData = rendata[0];
      }else{
        jsonData = num;
      }
       res.render('role/add',{
        title: '控制角色編輯',
         $dataObjt:JSON.stringify(jsonData),
         loadId:num,
         $delgateRoute:JSON.stringify(jsonRoute),
         $hasRoute:JSON.stringify(hasRoute)
       });
  })

  /* GET */
  router.get('/role',async function(req,res,next){
        var modelRole = req.app.get('rbac');
        var rendata = await modelRole.listRole();
     
       res.render('role/index',{
            title: '角色身份',
            $listData: JSON.stringify(rendata)
       })
  })


   /* POST */
   router.post('/logout',function(){
    var auth = req.app.get('auth');
    auth.destroySess(req);
    res.json( {msg:' session destroy success!'} );
  })


  // =============================================================
  //                             API
  // =============================================================

  /* POST :api  */
  router.post('/role/edit',async function(req,res,next){
    var modelRole = req.app.get('rbac');
    var handdleData = {
      RoleId:req.body.id,
      RoleName:req.body.rolename,
      RoleRouteIn:req.body.roleRouteIn,
      RoleRouteOut:req.body.roleRouteOut
    }

    if(req.body.id){
      res.json({
        msg:'success',
        data:'已收到目標id'+req.body.id+',目標名稱為:'+req.body.rolename
      })
      console.log(handdleData);
    }else{

    }

  })

  /* POST :api  */
  router.post('/router/edit',async function(req,res,next){
    var modelRouter = req.app.get('rbac');
    
    var handdleData = {
      contrlname:req.body.contrlname,
      method:req.body.method
    }
    
    if(req.body.id){
      var rendata = await modelRouter.editRouter(req.body.id,handdleData);
      res.json({
        msg:'success',
        data:rendata
      })
    }else{ 
      var rendata = await modelRouter.addRouter(handdleData);
      res.json({
        msg:'no id',
        data:rendata
      })
    }
     
  })
  
  /* POST :api  */
  router.post('/login',async function(req,res,next){
    var auth = req.app.get('auth');
    var user = req.app.get('user');
    var userName = req.body.username;
    var userPass = req.body.password;
    var permitLogin = await user.authUser(userName,userPass);
    console.log(permitLogin);
    if( typeof permitLogin.credentail === "object"){
      console.log('綁定session正確..');
  
      var dataUser = {
        user_name:permitLogin.credentail.user_name,
        user_account:permitLogin.credentail.user_account,
        user_id:permitLogin.credentail.user_id
      }
        auth.bindUser( req, dataUser);
  
    }else{ 
      console.log('綁定session出錯..');
    }
     
    res.json( { msg:permitLogin} );
   
  })


 

  module.exports = router;