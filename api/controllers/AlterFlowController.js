var http = require('http');
var toClient = require('../../toClient.js');


var restCall = function(apiMethod,apiPath){
        //var self = this;
        return function(options,cb){
                if (options.args){
                        for (arg in options.args){
                                apiPath = apiPath.replace(/:[A-Za-z]+:/, options.args[arg]);
                        }
                }
                opts = {method:apiMethod,hostname:'10.11.17.40',port:8080,path:apiPath};
                
                req = http.request(opts, toClient(this,options.call,options.data,cb));
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                        console.log("DATA: " + options);
                        console.log("Got here");
                }
                req.end();
                
        }
};


module.exports = {
    identity: 'alterflow',
    
    find: function(req, res){
        restCall('GET','/wm/staticflowentrypusher/list/:arg:/json');
    },
    
    create: function(req, res) {
        console.log("POSTED DATA: " + JSON.stringify(req.body) + '\n')

        flowData = req.body;
        resp = res;
        var opts = {method:'POST',hostname:'10.11.17.40',port:8080,path:'/wm/staticflowentrypusher/json'};
        var req = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            resp.send(chunk);
          });
        });
        
        req.write(JSON.stringify(flowData));
        req.end();
    },

    destroy: function(req, res) {
        console.log("DELETED DATA: " + JSON.stringify(req.body) + '\n');
        var flowData = req.body;
        
        var res = res;
        var options = {
            hostname:'10.11.17.40', 
            port:8080, 
            path:'/wm/staticflowentrypusher/json',
            method:'DELETE'};
        
        var req = http.request(options, function(res) {
          console.log('STATUS: ' + res.statusCode + '\n');
          console.log('HEADERS: ' + JSON.stringify(res.headers) + '\n');
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk + '\n');
          });
        });
        
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message + '\n');
        });
        
        req.write(flowData);
        req.end();
    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    }
}