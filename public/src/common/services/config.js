/**
 * @class config
 * @description config 模块, 用来配置 angular 系统服务
 * @time 2014-12-05 16:28
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var configModule = angular.module('services.config', []);

    /**
     * $http 全局配置
     */
    configModule.config(['$httpProvider', '$cacheFactoryProvider', function ($httpProvider, $cacheFactoryProvider) {
        /**
         * 配置缓存
         */
        var cacheFactory = $cacheFactoryProvider.$get();
        $httpProvider.defaults.cache = cacheFactory('cacheRequests', {capacity: 5});

        /**
         * 配置错误提示拦截器
         */
        $httpProvider.interceptors.push('errorInterceptor');
    }]);

    configModule.provider('errorAlert', function () {

        // 默认配置
        var defaults = this.defaults = {
            template: '<div class="alert top-right fade-in-up alert-danger" style="display: block;"><strong>_title_</strong>&nbsp;<span>_content_</span></div>',
            show    : true,
            duration: 3
        };

        // errorAlert控件
        this.$get = ['$timeout', function ($timeout) {
            var body = document.body,
                $body = angular.element(body);

            function Factory(config) {
                var errorAlert = {},
                    element,
                    options = angular.extend({}, defaults, config),
                    template = options.template;

                // 替换要显示的消息
                template = template.replace('_title_', options.title || '');
                template = template.replace('_content_', options.content || '');

                // 显示 errorAlert
                errorAlert.show = function () {
                    element = angular.element(template);
                    $body.after(element);

                    if (options.duration) {
                        $timeout(function () {
                            errorAlert.hide();
                        }, options.duration * 1000);
                    }
                };

                // 移除 errorAlert
                errorAlert.hide = function () {
                    element.remove();
                };

                // show配置
                if (options.show) {
                    errorAlert.show();
                }

                return errorAlert;
            }

            return Factory;
        }];
    });

    /**
     * 错误拦截器
     */
    configModule.provider('errorInterceptor', function () {
        this.$get = ['$q', 'spinner', 'errorAlert', function ($q, spinner, errorAlert) {
            return {
                'request': function (config) {
                    spinner.show();
                    return config;
                },

                'requestError': function (rejection) {
                    console.log('请求错误');

                    spinner.hide();
                    return $q.reject(rejection);
                },

                'response': function (response) {
                    spinner.hide();

                    //返回结果
                    var result = response.data;

                    // 接口返回的数据对象
                    if (angular.isObject(result)) {
                        console.log(result);

                        // 失败, 提示消息
                        if (result.success === false) {
                            if (result.message) {
                                alert(result.message);
                            }
                        }
                    }

                    return response;
                },

                'responseError': function (rejection) {
                    console.log('响应错误');

                    spinner.hide();
                    return $q.reject(rejection);
                }
            };
        }];
    });

})(window, document);