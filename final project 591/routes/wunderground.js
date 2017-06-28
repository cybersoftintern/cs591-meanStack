/**
 * Created by cengboyu on 2017/6/25.
 */

//I use this API to return the current weather
var express = require('express');
var router = express.Router();

const wundergroundConfig = require('../config/wunderground')

/* Get the weather of a specific location */
router.get('/:name', function(req, res, next) {
    let str = req.params.name;
    var input = new Array();
    var input = str.split(',')
    console.log(input)
    console.log(input[0])
    var Wunderground = require('wunderground-api');
    var client = new Wunderground(wundergroundConfig.api_key);
    var opts = {
        city: input[0],
        state: input[1]
    }
    client.conditions(opts, function(err, data) {
        if (err) throw err;
        else {
            console.log(data.weather);
            res.send(data.weather);
        }
    });
});
// the user inputs the location and wunderground api returns the current weather for the input location
/* home page*/
router.get('/', function(req, res, next) {

    var Wunderground = require('wunderground-api');
    var client = new Wunderground(wundergroundConfig.api_key);
    var opts = {
        city: 'Boston',
        state: 'MA'
    }

    client.conditions(opts, function(err, data) {
        if (err) throw err;
        else {
            console.log(data.weather);
            res.send(data.weather);
        }
    });


});

module.exports = router;
