/**
 * @class produces
 * @description 积分发放模块
 * @time 2014-12-03 17:40
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var produces = angular.module('produces', []);

    produces.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('points.produces', {
                url        : '/produces',
                templateUrl: 'app/points/produces/produces.tpl.html',
                controller : 'ProducesController'
            });

        // TODO Tab test
        $stateProvider
            .state('points.produces.birthday', {
                url     : '/birthday',
                template: '<h1>登记生日送积分</h1>'
            })
            .state('points.produces.email', {
                url       : '/email',
                template  : '<h1>登记邮箱送积分</h1>',
                controller: ['$scope', function ($scope) {
                    console.log($scope);
                }]
            });
    }]);

    produces.controller('ProducesController', ['$scope', function ($scope) {
        $scope.title = '积分发放模块';

        // TODO Tab test
        $scope.tabs = [
            {
                "title"  : "成功记录",
                "content": "success"
            },
            {
                "title"  : "失败记录",
                "content": "error"
            }
        ];
        $scope.tabs.activeTab = 1;
    }]);

})(window, document);