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
            templateUrl: 'common/components/date/date-range.tpl.html'
        };
    }]);


    /**
     * 日期时间 选择器
     */
    date.directive('datetimePicker', [function () {
        return {
            replace    : true,
            scope      : true,
            templateUrl: 'common/components/date/datetime-picker.tpl.html'
        };
    }]);


})(window, document);