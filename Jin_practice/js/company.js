// var app = angular.module('app', ['ui.router']);

// app.config(["$stateProvider", "$controllerProvider", function ($stateProvider, $controllerProvider) {
//     app.register = {};
//     app.register.controller = $controllerProvider.register;
//     // var companyState = {
//     //     name: 'company',
//     //     url: '/company',
//     //     templateUrl: 'company.html',
//     //     resolve: {
//     //         loadJS: function ($q) {
//     //             var defer1 = $q.defer();
//     //             $script(["js/companyCtrl.js"], function () {
//     //                 defer1.resolve();
//     //             })
//     //             return defer1.promise;
//     //         }
//     //     }
//     // };
//     // var departmentState = {
//     //     name: 'department',
//     //     url: '/department',
//     //     template: '<h3>Hello!</h3>'
//     // };
//     // var personState = {
//     //     name: 'person',
//     //     url: '/person',
//     //     template: '<h3>Aloha!</h3>'
//     // };
//     // $stateProvider.state(companyState);
//     // $stateProvider.state(departmentState);
//     // $stateProvider.state(personState);
// }]);
//html格式的字符串转成html格式显示

app.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);
//高亮显示   
                  
app.filter('highlight', function ($sce) {
    return function (text, search) {
        // if (!search) {
        //     return $sce.trustAsHtml(text);
        // }
        var regex = new RegExp(search, 'gi');
        var result = text.replace(regex, '<span class="highLight">$&</span>');
        return result;
        //return $sce.trustAsHtml(result);
    }
});

$("#menu_list a").click(function () {
    $("#menu_list a").removeClass();
    $("#menu_list a").addClass("item");
    $(this).addClass("item active");
});