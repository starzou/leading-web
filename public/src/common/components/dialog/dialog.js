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
            };

            me.success = function (options) {
                $alert(angular.extend({type: 'success'}, options));
            };

            me.warning = function (options) {
                $alert(angular.extend({type: 'warning'}, options));
            };

            me.danger = function (options) {
                $alert(angular.extend({type: 'danger'}, options));
            };
            return me;
        }];
    });

    /**
     * 配置 $modal 控件
     */
    dialog.config(['$modalProvider', function ($modalProvider) {
        angular.extend($modalProvider.defaults, {
            animation: 'am-fade-and-scale',
            backdrop : 'static',
            placement: 'center',
            keyboard : false
        });
    }]);

    /**
     * 封装 确认框 组件
     */
    dialog.provider('_confirm', function () {
        var me, defaults = {template: 'common/components/dialog/confirm.tpl.html'};

        this.$get = ['$modal', function ($modal) {
            me = function (options, okCallback, cancelCallback) {
                var modal = $modal(angular.extend(defaults, options)),
                    scope = modal.$scope;

                scope.$ok = function () {
                    // 执行 okCallback
                    (okCallback || angular.noop)();

                    // 配置了点击后关闭
                    if (options.clickedClose) {
                        modal.hide();
                    }
                };


                scope.$cancel = function () {
                    // 执行 cancelCallback
                    (cancelCallback || angular.noop )();

                    // 配置了点击后关闭
                    if (options.clickedClose) {
                        modal.hide();
                    }
                };

                console.log(modal);
                return modal;
            };
            return me;
        }];
    });

})(window, document);