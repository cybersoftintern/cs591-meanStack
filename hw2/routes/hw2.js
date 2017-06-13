/**
 * Created by cengboyu on 2017/6/4.
 */

var express = require('express');
var router = express.Router();



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection successful.')
});

const Schema = mongoose.Schema
const mySchema = new Schema({
    name: String,
    length: String
})
const people = mongoose.model('hw2_db', mySchema)

router.get('/', function (req, res, next) {
    people.find({}, function (err, results) {
        res.json(results);
    })

})

//GET Fetch single user, match /users/db/Frank
router.get('/:_name', function (req, res, next) {
    people.find({name: req.params._name}, function (err, results) {
        if(Object.keys(results).length === 0){
            let str = req.params._name;
            let len = str.length;
            const newStr = new people({
                name: str,
                length: len
                });

            newStr.save(function(err){
                if (err) {res.send(err)}
                else{
                    res.send(JSON.stringify({string:str,length:len}));

                }

            })

        }
        else {res.json({string:results[0].name,length:results[0].length});}
    })
})




router.post('/', function (req, res, next) {
    if(req.body.name){
        people.find({name: req.body.name}, function (err, results) {
            if (Object.keys(results).length === 0) {
                let str = req.body.name;
                let len = str.length;
                const newStr = new people({
                    name: str,
                    length: len
                });

                newStr.save(function (err) {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.send(JSON.stringify({string: str, length: len}));

                    }

                })

            }

            else {
                res.json({string: results[0].name, length: results[0].length});
            }
        } )

    }

    else{
        res.json({message:"invalid string"});
    }
})

router.delete('/:toDelete', function (req, res, next) {
    people.find({name:req.params.toDelete},function(err,results){
        if(Object.keys(results).length === 0){
            res.json({message:"not in our database"});
        }
        else{
            people.remove({name:req.params.toDelete},function(err){
            if(err) throw err;
            else res.json({message:"done"});


        })

        }})});
module.exports = router;

