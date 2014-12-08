/**
 * @class content
 * @description content模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var content = angular.module('directives.pages.container.content', []);

    content.directive('pageContent', [function () {
        return {
            restrict   : 'A',
            replace    : true,
            templateUrl: 'common/directives/pages/container/content/content.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {

                };
            }
        }
    }]);
})(window, document);