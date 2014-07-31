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
                if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
                opts = {method:apiMethod,hostname:host,port:8080,path:apiPath};
                
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
        if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
        opts = {method:'POST',hostname:host,port:8080,path:'/wm/staticflowentrypusher/json'};
        requ = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            resp.send(chunk);
          });
        });
        console.log(JSON.stringify(flowData));
        requ.write(JSON.stringify(flowData));
        requ.end();
    },

    destroy: function(req, res) {
        restCall('DELETE','/wm/staticflowentrypusher/json');
        /*console.log("DELETED DATA: ")
        console.log(req.body);
        flowData = req.body;
        resp = res;
        if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
        opts = {method:'DELETE',hostname:host,port:8080,path:'/wm/staticflowentrypusher/json'};
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