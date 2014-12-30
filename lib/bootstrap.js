#!/usr/bin/env node
var debug = require('debug')('leading-web');
var app = require('./app');


/**
 * Express 服务器 引导程序
 */

// 设置端口
app.set('port', process.env.PORT || 3000);

// 启动监听
var server = app.listen(app.get('port'), function () {
    var address = '127.0.0.1:' + server.address().port,
        word = 'Express 服务器已经启动, 访问地址:' + address;

    console.log(word);
    debug(word);
});
