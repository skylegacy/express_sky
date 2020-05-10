requirejs.config({
    baseUrl:'/',
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths:{
        'jquery':'./javascripts/jquery',
        'helper':'./javascripts/helper',
        'css':'./javascripts/libs/require-css/css',
        'index':'./javascripts/index', 
    },
    shim:{
        'index':{
            deps:['css!./stylesheets/index.css'],
            exports:'index'            
        }
        
    }
    // map:{
    //     '*': {
    //         'css': './javascripts/libs/require-css/css'  
    //       }
    // }
})


require([
    'helper',
    'jquery'
],function(helper,$){

    // console.log($);

   var str = helper.trim('  helper_sky  ');
   console.log(str);
   

})


