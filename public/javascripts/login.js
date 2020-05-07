

module.exports = {

    LoadComponent: function(){
        var formEvent = require('./logform');
        formEvent.initFormComp();
    },
    LoadCompCss:function(){
        require("../stylesheets/login.css");
    }

}