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
    validateForm.constant('validateMessage', {
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
    validateForm.directive('validateForm', ['$parse', '$tooltip', 'validateMessage', function ($parse, $tooltip, validateMessage) {
        //var toolTipTemplate = '<div class="tooltip right fade in"><div class="tooltip-arrow" style="border-right-color: #d9534f;"></div><div class="tooltip-inner" style="background-color: #d9534f;">_title_</div></div>';
        var validator = {

            showTooltip: function (inputField, message) {
                //var tooltipInner = inputField.parentNode.querySelector('.tooltip .tooltip-inner');
                //if (tooltipInner) {
                //    tooltipInner.textContent = message;
                //} else {
                //    angular.element(inputField).after(toolTipTemplate.replace('_title_', message));
                //}

                var tooltip = inputField.data;
                if (tooltip) {
                    var $scope = tooltip.$scope;
                    $scope.$apply(function () {
                        $scope.title = message;
                    });
                } else {
                    tooltip = $tooltip(angular.element(inputField), {
                        title    : message,
                        trigger  : 'manual',
                        placement: 'top',
                        animation: "am-fade-and-slide-top",
                        show     : true
                    });
                    inputField.data = tooltip;
                }
            },

            hideTooltip: function (inputField) {
                //var parent = inputField.parentNode,
                //    tooltip = parent.querySelector('.tooltip');
                //if (tooltip) {
                //    parent.removeChild(tooltip);
                //}

                var tooltip = inputField.data;
                if (tooltip) {
                    tooltip.hide();
                    inputField.data = null;
                }
            },

            validateForm: function (ngFormController, nameFields) {
                angular.forEach(nameFields, function (field, name) {
                    validator.validateField(ngFormController, name, field)
                });
            },

            validateField: function (ngFormController, name, field) {
                var ngModelController = ngFormController[name];

                // 验证是否通过
                if (ngModelController.$invalid) {
                    var types = Object.keys(ngModelController.$error),
                        type = types[0];

                    var message = field.getAttribute('message');
                    message = $parse(message)();
                    validator.showTooltip(field, message && message[type] || validateMessage[type]);
                } else {
                    validator.hideTooltip(field);
                }
            },

            init: function (ngFormController, nameFields) {
                angular.forEach(nameFields, function (field, name) {
                    field.addEventListener('keyup', function (event) {
                        validator.validateField(ngFormController, name, field);
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

                    inputFields = formElement.querySelectorAll('[' + ngModelAttributeName + ']'),
                    inputField,
                    length,
                    index,
                    name,
                    nameFields = {};

                for (index = 0, length = inputFields.length; index < length; index++) {
                    inputField = inputFields[index]; // 当前Field
                    name = inputField.getAttribute(ngModelAttributeName); // 取得 inputField 的 ng-model属性值
                    inputField.name = name; // 设置 inputField.name 为 ng-model属性值
                    nameFields[name] = inputField; // {name : inputField} 形式 保存在 names中
                }

                /**
                 * 使原生浏览器的校验无效
                 */
                formElement.setAttribute('novalidate', 'novalidate');

                return function ($scope, $element, $attr) {
                    var ngFormController = $scope[$attr.name]; // 取得$scope 中的 ngFormController
                    var fn = $parse($attr['validateForm']); // 验证成功要执行的方法

                    $element.on('submit', function () {
                        validator.validateForm(ngFormController, nameFields);

                        // 验证成功
                        if (ngFormController.$valid) {
                            var callback = function () {
                                fn($scope, {$event: event});
                            };
                            $scope.$apply(callback);
                        }
                    });

                    $element.on('reset', function (event) {

                    });

                    validator.init(ngFormController, nameFields);
                };
            }
        }
    }]);


})(window, document);