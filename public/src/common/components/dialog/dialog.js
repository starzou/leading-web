/**
 * @class dialog
 * @description 封装对话框
 * @time 2014-12-12 17:28
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var dialog = angular.module('components.dialog', ['mgcrea.ngStrap']);

    /**
     * 配置 $alert 控件
     */
    dialog.config(['$alertProvider', function ($alertProvider) {
        angular.extend($alertProvider.defaults, {
            animation: 'am-fade-and-slide-top',
            placement: 'top-right',
            duration : 3
        });
    }]);

    /**
     * 包装 $alert, 为自己服务
     * 提醒框组件
     */
    dialog.provider('_alert', function () {
        var me = {};

        this.$get = ['$alert', function ($alert) {
            me.info = function (options) {
                $alert(angular.extend({type: 'info'}, options));
            }

            me.success = function (options) {
                $alert(angular.extend({type: 'success'}, options));
            }

            me.warning = function (options) {
                $alert(angular.extend({type: 'warning'}, options));
            }

            me.danger = function (options) {
                $alert(angular.extend({type: 'danger'}, options));
            }
            return me;
        }];
    });

})(window, document);