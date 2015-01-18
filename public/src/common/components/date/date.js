/**
 * @class date
 * @description 日期 组件
 * @time 2014-12-10 14:25
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var date = angular.module('components.date', ['mgcrea.ngStrap']);

    date.config(['$datepickerProvider', '$timepickerProvider', function ($datepickerProvider, $timepickerProvider) {

        /**
         * 配置 日期控件
         */
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy-MM-dd',
            animation : 'am-fade-and-slide-top',
            startWeek : 1,
            autoclose : true,
            maxDate   : Date.now()
        });


        /**
         *  配置 时间控件
         */
        angular.extend($timepickerProvider.defaults, {
            timeFormat: 'HH:mm',
            animation : 'am-fade-and-slide-top',
            minuteStep: '1',
            length    : 7
        });
    }]);


    /**
     * 时间区间 选择器
     */
    date.directive('dateRange', [function () {
        return {
            replace    : true,
            scope      : {
                target: '='
            },
            templateUrl: 'common/components/date/date-range.tpl.html',
            link       : function postLink($scope, $element, $attr) {
                // 设置最大日期
                $scope.maxDate = new Date();


                /**
                 * 选择 开始日期
                 */
                $scope.$watch('param.startDate', function (newValue, oldValue) {
                    if (newValue === oldValue && newValue === undefined) {
                        return;
                    }

                    if (!$scope.target) {
                        $scope.target = {};
                    }

                    // 绑定 开始日期
                    $scope.target[$attr.start || 'startDate'] = newValue;
                });


                /**
                 * 选择 结束日期
                 */
                $scope.$watch('param.endDate', function (newValue, oldValue) {
                    if (newValue === oldValue && newValue === undefined) {
                        return;
                    }

                    if (!$scope.target) {
                        $scope.target = {};
                    }

                    // 绑定 结束日期
                    $scope.target[$attr.end || 'endDate'] = newValue;
                });
            }
        };
    }]);


    /**
     * 日期时间 选择器
     * scope.target : 表示要绑定的对象
     */
    date.directive('datetimePicker', [function () {
        return {
            replace    : true,
            scope      : {
                target: '='
            },
            templateUrl: 'common/components/date/datetime-picker.tpl.html',
            link       : function postLink($scope, $element, $attr) {
                /**
                 * 选择 日期,时间
                 */
                $scope.$watch('dateTime', function (newValue, oldValue) {
                    if (newValue === oldValue && newValue === undefined) {
                        return;
                    }

                    if (!$scope.target) {
                        $scope.target = {};
                    }

                    // 绑定时间
                    $scope.target[$attr.datetimePicker] = $scope.dateTime;
                });
            }
        };
    }]);


})(window, document);