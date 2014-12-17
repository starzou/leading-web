/**
 * @class components
 * @description 组件模块, 引入需要的的组件
 * @time 2014-12-10 14:09
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var components = angular.module('components', ['components.date', 'components.header', 'components.container', 'components.footer', 'components.spinner', 'components.dialog', 'components.grid']);

})(window, document);