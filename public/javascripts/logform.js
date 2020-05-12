


module.exports = {
    
    initFormComp:function(){
        console.log('vue form init !!!');
        return new Vue({
            el:'#loginForm',
            data:{
                user: {
                    username:null,
                    password:null
                },
                loginResult:""
            },
            methods:{
                loginFunc: function () {
                    let vm = this;
                    $.ajax({ 
                        url: "/admin/login",
                        method: "post",
                        data: vm.user, 
                        success: function (text) {
                            vm.loginResult=text;
                            location.href = "/admin/console";
                        }
                    });
                }
            }
        })
    }

}