// var bodyParser = require('Body-Parser');
var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var routes = require('./routes');
var path = require('path');
var app = express();
var router = express.Router();

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cors support
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth');
    next();
});


app.use('/images',express.static(path.join(__dirname,'/images')));


_.each(routes, function (controller, route) { //we are storing all routes in a route file and mounting controllers for each of those endpoints
    app.use(route, controller);
});

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send(err.message);
});
mongoose.connect("mongodb://admin:admin@ds141406.mlab.com:41406/trellis-rx",{
    useMongoClient: true
  });
//mongodb://lusioapp:lusio123@ds023603.mlab.com:23603/lusio

mongoose.connection.once('open', function (req, res) {
    console.log("listening on port 8000");
    app.listen('8000');
});