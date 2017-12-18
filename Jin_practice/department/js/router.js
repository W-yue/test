var app = angular.module("myApp",['ui.router']);
//测试数据是否传输成功
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

app.config(function($stateProvider,$controllerProvider,$filterProvider,$compileProvider,$provide){
    //异步加载
    app.register = {};
    app.register.controller = $controllerProvider.register;
    app.register.filter = $filterProvider.register;
    app.register.directive = $compileProvider.directive;
    app.register.factory = $provide.factory;
    app.register.service = $provide.service;

    // var zero = {
    //     name:'000',
    //     url:'/',
    //     template:"首页页面"
    // }
    var one = {
        name:'111',
        url:'/111',
        templateUrl:"/Jin_practice/company/company.html",
        resolve:{
            loadJs:function($q){
                var defer =  $q.defer();
                $script(["/Jin_practice/company/js/companyCtrl.js"],function(){
                    defer.resolve();
                });
                return defer.promise;
            } 
        }
    }
    var two = {
        // name:'two',
        url:'/two',
        templateUrl:"department.html",
        resolve:{
            loadJs:function($q){
                var defer =  $q.defer();
                $script(["js/myCtrl.js"],function(){
                    defer.resolve();
                });
                return defer.promise;
            } 
        }     
    } 
    $stateProvider.state("two.modalShow",{      
        url:"/modal/:department",
        templateUrl:function(opt){    
            return opt.department+".html";
        },
        controller:function($scope,$state){
            $(".modals").remove();
            $('#info')
            .modal({closable:false,onHidden:function(){
                $state.go("two");
            }})
            .modal("show");    
        }
    })
    var three = {
       // name: 'workers',
        url: '/workers',
        templateUrl:'/Jin_practice/workers/yeuser.html',      
        resolve:{
           loadJs:function($q){
               var defer=$q.defer();
               $script(["/Jin_practice/workers/js/yeCtrl.js"],function(){
                   defer.resolve();
               });
               return defer.promise;
           }
        }
    }
    // 用$stateProvider配置块注册三个状态，因为$stateProvider是一个Angular Provider，所以必须使用AngularJS依赖注入将它注入到一个.config()块中
    // $stateProvider.state(zero);
    $stateProvider.state(one);
    $stateProvider.state("two",two); //name:"two"
    $stateProvider.state("workers",three);
});
