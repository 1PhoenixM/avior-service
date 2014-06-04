var express = require('express');
module.exports = express.createServer(); 
var routes = require('./courier.js');
//express(); // should be the latter for Express 3+
//type and ip of controller is provided by post

//define app here and in courier

app.use(express.bodyParser()); // TODO bodyParser has security flaw? maybe use a different middleware here
//express.json() 

//SERVER
app.listen(process.env.PORT || 3412);
//run on 8080