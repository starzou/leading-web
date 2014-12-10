/**
 * @class menus
 * @description 菜单资源
 * @time 2014-12-10 18:37
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var menus = angular.module('resources.menus', ['ngResource']);

    menus.factory('Menus', ['$resource', function ($resource) {
        var menus = $resource('/mock/menus.json');
        return menus
    }]);

})(window, document);