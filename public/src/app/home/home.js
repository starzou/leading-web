/**
 * @class home
 * @description 主页模块
 * @time 2014-12-03 16:44
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var home = angular.module('home', []);

    home.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
                url        : '/',
                templateUrl: 'app/home/home.tpl.html',
                controller : 'HomeController'
            });
    }]);

    home.controller('HomeController', ['$scope', 'utils', function ($scope, utils) {
        $scope.title = '首页';
    }]);
})(window, document);