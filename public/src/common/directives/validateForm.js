/**
 * @class validateForm
 * @description 表单验证指令模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var validateForm = angular.module('directives.validateForm', ['mgcrea.ngStrap']);

    /**
     * 提示信息
     */
    validateForm.constant('VALIDATE', {
        required : '必填！',
        number   : "必须为数字！",
        minlength: '太短！',
        maxlength: '太长！',
        email    : 'Email无效！',
        url      : 'URL无效！',
        pattern  : '格式不正确！'
    });

    /**
     * 表单验证指令, 该指令在 form元素上使用
     */
    validateForm.directive('validateForm', ['$tooltip', 'VALIDATE', function ($tooltip, VALIDATE) {
        var me = {
            lastTooltips: [],
            validateFn  : function ($element, ngFormController) {
                var me = this,
                    formElement = $element[0], // form元素
                    formField,
                    tooltip,
                    name;

                /**
                 * 先移除上次的提示
                 */
                angular.forEach(me.lastTooltips, function (tooltip) {
                    tooltip.hide();
                })

                /**
                 * 进行验证, 显示错误提示
                 */
                angular.forEach(ngFormController.$error, function (ngModelControllers, type) {

                    angular.forEach(ngModelControllers, function (ngModelController) {
                        name = ngModelController.$name;
                        formField = formElement.querySelector('[name="' + name + '"]');

                        /**
                         * 显示提示
                         */
                        tooltip = $tooltip(angular.element(formField), {
                            title    : VALIDATE[type],
                            trigger  : 'manual',
                            placement: 'right',
                            show     : true
                        });

                        me.lastTooltips.push(tooltip);
                    });

                });
            },

            initValidate: function ($element, ngFormController) {
                var formFields = $element[0].querySelectorAll('[ng-model]'),
                    me = this;

                angular.forEach(formFields, function (formField) {
                    formField.addEventListener('keyup', function (event) {
                        me.validateFn($element, ngFormController);
                        event.stopPropagation();
                    }, false);
                });
            }
        };

        return {
            restrict: 'A',
            compile : function ($element, $attr) {

                /**
                 * 为表单添加了ng-model属性的字段 绑定 name,
                 * 以便于angular 为其创建 ngModelController, 实现字段校验
                 */

                var formElement = $element[0],
                    ngModelAttributeName = 'ng-model',
                    formFields = formElement.querySelectorAll('[' + ngModelAttributeName + ']'),
                    formField,
                    index;

                for (index = 0; index < formFields.length; index++) {
                    formField = formFields[index];
                    formField.name = formField.getAttribute(ngModelAttributeName); // 设置 表单字段的name 为 ng-model属性值
                }

                /**
                 * 使原生浏览器的校验无效
                 */
                formElement.setAttribute('novalidate', 'novalidate');


                return function ($scope, $element, $attr) {
                    var ngFormController = $scope[$attr.name]; // 取得ngFormController

                    $element.on('submit', function (event) {
                        me.validateFn($element, ngFormController);
                    });

                    $element.on('reset', function (event) {

                    });

                    me.initValidate($element, ngFormController);
                };
            }
        }
    }]);


})(window, document);