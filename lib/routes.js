/**
 * @class routes
 * @description 自动 引用 routes 中间件
 * @time 2014-12-30 11:50
 * @author StarZou
 **/


// 使用中间件
exports.useRoutes = function (app) {
    var index = require('./routes/index');
    var rest = require('./routes/rest');

    app.use('/', index);
    app.use('/rest', rest);
};