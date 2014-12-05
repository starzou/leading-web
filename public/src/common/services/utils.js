/**
 * @class utils
 * @description 工具类模块
 * @time 2014-12-05 16:35
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var utils = angular.module('services.utils', []);

    utils.provider('utils', function () {
        var me = {
            name: 'services.utils 1.0.0'
        };

        /**
         * 根据对象属性, 生成URL
         * @param url
         * @returns {string}
         */
        me.buildURL = function (url) {
            var queryStrings = [],
                property,
                objArr = Array.prototype.slice.call(arguments, 1);
            objArr.forEach(function (element) {
                for (property in element) {
                    if (element.hasOwnProperty(property)) {
                        queryStrings.push(property + "=" + element[property]);
                    }
                }
            });

            return url + "?" + queryStrings.join("&");
        };

        this.$get = [function () {
            return me;
        }];
    });

})(window, document);