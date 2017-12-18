app.register.controller("yeCtrl", function ($scope, $http, $filter) {
    $scope.user = {
        workers: [],  //存放页面展示的数据
        info: {},
        state: "",    //区分新增和修改的状态
        index: "",
        keyword: "",
        searchData: "",
        //分页
        pageSize: 5,   //每页的数据数量
        pages: null,  //总共的分页数
        newPages: null,  //显示出来的分页数
        pageList: [],  //将显示的页数存在数组中
        selPage: 1,   //用来控制当前页显示的数据的变量
        items: [],   //将当前页的数据保存在这个数组中
        
        init: function () {
            this.get();
        },
        //设置表格数据源(分页)
        setData: function () {           
            this.items = this.workers.slice((this.pageSize * (this.selPage - 1)), (this.selPage * this.pageSize));//通过当前页数筛选出表格当前显示数据
        },

        getpageList: function () {
            this.pageList = []
            for (var i = 0; i < this.newPages; i++) {
                this.pageList.push(i + 1);
            }
        },

        //打印当前选中页
        selectPage: function (page) {
            if (page < 1 || page > this.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                this.pageList = newpageList;
            }
            this.selPage = page;
            this.setData();
            //this.isActivePage(page);
            console.log("选择的页：" + page);
        },

        // //设置当前选中页样式
        // isActivePage: function (page) {
        //     return this.selPage == page;          
        // },

        //上一页
        Previous: function () {
            this.selPage--;
            this.selectPage(this.selPage);
            //this.selectPage(this.selPage - 1);
        },
        //下一页
        Next: function () {
            this.selPage++;
            this.selectPage(this.selPage);
            //this.selectPage(this.selPage + 1);
        },

        search: function (e) {
            if (e.keyCode == 13) {//触发enter键盘事件
                this.get();
            }
        },
        get: function () {
            var searchData = this.getSearchData();
            if (!searchData) return;
            $http.get("/Jin_practice/workers/json/workers.json", {
                params: searchData
            }).success(function (data) {
                this.dealSearchData(data.workersList);
            }.bind(this));
        },
        getSearchData: function () {
            var data = {
                keyword: this.keyword,
                time: new Date().getTime()
            }
            if (/[0-9]/.test(this.keyword)) {
                alert("不能输入数字");
                return false;
            }
            this.searchData = data;
            return data;
        },
        //数据处理
        dealSearchData: function (data) {
            // this.temp = {}; 
            this.workers = $filter('filter')(data, this.searchData.keyword);
            this.pages = Math.ceil(this.workers.length / this.pageSize);
            this.newPages = this.pages > 5 ? 5 : this.pages;
            this.getpageList();
            this.selPage = 1;
            this.setData();
        },

        //封装一个实现弹出框出现或者隐藏的函数
        modal:function(){
            $('#ye')
            .modal({closable:false,onHidden:function(){
               $("#yeCtrl").append($("#ye"));
               $('.modals #ye').remove();
            }})
            .modal("toggle");
        },    
        add: function () {
            this.state = "add";
            this.info = {};
            this.modal();
        },

        modify: function ($index) {
            this.index = $index;
            this.state = "modfiy";
            this.info = angular.copy(this.items[$index]);
            this.modal();
        },

        save: function () {
            this.state == 'add' ? this.workers.push(this.info) : this.items[this.index] = this.info;
            $.each(this.workers,function(i,item){
                if(item.id==this.info.id){
                    this.workers[i] = this.info;
                    return false;
                } 
            }.bind(this));
            this.modal();
            this.info = {};
        },

        cancel: function () {    
            this.info = {};
            this.modal();
        },

        delete: function ($index) {
            $.each(this.workers,function(i,item){
                if(item.id==this.items[$index].id){
                    this.workers.splice(i, 1);
                    return false;
                } 
            }.bind(this));
            if ($index >= 0) {
                if (confirm("是否删除" + this.items[$index].Name)) {
                    this.items.splice($index, 1);
                }
            }
        },      
    }
});