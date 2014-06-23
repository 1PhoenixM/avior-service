var http = require('http');
var toClient = require('../../../toClient.js');

module.exports = function(apiMethod,apiPath){
	//var self = this;
	return function(options){
		if (options.args){
			for (arg in options.args){
				apiPath = apiPath.replace('/:[A-Za-z]+:/', options.args[arg]);
			}
		}
		opts = {method:apiMethod,hostname:this.hostname,port:8080,path:apiPath};
		req = http.request(opts, toClient(this));
		if (options.data) {
			req.write(JSON.stringify(options.data));
		  }
		  req.end();
    }
};