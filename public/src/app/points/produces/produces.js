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

        $scope.tabs = [
            {
                "title"  : "成功记录",
                "content": "<h2>success</h2>"
            },
            {
                "title"  : "失败记录",
                "content": "<h2>error</h2>"
            }
        ];
        $scope.tabs.activeTab = 1;
    }]);

})(window, document);