var express = require('express');
var router = express.Router();

  /* GET */
  router.get('/console',function(req, res, next){
      
       res.render('admin');
  })
  
  /* GET */
  router.get('/logout',function(req, res, next){
    var auth = req.app.get('auth');
       auth.destroySess(req);
       res.json( {msg:' session destroy success!'} );
  });
  
  /* GET */
  router.get('/login',function(req,res,next){
       
       res.locals.signalMsger = req.flash('signalMsger').toString();
       res.render('login', { title: '管理後台登入' });
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
        user_account:permitLogin.credentail.user_account
      }
        auth.bindUser( req, dataUser);
  
    }else{ 
      console.log('綁定session出錯..');
    }
     
    res.json( { msg:permitLogin} );
   
  })


  /* POST */
  //route.post('/logout',function(){})

  module.exports = router;