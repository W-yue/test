app.register.controller('taoCtrl', function ($scope) {
    var idx = -1;
    $scope.info = {};
    $scope.test = "";
    $scope.companies = [{
            country: "美国",
            name: "沃尔玛",
            address: "address",
            email: "qwerty@walmart.com",
            tel: "1324653"
        },
        {
            country: "中国",
            name: "国家电网",
            address: "address",
            email: "qwerty@sgcc.com",
            tel: "5498467"
        },
        {
            country: "中国",
            name: "中石化",
            address: "address",
            email: "qwerty@sinopec.com",
            tel: "4946512"
        },
        {
            country: "中国",
            name: "中石油",
            address: "address",
            email: "qwerty@petrochina.com",
            tel: "2133212"
        },
        {
            country: "日本",
            name: "丰田",
            address: "address",
            email: "qwerty@toyota.com",
            tel: "3549816"
        }
    ];

    $scope.$watch('test', function () {
        if ($scope.test == "") {
            $scope.search = true;
        } else {
            $scope.search = false;
        }
    });
    $scope.controller = {
        state: "",
        sort: '',
        desc: false,
        del: function ($index) {
            if ($index >= 0) {
                if (confirm("是否删除" + $scope.companies[$index].name)) {
                    $scope.companies.splice($index, 1);
                }
            }
        },
        add: function () {
            this.state = "添加公司";
            $scope.info = {};
            $('#modal-1').modal('show');
        },
        update: function ($index) {
            this.state = "修改信息";
            $('#modal-1').modal('show');
            idx = $index;
            $scope.info = angular.copy($scope.companies[$index]);
        },
        save: function () {
            (this.state == "修改信息") ? ($scope.companies[idx] = $scope.info) : ($scope.companies.push($scope.info));
            $('#modal-1').modal('hide');
            $('body').dimmer('show');
            setTimeout(function () {
                $('body').dimmer('hide');
            }, 2000);
        },
        //列表排序
        sortList: function (type) {
            this.sort = type;
            this.desc = !$scope.controller.desc;
        },
        //搜索框内容删除
        remove: function () {
            $scope.test = "";
        }
    }
});