/**
 * @class spinner
 * @description spinner模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var spinner = angular.module('components.spinner', []);

    spinner.factory('spinner', [function () {
        var me = {
            scope: {
                show: false
            },

            init: function (scope) {
                this.scope = scope;
            },

            show: function () {
                var scope = this.scope;
                if (!scope.show) {
                    scope.show = true;
                }
            },

            hide: function () {
                var scope = this.scope;
                if (scope.show) {
                    scope.show = false;
                }
            }
        };

        return me;
    }]);

    spinner.directive('pageSpinner', ['spinner', function (spinner) {
        return {
            restrict   : 'A',
            replace    : true,
            scope      : true,
            templateUrl: 'common/components/spinner/spinner.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    $scope.show = $attr.pageSpinner;
                    spinner.init($scope);
                };
            }
        }
    }]);
})(window, document);