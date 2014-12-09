/**
 * @class spinner
 * @description spinner模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var spinner = angular.module('directives.pages.spinner', []);

    spinner.directive('pageSpinner', [function () {
        return {
            restrict: 'A',
            replace : true,
            template: '<div class="page-spinner-bar"><i class="fa fa-4x fa-spinner fa-spin"></i></div>',
            compile : function ($element, $attr) {
                return function ($scope, $element, $attr) {

                };
            }
        }
    }]);
})(window, document);