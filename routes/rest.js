/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 * REST 服务
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();

var data = {
    data : [{name: '小张', age: 23, sex: '男'}, {name: '小李', age: 34, sex: '男'}, {
        name: '小五',
        age : 25,
        sex : '男'
    }],
    pager: {
        currentPage: 1,
        pageSize   : 5,
        totalItems : 33,
        totalPages : 7
    }
};

/**
 * hello
 */
router.get('/', function (request, response) {
    response.send({title: 'hello, guys! This is REST Resource'});
});

/**
 * get users
 */
router.get('/users', function (request, response) {
    data.pager.currentPage = +request.query.currentPage || 1;
    data.data.forEach(function (element) {
        element.name = element.name.substring(0, 2) + '_' + data.pager.currentPage;
    });
    response.send(data);
});

module.exports = router;
