/**
 * @class context
 * @description 上下文模块, 保存程序的状态
 * @time 2014-12-05 16:28
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var context = angular.module('services.context', []);

    context.provider('context', function () {
        var me = {};

        this.$get = [function () {
            return me;
        }];
    });

})(window, document);