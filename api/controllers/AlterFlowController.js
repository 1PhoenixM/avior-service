var http = require('http');

module.exports = {
    identity: 'alterflow',
    
    find: function(req, res){
        
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
        req.write(JSON.stringify(flowData));
        req.end();
    },

    destroy: function(req, res) {
        console.log("DELETED DATA: ")
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
            resp.send(chunk);
          });
        });
        req.write(JSON.stringify(flowData));
        req.end();
    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    }
}