/**
 * @class app
 * @description 项目主模块 : 引导, 配置
 * @time 2014-12-03 16:19
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    /**
     * App 主模块
     */
    var app = angular.module('App', ['ngRoute', 'ngResource', 'ngLocale', 'ngAnimate', 'templates', 'services', 'components', 'directives', 'home', 'members', 'points']);

    /**
     * App 配置
     */
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);


    /**
     * App 初始化
     */
    app.run(['$rootScope', function ($rootScope) {

    }]);

    /**
     * 主控制器
     */
    app.controller('AppController', ['$scope', function () {

    }]);

})(window, document);