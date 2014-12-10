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

    consumes.controller('ConsumesController', ['$scope', '$alert', function ($scope, $alert) {
        $scope.title = '积分消费模块';
        
        $scope.showAlert = function () {
            $alert({
                title    : '警告!',
                content  : '服务器磁盘不足!',
                placement: 'top-right',
                type     : 'info',
                animation: 'am-fade-and-slide-top'
            });
        };
    }]);

})(window, document);