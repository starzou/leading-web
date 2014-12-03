/**
 * @class produces
 * @description 积分发放模块
 * @time 2014-12-03 17:40
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var produces = angular.module('produces', []);

    produces.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/points/produces', {
            templateUrl: 'app/points/produces/produces.tpl.html',
            controller : 'ProducesController'
        });
    }]);

    produces.controller('ProducesController', ['$scope', function ($scope) {
        $scope.title = '积分发放模块';
    }]);

})(window, document);