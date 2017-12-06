var app = angular.module("myApp",['ui.router']);
// app.run(function($q,$timeout){
//     var defer = $q.defer();
//     $timeout(function(){
//         defer.resolve("ok");
//     },2000);

//     defer.promise
//     .then(function(msg){
//         console.log(msg);
//         var defer1 = $q.defer();
//         $timeout(function(){
//             defer1.resolve("ok1")
//         },2000);
//         return defer1.promise;
//     })
//     .then(function(msg1){
//         console.log(msg1);
//     });   
// });

app.config(function($stateProvider,$controllerProvider){
    //异步加载
    app.register = {};
    app.register.controller = $controllerProvider.register;

    var one = {
        name:'111',
        url:'/111',
        template:"<div class='ui attached segment'><h3>公司首页</h3></div>"
    }
    var two = {
        name:'222',
        url:'/222',
        templateUrl:"department.html",
        //controller:'myCtrl',
        resolve:{
            loadJs:function($q){
                var defer =  $q.defer();
                $script(["js/myctrl.js"],function(){
                    defer.resolve();
                });
                return defer.promise;
            } 
        }
    }
    var three = {
        name:'333',
        url:'/333',
        template:"<div class='ui attached segment'><h3>员工信息</h3></div>"
    }
    // 用$stateProvider配置块注册三个状态，因为$stateProvider是一个Angular Provider，所以必须使用AngularJS依赖注入将它注入到一个.config()块中
    $stateProvider.state(one);
    $stateProvider.state(two);
    $stateProvider.state(three);
});
