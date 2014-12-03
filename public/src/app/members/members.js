/**
 * @class members
 * @description 会员模块
 * @time 2014-12-03 17:45
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var members = angular.module('members', []);

    members.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/members', {templateUrl: 'app/members/members.tpl.html', controller: 'MembersController'});
    }]);

    members.controller('MembersController', ['$scope', function ($scope) {
        $scope.title = '会员模块';
    }]);
})(window, document);