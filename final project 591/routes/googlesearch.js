/**
 * Created by cengboyu on 2017/6/25.
 */


var express = require('express');
var router = express.Router();

const googlesearchConfig = require('../config/googlesearch')

/* Get the weather of a specific location */
router.get('/:name', function(req, res, next) {
    var str = req.params.name;
    var input = new Array();

    var GoogleSearch = require('google-search');
    var googleSearch = new GoogleSearch({
        key: googlesearchConfig.api_key,
        cx: googlesearchConfig.cse
    });
    googleSearch.build({
        q: str,
        start: 1,
        //fileType: "pdf",
        //gl: "tr", //geolocation,
        //lr: "lang_tr",
        num: 3, // Number of search results to return between 1 and 10, inclusive
       //siteSearch: "https://www.google.com/" // Restricts results to URLs from a specified site
    }, function(error, response) {
        console.log(response);
        res.json({items: response.items})
    });
});
// this api request return the top 3 links to user (key word input by user)
/* home page*/
router.get('/', function(req, res, next) {

    let str = req.params.name;
    var input = new Array();

    var GoogleSearch = require('google-search');
    var googleSearch = new GoogleSearch({
        key: googlesearchConfig.api_key,
        cx: googlesearchConfig.cse
    });
    googleSearch.build({
        q: "Python",
        start: 1,
        //fileType: "pdf",
        //gl: "tr", //geolocation,
        //lr: "lang_tr",
        num: 3, // Number of search results to return between 1 and 10, inclusive
    }, function(error, response) {
        console.log("hiiiiiiiii")

        console.log(response.items);

        res.json({items: response.items})
    });

});

module.exports = router;

/*
on front end controller

.controller('controllerName', function ($http, $scope) {
$scope.getItems = function () {
$http.get('http://localhost:3000/getItems')
.then(function (response) {

$scope.itemsArray = response.items  //that will be the array


})
}

}

in index.html
<ul>
<li ng-repeat="item in itemsArray" >{{item.title}}
</ul>
 */