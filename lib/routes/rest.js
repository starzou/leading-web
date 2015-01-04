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

var menus = [
    {
        "menuName": "积分发放",
        "url"     : "#/",
        "subList" : [
            {
                "menuName": "消费送积分",
                "url"     : "#/points/consumes",
                "subList" : [
                    {
                        "menuName": "消费送积分",
                        "url"     : "#/points/consumes"
                    },
                    {
                        "menuName": "收藏送积分",
                        "url"     : "#/points/consumes"
                    },
                    {
                        "menuName": "评价送积分",
                        "url"     : "#/points/consumes"
                    }
                ]
            },
            {
                "menuName": "收藏送积分",
                "url"     : "#/points/consumes"
            },
            {
                "menuName": "评价送积分",
                "url"     : "#/points/consumes"
            }
        ]
    },
    {
        "menuName": "积分兑换",
        "url"     : "#/",
        "subList" : [
            {
                "menuName": "积分抵钱购",
                "url"     : "#/points/produces"
            },
            {
                "menuName": "积分兑换购物券",
                "url"     : "#/points/produces"
            },
            {
                "menuName": "积分使用",
                "url"     : "#/points/produces"
            }
        ]
    }
];

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

    if (data.pager.currentPage === 2) {
        return response.send({message: '请求错误', success: false});
    }

    response.send({data: data, success: true});
});

router.get('/users2', function (request, response) {
    response.send({
        list       : data.data,
        currentPage: 1,
        pageSize   : 5,
        totalItems : 33,
        totalPages : 7,
        success    : true
    });
});

/**
 * menus
 */
router.get('/menus', function (request, response) {
    response.send(menus);
});

/**
 * files
 */
router.post('/files', function (req, res) {
    console.log(req);
    res.send({status: 200, message: 'OK'});
});
module.exports = router;
