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
                return ranges;
            }
        };

        return me;
    }]);

    /**
     * grid 工厂, 提供全局配置, 每次使用, 生成新的grid
     */
    grid.provider('grid', function () {
        var defaults = this.defaults = {
            pager   : {
                currentPage: 1,
                pageSize   : 20
            },
            sizeList: [10, 20, 50, 100, 150]
        };

        this.$get = [function () {
            function Factory(config) {
                var grid = angular.extend({}, defaults, config);
                return grid;
            }

            return Factory
        }];
    });

    grid.directive('grid', ['$resource', 'grid', function ($resource, grid) {
        return {
            restrict   : 'A',
            scope      : true,
            replace    : true,
            templateUrl: 'common/components/grid/grid.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var gridOptions = angular.copy($scope[$attr['grid'] || 'gridOptions']);// 取得 父$scope中 gridOptions
                    $scope._gridOptions = gridOptions;

                    $scope.columns = gridOptions.columns;
                    $scope.data = gridOptions.data;
                    $scope.pager = gridOptions.pager;

                    if (gridOptions.url) {
                        var DataSource = $resource(gridOptions.url);
                        $scope.query = function () {
                            var param = {};
                            angular.extend(param, $scope[gridOptions.param || 'param'], $scope.pager);

                            DataSource.get(param, function (response) {
                                $scope.data = response.data.data;
                                $scope.pager = response.data.pager;
                            });

                        };
                        $scope.query();
                    }

                    $scope.grid = grid(gridOptions); // 创建grid
                };
            }
        }
    }]);


    grid.directive('gridRow', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            compile : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var template = '',
                        element,
                        columns = $scope.columns,
                        column,
                        index,
                        length;

                    for (index = 0, length = columns.length; index < length; index++) {
                        column = columns[index];
                        if (column.field) {
                            template += '<td ng-bind="entity.' + column.field + '"></td>';
                        } else if (column.cellTemplate) {
                            template += '<td>' + column.cellTemplate + '</td>';
                        }
                    }

                    element = $compile(template)($scope);
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
                        $scope.query();
                    };

                    /**
                     * 计算页码
                     */
                    $scope.rangeTotalPages = function () {
                        $scope.totalPages = gridUtil.range($scope.pager.totalPages);
                    };
                    $scope.$watch('pager', function (newValue, oldValue) {
                        if (newValue === oldValue && newValue === undefined) {
                            return;
                        }
                        $scope.rangeTotalPages();
                    });

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

    grid.directive('pager', [function () {
        return {
            restrict   : 'A',
            templateUrl: 'common/components/grid/pager.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    console.log('pager link...');
                };
            }
        }
    }]);
})(window, document);