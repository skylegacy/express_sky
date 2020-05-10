
define('helper',['jquery'],function($){
    return {
        currentObj:null,
        trim:function(str){
            return $.trim(str);
        }
    }
});