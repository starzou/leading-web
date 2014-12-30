var express = require('express');
var router = express.Router();

/**
 * 主页
 */
router.get('/', function (req, res) {
    res.redirect('/src/index.html');
});

module.exports = router;
