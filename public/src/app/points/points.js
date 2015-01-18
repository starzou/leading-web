/**
 * @class points
 * @description 积分模块
 * @time 2014-12-03 17:30
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var points = angular.module('points', ['produces', 'consumes']);

    points.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('points', {
                abstract: true,
                url     : '/points',
                template : '<div ui-view></div>'
            });
    }]);

})(window, document);