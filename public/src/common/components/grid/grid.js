/**
 * @class grid
 * @description grid 组件
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var gridModule = angular.module('components.grid', []);


    /**
     * grid 工厂, 提供全局配置, 每次使用, 生成新的grid
     */
    gridModule.provider('grid', function () {
        var defaults = this.defaults = {
            pager   : {
                currentPage: 1,
                pageSize   : 20
            },
            sizeList: [10, 20, 50, 100, 150]
        };

        this.$get = ['$resource', function ($resource) {
            function Factory(config) {
                var grid = angular.extend({}, defaults, config);

                // 提供grid.query方法 查询数据
                if (grid.url) {
                    var DataSource = $resource(grid.url);
                    grid.query = function (options) {
                        // 查询参数
                        var queryParam = {
                            currentPage: grid.pager.currentPage,
                            pageSize   : grid.pager.pageSize
                        };
                        angular.extend(queryParam, options || {});

                        // 查询数据
                        DataSource.get(queryParam, function (response) {
                            // 数据集合
                            grid.list = response.list;

                            // 分页信息
                            grid.pager = {
                                currentPage: response.currentPage,
                                pageSize   : response.pageSize,
                                totalItems : response.totalItems,
                                totalPages : response.totalPages
                            };
                        });

                        console.log(grid);
                    };
                } else {
                    grid.query = angular.noop;
                }

                return grid;
            }

            return Factory
        }];
    });

    gridModule.directive('grid', ['$resource', 'grid', function ($resource, grid) {
        return {
            restrict   : 'A',
            scope      : true,
            replace    : true,
            templateUrl: 'common/components/grid/grid.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var gridOptions = angular.copy($scope[$attr['grid'] || 'gridOptions']);// 取得 父$scope中 gridOptions

                    // 根据gridOptions, 创建grid
                    $scope.grid = grid(gridOptions);

                    $scope.$watch('grid.pager.currentPage', function (newValue, oldValue) {
                        if (newValue === oldValue && newValue === undefined) {
                            return;
                        }
                        newValue = +newValue;
                        if (!isNaN(newValue) && angular.isNumber(newValue)) {
                            console.log(newValue);

                            if (newValue > $scope.grid.pager.totalPages) {
                                $scope.grid.pager.currentPage = $scope.grid.pager.totalPages;
                                return;
                            }

                            // 查询
                            $scope.grid.query();
                        } else {
                            $scope.grid.pager.currentPage = 1;
                        }
                    });

                    $scope.$watch('grid.pager.pageSize', function (newValue, oldValue) {
                        if (newValue === oldValue && newValue === undefined) {
                            return;
                        }
                        $scope.grid.query();
                    });
                };
            }
        }
    }]);


    gridModule.directive('gridRow', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            compile : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var template = '',
                        element,
                        columns = $scope.grid.columns,
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

    gridModule.directive('pager', [function () {
        return {
            restrict   : 'A',
            scope      : true,
            templateUrl: 'common/components/grid/pager.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    console.log('pager link...');

                    /**
                     * 选择页
                     * @param currentPage
                     */
                    $scope.setPage = function (page) {
                        var currentPage = +$scope.grid.pager.currentPage;

                        if (angular.isString(page)) {
                            switch (page) {
                                case 'first':
                                    currentPage = 1;
                                    break;
                                case 'last':
                                    currentPage = +$scope.grid.pager.totalPages;
                                    break;
                                case 'prev':
                                    currentPage--;
                                    break;
                                case 'next':
                                    currentPage++;
                                    break;
                            }
                        } else if (angular.isNumber(page)) {
                            currentPage = page;
                        }

                        $scope.grid.pager.currentPage = currentPage;
                    };

                    /**
                     * 没有上一页
                     */
                    $scope.noPrevious = function () {
                        return $scope.grid.pager.currentPage == 1;
                    };

                    /**
                     * 没有下一页
                     */
                    $scope.noNext = function () {
                        return $scope.grid.pager.currentPage === $scope.grid.pager.totalPages;
                    };
                };
            }
        }
    }]);
})(window, document);