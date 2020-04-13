
 
var bcrypt = require('bcrypt');
const saltRounds = 10;
var models = require('../models');
var bcrypt = require('bcrypt');



function User(){}

User.prototype.genSalt = function(password){

    this.result = {};
    this.result.passWithSlt = null;
    this.result.pass = password;
    this.result.salt = null;

    var that = this.result;

    that.salt = bcrypt.genSaltSync(saltRounds);
    that.passWithSlt = bcrypt.hashSync(password, that.salt);

    return that;
}

User.prototype.addUser = async function(username,account,password,email){
    var credetial = this.genSalt(password);

    var body = {
        username :username,
        account :account,
        email:email,
        createdAt : new Date(),
        updatedAt : new Date(),
        password : credetial.passWithSlt,
        salt : credetial.salt
    };
 
    var user = await models.User.create(body);
    return user;
 
}

User.prototype.authUser = async function(username,password){
    
    var permitted = {};

    try {

        var originalUser = await models.User.findOne({
            where:{ username:username }
        });

        if(originalUser.salt!==null){
            try {
                var autheticatedUser = await models.User.findOne({
                    where:{
                        username:username,
                        password: bcrypt.hashSync(password,originalUser.salt)
                    }
                })
                // console.log(autheticatedUser.password);
                if(autheticatedUser.password){
                    permitted = { 
                        data: {
                            status:true,
                            msg:'login permitt..'
                        },
                        credentail: { 
                            user_name:autheticatedUser.username,
                            user_account:autheticatedUser.account
                        }
                    };
                }
            } catch (error) {
                console.log('---出現錯誤---')
                // console.log(error); 
                permitted.data = { status:true,msg:'login abort:password not match' };
                permitted.credentail = null;
            }
        }

    } catch (error) {
        console.log('---出現錯誤---');
        // console.log(error); 
        permitted.data = { status:true,msg:'login abort:username not match' };
        permitted.credentail = null;
    }

    console.log(permitted);
    return permitted;
 
} 



module.exports = User;