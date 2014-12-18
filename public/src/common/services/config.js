/**
 * @class config
 * @description config 模块, 用来配置 angular 系统服务
 * @time 2014-12-05 16:28
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var configModule = angular.module('services.config', []);

    configModule.config(['$httpProvider', '$cacheFactoryProvider', function ($httpProvider, $cacheFactoryProvider) {
        var cacheFactory = $cacheFactoryProvider.$get();
        $httpProvider.defaults.cache = cacheFactory('cacheRequests', {capacity: 5});
    }]);

})(window, document);