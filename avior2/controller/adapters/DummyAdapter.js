//testing only, empty
var http = require('http');
var unparsed = "";
var parsed = "";

var restURI = {
    host: 'localhost',    
    port: '8080',
    path: '/',
    auth: 'admin:admin'
}

var RestCalls = [
//array of rest calls to the controller
];

restURI.path = RestCalls[?];

var request = http.get(restURI, function(res){
    res.on('data', function(chunk){
    unparsed += chunk;
    });
    
    res.on('end', function(){
    var parsed = JSON.parse(unparsed);    
  
    if (restURI.path === RestCalls[?]){
        var varname = parsed.insertjsonlocationhere;
    }
    else{
        console.log('Unsupported call or controller not connected');
    }	
    //console.log(varname);
    });
    
    res.on('error', function(e){
    console.log("There was an error: " + e.message);
    });
}) 