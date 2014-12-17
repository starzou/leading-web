/**
 * @class consumes
 * @description 积分消费模块
 * @time 2014-12-03 17:42
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var consumes = angular.module('consumes', []);

    consumes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/points/consumes', {
            templateUrl: 'app/points/consumes/consumes.tpl.html',
            controller : 'ConsumesController'
        });
    }]);

    consumes.controller('ConsumesController', ['$scope', '$alert', 'spinner', '_alert', '_confirm', function ($scope, $alert, spinner, _alert, _confirm) {
        $scope.title = '积分消费模块';

        $scope.showAlert = function () {
            //$alert({
            //    title    : '警告!',
            //    content  : '服务器磁盘不足!',
            //    placement: 'top-right',
            //    type     : 'info',
            //    animation: 'am-fade-and-slide-top',
            //    duration : 3
            //});

            _alert.danger({
                title  : '警告!',
                content: '服务器磁盘不足!'
            });
        };

        $scope.showConfirm = function () {
            var confirm = _confirm({
                title       : '删除提示',
                content     : '您确认删除吗？',
                clickedClose: true
            }, function () {
                console.log('ok...');
                confirm.hide();
            }, function () {
                console.log('cancel...');
                confirm.hide();
            });
        };

        var i = 0;
        $scope.showSpinner = function () {
            i % 2 === 0 ? spinner.show() : spinner.hide();
            i++;
        };

        $scope.submit = function (param) {
            console.log('submit...', param);
        };

        var data = {
            data : [{name: '张三', age: 23, sex: '男'}, {name: '李四', age: 34, sex: '男'}, {
                name: '王五',
                age : 25,
                sex : '男'
            }],
            pager: {
                currentPage: 1,
                pageSize   : 5,
                totalItems : 33,
                totalPages : 7
            }
        };

        $scope.gridOptions = {
            data   : data.data, // 数据
            pager  : data.pager, // 分页信息
            columns: [{ // 列配置
                displayName : '姓名',
                cellTemplate: '<span ng-bind="entity.name + 1"></span>'
            }, {
                displayName: '性别',
                field      : 'sex'
            }, {
                displayName: '年龄',
                field      : 'age'
            }]
        };

        $scope.gridOptions2 = {
            data   : data.data, // 数据
            pager  : data.pager, // 分页信息
            columns: [{ // 列配置
                displayName : '姓名',
                cellTemplate: '<span ng-bind="entity.name + 2"></span>'
            }, {
                displayName: '性别',
                field      : 'sex'
            }, {
                displayName: '年龄',
                field      : 'age'
            }]
        };
    }]);

})(window, document);