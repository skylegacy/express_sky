var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Rainbow Sky' });
});

/* GET */
router.get('/admin/console',function(req, res, next){
  res.render('admin');
})

/* GET */
router.get('/logout',function(req, res, next){
    var auth = req.app.get('auth');
    auth.destroySess(req);
    res.json( {msg:' session destroy success!'} );
});

/* GET */
router.get('/admin/login',function(req,res,next){
  res.render('login', { title: '會員登入' });
})

/* POST */
router.post('/admin/login',async function(req,res,next){
  var auth = req.app.get('auth');
  var user = req.app.get('user');
  var userName = req.body.username;
  var userPass = req.body.password;
  var permitLogin = await user.authUser(userName,userPass);
  if(permitLogin.credentail!==null){
     auth.bindUser(permitLogin.credentail);
  }
  // console.log(req.session.loginUser);
  req.session.loginUser = permitLogin.credentail.user_name;
  req.session.loginAccount = permitLogin.credentail.user_account;
  res.json( { msg:permitLogin} );
 
})


module.exports = router;
