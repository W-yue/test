var app = angular.module("myApp",['ui.router']);

app.config(function($stateProvider){
    var one = {
        name:'111',
        url:'/111',
        template:"<div class='ui attached segment'><h3>公司首页</h3></div>"
    }
    var two = {
        name:'222',
        url:'/222',
        templateUrl:"department.html"
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


app.controller("myCtrl", function ($scope, $http,$filter) { 
    $scope.controller = {
        //flag:false,
        list:[],
        index:null,
        info:null,
        keyword:"",
        search:function(e){           
            if(e.keyCode==13){//键盘enter对应数字13
                this.get();
            }
        },
        //得到关键字
        getSearchData:function(){
            var data = {
                keyword:this.keyword,
                time:new Date().getTime()
            }
            if(/[0-9]/.test(this.keyword)){
                alert("不能输入数字");
                return false;
            }      
            this.searchData = data; //保存一下原来的数据
            return data;
        },
        //数据处理
        dealSearchData:function(data){
            this.list = $filter('filter')(data,this.searchData.keyword);

        },
        get:function(){ 
            var searchData = this.getSearchData();
            if(!searchData) return;
            $http.get("./json/department.json",{
                params:searchData
            }).success(function (data) {
                this.dealSearchData(data.department);
            }.bind(this));         
        },
        
        //模态框
        modal:function(){
            $('#info')
            .modal({closable:false})
            .modal("toggle");         
        },
        //添加
        add:function(){
            this.modal();              
        },
        //修改
        modify:function($index){
            this.index = $index;
            this.info = angular.copy(this.list[this.index]);
            this.modal();
        },
        //删除
        delete: function ($index) {
            this.index = $index;
            if (confirm("确定删除？")) {
                this.list.splice(this.index, 1);
            }
            this.index = null;
        },
        //保存
        save: function () {
            if (this.index == null) {
                //新增信息   
                //判断是否填入完整  
                var count = 0;
                for (x in this.info) {
                    count++;
                }
                if (count == 4) {
                    this.list.push(this.info);
                    this.info = null;
                    this.modal();
                }else{
                    confirm("请输入完整信息！");
                }
                count = 0;
            } else {
                //修改信息
                this.list[this.index] = this.info;
                this.info = null;
                this.index = null;
                this.modal();
            }
        }
    }
    $scope.controller.get();
  
//     $scope.$watch("keyword",function (value) {
//         $scope.search=$scope.keyword;
//    }) 

});
