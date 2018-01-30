var treeApp = angular.module("treeApp", []);
treeApp.controller("treeController", function($scope,$compile){
    $scope.jsonData = {
        data:[
            { "id":1,"pid":null,"name":"项目1","checked":true},
            { "id":2,"pid":null,"name":"项目2","disabled":true},
            { "id":3,"pid":null,"name":"项目3","disabled":true,"checked":true},
            { "id":4,"pid":"1","name":"子项目1"},
            { "id":5,"pid":"1","name":"子项目2"},
            { "id":6,"pid":"2","name":"子项目1"},
            { "id":7,"pid":"2","name":"子项目2"},
            { "id":8,"pid":"4","name":"项目A"},
            { "id":9,"pid":"5","name":"项目A"},
            { "id":10,"pid":"5","name":"项目B"},
            { "id":11,"pid":"9","name":"A..."}
        ],
        isexpand:true,
        checkbox:true
    }  
})
treeApp.directive('treeView', function(){
    return {
                restrict: 'EA',
                template: "<ul class='csf-tree' style='padding:0'>"+
                            "<li ng-repeat='item in jsonDataTree' ng-include=\"'../tree/item/treeItem.html'\"></li>"+
                          "</ul>",
                scope: {
                    treeData: '='                 
                },
                link: function(scope,element){
                    var hash = {}; 
                    var checkedValue = null;
                    //将json串转换成树形结构
                    var transData = function(a, id, pid, children) { 
                        var r = [], len = a.length;  
                        for (var i=0; i < len; i++) { 
                            hash[a[i][id]] = a[i];                           
                        } 
                        for (var j=0; j < len; j++) { 
                            var aVal = a[j], hashVP = hash[aVal[pid]]; 
                            if (hashVP) {  
                                !hashVP[children] && (hashVP[children] = []);  
                                hashVP[children].push(aVal);  
                            } else { 
                                r.push(aVal);  
                            }  
                        } 
                        return r;  
                    } 
                    scope.jsonDataTree = transData(scope.treeData.data,'id','pid','children');
                    //按钮点击
                    scope.treeData.getCheckedNode = function(){
                        var checkednode = [];
                        var test = $(element).find("input[type='checkbox']:checked"), len = test.length;
                        for(var i=0;i<len;i++){
                            checkedValue = test[i].value;
                            checkednode.push(hash[checkedValue]);                                                   
                        }
                        return checkednode;
                    }
                    scope.isLeaf = function(item){
                        return !item.children; 
                    };               
                    scope.toggleExpandStatus = function(item){ 
                        item.isExpand = !item.isExpand;                        
                    };
                }
            };
});
