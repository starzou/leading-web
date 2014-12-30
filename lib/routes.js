/**
 * @class routes
 * @description 自动 引用 routes 中间件
 * @time 2014-12-30 11:50
 * @author StarZou
 **/


/**
 * 加载中间件
 * @param app
 */
exports.loadRoutes = function () {

};

/**
 * 使用中间件
 * @param app
 */
exports.useRoutesByDirectory = function (app, path) {
    var index = require('./routes/index');
    var rest = require('./routes/rest');

    app.use('/', index);
    app.use('/rest', rest);
};