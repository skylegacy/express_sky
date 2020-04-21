var express = require('express');
var router = express.Router();
var userService = require('../libs/userService'); 

/* GET users listing. */
router.post('/create',function(req, res, next){
    var username = req.body.username;
    var account = req.body.account;
    var password = req.body.password;
    var email = req.body.email;
    var theUser = new userService();
    var data = theUser.addUser(username,account,password,email);
    res.json( {user:data} );
});

/* GET */
router.get('/login',function(req, res, next){
    
    res.send('一般的會員登錄');
})


module.exports = router;
