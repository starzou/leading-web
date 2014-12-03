/**
 * @class home 主页模块
 * @description
 * @time 2014-12-03 16:44
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var Home = angular.module('home', []);

    Home.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'app/home/home.tpl.html', controller: 'HomeController'});
    }]);

    Home.controller('HomeController', ['$scope', function ($scope) {
        $scope.title = '首页';
    }]);
})(window, document);