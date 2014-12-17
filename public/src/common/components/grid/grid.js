/**
 * @class grid
 * @description grid 组件
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var grid = angular.module('components.grid', []);

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

    grid.directive('pagination', [function () {
        return {
            restrict   : 'A',
            templateUrl: 'common/components/grid/pagination.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    $scope.pager = $scope._gridOptions.pager;

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
                        var totalPages = [],
                            length = $scope.pager.totalPages,
                            index;
                        for (index = 1; index <= length; index++) {
                            totalPages.push(index);
                        }
                        $scope.totalPages = totalPages;
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