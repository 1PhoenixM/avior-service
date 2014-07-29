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
        console.log("POSTED DATA: ")
        console.log(req.body);
        flowData = req.body;
        resp = res;
        opts = {method:'POST',hostname:'10.11.17.40',port:8080,path:'/wm/staticflowentrypusher/json'};
        req = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            resp.send(chunk);
          });
        });
        console.log(JSON.stringify(flowData));
        req.write(JSON.stringify(flowData));
        req.end();
    },

    destroy: function(req, res) {
        restCall('DELETE','/wm/staticflowentrypusher/json');
        /*console.log("DELETED DATA: ")
        console.log(req.body);
        flowData = req.body;
        resp = res;
        opts = {method:'DELETE',hostname:'10.11.17.40',port:8080,path:'/wm/staticflowentrypusher/json'};
        req = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            
          });
        });
        console.log(req);
        req.end();*/
    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    }
}