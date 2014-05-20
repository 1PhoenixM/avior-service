//sources: http://nodejs.org/api/modules.html#modules_modules
//http://stackoverflow.com/questions/16745609/how-to-return-something-async-with-require
//http://stackoverflow.com/questions/16928838/writing-async-http-returns-in-nodejs
//http://stevehanov.ca/blog/index.php?id=127

var http = require('http');
//var Promise = require('../../node-promise/promise.js');
var unparsed = "";
var parsed = "";
var switch_dpid = "";
var switch_type = "";
var openFlowInfo = [];

var restURI = {
    host: 'localhost',    
    port: '8080',
    path: '/'
}

var FLRestCalls = [
'/wm/core/switch/all/<statType>/json',
'/wm/core/switch/<switchId>/<statType>/json',
'/wm/core/controller/switches/json',    
'/wm/core/controller/summary/json',    
'/wm/core/counter/<counterTitle>/json', 
'/wm/core/counter/<switchId>/<counterName>/json', 
'/wm/core/memory/json', 
'/wm/core/health/json', 
'/wm/core/systen/uptime/json', //sic
'/wm/topology/links/json', //not in 0.8
'/wm/topology/switchclusters/json', //not in 0.8
'/wm/topology/external-links/json', 
'/wm/topology/links/json', 
'/wm/device/', 
'/wm/staticflowentrypusher/json', 
'/wm/staticflowentrypusher/list/<switch>/json', 
'/wm/staticflowentrypusher/clear/<switch>/json', 
'/networkService/v1.1/tenants/<tenant>/networks/<network>',
'/networkService/v1.1/tenants/<tenant>/networks/<network>/ports/<port>/attachment',
'/networkService/v1.1/tenants/<tenant>/networks',
'/wm/firewall/module/<op>/json',
'/wm/firewall/rules/json'  
]; 

//this info should be sent from another file. what call to make?
restURI.path = FLRestCalls[2];

function getData(){
http.get(restURI, function(res){
    var promise = new Promise.Promise();
    res.on('data', function(chunk){
    unparsed += chunk;
    });
    
    res.on('end', function(){
    parsed = JSON.parse(unparsed);    
  
    if(restURI.path === FLRestCalls[2]){
        switch_dpid = parsed[0].dpid;
        switch_type = parsed[0].description.hardware;
        callback(switch_dpid);
        promise.resolve(switch_dpid);
    }
    else{
        console.log('Unsupported call or controller not connected');
    }	
    //console.log(switch_dpid);
    //console.log(switch_type);
    //module.exports = switch_dpid;
    //correct syntax, returns empty default module.exports object.
    //problem: async does not recognize this.
    });
    
    res.on('error', function(e){
    promise.reject( error );
    console.log("There was an error: " + e.message);
    });
    
    return promise;
})
}

   //module.exports = switch_dpid; 


//function sendOut(res, function(switch_dpid)
    //module.exports = switch_dpid;
//});

/*var getWebPageBody = function(res, callback) {                    
  var pageRes = "";                                                     

  res.setEncoding('utf8');                                              
  res.on('data', function(requestBody) {                                
    pageRes = requestBody;                                              
    console.log('[ DEBUG ] BODY:\t' + pageRes);                         
  });                                                                   
  res.on('end', function() {
    callback(pageRes); // invoke callback
  });
};

// and call it
getWebPageBody(res, function(pageRes) {
  // pageRes is now the thing you expect, inside this function.
});*/

//getData(sendOut);


//var promise = doSomeAsynchronousOperation();
//promise.then( function(result) {
    //module.exports = result;
//}, function(error) {
    //console.log(error);
//}
