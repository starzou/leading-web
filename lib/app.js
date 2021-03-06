var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var routes = require('./routes');

// 创建 Express App
var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(multer({dest: '../../uploads/'}));

// 使用自定义中间件
routes.useRoutes(app);


// 处理404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 处理异常错误
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error  : err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error  : {}
    });
});


// 共享
module.exports = app;
