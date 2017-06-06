/**
 * Created by cengboyu on 2017/6/4.
 */

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('hi, this is hw1');
});



router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    res.send(JSON.stringify({"string":theName,"length":theName.length}))
//    next()
});


router.post('/', function (req, res, next) {
    let value = req.body.keystring
    res.json({"string":value,"length":value.length})
});

module.exports = router;