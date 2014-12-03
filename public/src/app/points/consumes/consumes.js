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

    consumes.controller('ConsumesController', ['$scope', function ($scope) {
        $scope.title = '积分消费模块';
    }]);

})(window, document);