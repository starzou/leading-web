/**
 * @class grid
 * @description grid 组件
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var grid = angular.module('components.grid', []);


    grid.factory('gridUtil', [function () {
        var me = {
            range: function (end, start, step) {
                step = step || 1; // 增量
                start = start || 1; // 开始值
                var ranges = [];
                for (; start <= end; start = start + step) {
                    ranges.push(start);
                }
                console.log(ranges);
                return ranges;
            }
        };

        return me;
    }]);

    grid.directive('grid', [function () {
        return {
            restrict   : 'A',
            scope      : true,
            replace    : true,
            templateUrl: 'common/components/grid/grid.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    console.log($scope, $attr);

                    $scope._gridOptions = $scope[$attr['grid'] || 'gridOptions'];
                    $scope.pager = $scope._gridOptions.pager;
                };
            }
        }
    }]);


    grid.directive('gridCell', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            compile : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var cellTemplate, element;

                    if ($scope.column.field) {
                        cellTemplate = '<span ng-bind="entity[column.field]"></span>';
                    } else if ($scope.column.cellTemplate) {
                        cellTemplate = $scope.column.cellTemplate;
                    }

                    console.log(cellTemplate);

                    element = $compile(cellTemplate)($scope);
                    $element.append(element);
                };
            }
        }
    }]);

    grid.directive('pagination', ['gridUtil', function (gridUtil) {
        return {
            restrict   : 'A',
            templateUrl: 'common/components/grid/pagination.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    /**
                     * 选择 当前页
                     * @param currentPage
                     */
                    $scope.selectPage = function (currentPage) {
                        $scope.pager.currentPage = currentPage;
                        console.log($scope.pager);
                    };

                    /**
                     * 计算页码
                     */
                    $scope.rangeTotalPages = function () {
                        $scope.totalPages = gridUtil.range($scope.pager.totalPages);
                    };
                    $scope.rangeTotalPages();

                    /**
                     * 没有上一页
                     */
                    $scope.noPrevious = function () {
                        return $scope.pager.currentPage == 1;
                    };

                    /**
                     * 没有下一页
                     */
                    $scope.noNext = function () {
                        return $scope.pager.currentPage == $scope.pager.totalPages;
                    };
                };
            }
        }
    }]);
})(window, document);