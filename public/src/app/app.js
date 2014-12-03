/**
 * @class app 项目主模块
 * @description
 * @time 2014-12-03 16:19
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var App = angular.module('App', ['ngRoute', 'ngResource', 'home']);

    App.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

    App.run(['$rootScope', function ($rootScope) {

    }]);

    App.controller('AppCtrl', ['$scope', function () {

    }]);

})(window, document);