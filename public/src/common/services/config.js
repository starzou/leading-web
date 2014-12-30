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

    /**
     * 错误拦截器
     */
    configModule.provider('errorInterceptor', function () {
        this.$get = ['$q', 'spinner', function ($q, spinner) {
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