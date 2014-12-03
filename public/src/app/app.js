/**
 * @class app
 * @description 项目主模块 : 引导, 配置
 * @time 2014-12-03 16:19
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var app = angular.module('App', ['ngRoute', 'ngResource', 'home', 'members', 'points']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

    app.run(['$rootScope', function ($rootScope) {

    }]);

    app.controller('AppCtrl', ['$scope', function () {

    }]);

})(window, document);