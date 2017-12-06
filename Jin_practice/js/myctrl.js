app.register.controller("myCtrl", function ($scope, $http,$filter) { 
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
                console.log(1)
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