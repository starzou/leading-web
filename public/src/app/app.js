/**
 * @class app 项目主模块
 * @description
 * @time 2014-12-03 16:19
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var app = angular.module('App', ['ngRoute', 'ngResource', 'home', 'members']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

    app.run(['$rootScope', function ($rootScope) {

    }]);

    app.controller('AppCtrl', ['$scope', function () {

    }]);

})(window, document);