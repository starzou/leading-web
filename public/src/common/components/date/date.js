/**
 * @class date
 * @description 日期 组件
 * @time 2014-12-10 14:25
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var date = angular.module('components.date', ['mgcrea.ngStrap']);

    date.config(['$datepickerProvider', function ($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy-MM-dd',
            animation : 'am-fade-and-slide-top',
            startWeek : 1,
            autoclose : true,
            maxDate   : Date.now()
        });
    }]);


    date.directive('dateRange', [function () {
        return {
            replace : true,
            template: '<div class="form-inline"><input type="text" class="form-control" ng-model="startDate" data-max-date="{{endDate}}" placeholder="开始日期" bs-datepicker><input type="text" class="form-control" ng-model="endDate" data-min-date="{{startDate}}" placeholder="结束日期" bs-datepicker></div>'
        };
    }]);


})(window, document);