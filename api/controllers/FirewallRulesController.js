/**
 * FirewallRulesController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var http = require('http');

module.exports = {
    identity: 'firewallrules',
    
    find: function(req, res){
        
    },
    
    create: function(req, res) {
        console.log("POSTED DATA: ")
        console.log(req.body);
        ruleData = req.body;
        resp = res;
        if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
        opts = {method:'POST',hostname:host,port:8080,path:'/wm/firewall/rules/json'};
        requ = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            resp.send(chunk);
          });
        });
        requ.write(JSON.stringify(ruleData));
        requ.end();
    },

    destroy: function(req, res) {
        console.log("DELETED DATA: ")
        console.log(req.body);
        ruleData = req.body;
        resp = res;
        if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
        opts = {method:'DELETE',hostname:host,port:8080,path:'/wm/firewall/rules/json'};
        requ = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            resp.send(chunk);
          });
        });
        requ.write(JSON.stringify(ruleData));
        requ.end();
    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    }
  
};
