var express = require('express');
var app = express.createServer(); 
module.exports = app;
var routes = require('./courier.js');
//express(); // should be the latter for Express 3+

//type and ip of controller is provided by post data

//SERVER
app.listen(process.env.PORT || 3412);
//run on 8080 in future

//This is the initial file to run