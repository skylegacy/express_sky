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
  
  /* POST */
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


  /* POST */
  router.post('/logout',function(){
    var auth = req.app.get('auth');
    auth.destroySess(req);
    res.json( {msg:' session destroy success!'} );
  })

  module.exports = router;