//sources: http://nodejs.org/api/modules.html#modules_modules
//http://stackoverflow.com/questions/16745609/how-to-return-something-async-with-require

var http = require('http');
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

function getData(callback){
http.get(restURI, function(res){
    res.on('data', function(chunk){
    unparsed += chunk;
    });
    
    res.on('end', function(){
    parsed = JSON.parse(unparsed);    
  
    if(restURI.path === FLRestCalls[2]){
        switch_dpid = parsed[0].dpid;
        switch_type = parsed[0].description.hardware;
        callback();
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
    console.log("There was an error: " + e.message);
    });
})
}

function sendOut() {
    //module.exports = "Test";
}

getData(sendOut);