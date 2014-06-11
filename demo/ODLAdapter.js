//TODO: iterate on multiple switches. using #2 as a tester. what if multiple flows or matches or actions?
//TODO: consider readable column names as properties
//TODO: what to do with attributes that are not openflow, but floodlight? i.e. masklens. or odl/fl exclusive?
//TODO: Are APIs completely covered? v1?
//TODO: ClearFlows is a get, change firewall status is a get...
//Accessing structs: reset normalize, then call this.normalize i.e. for flow and match nested structs. This allows
//for more reuse.
//ADAPTERS
var http = require('http');
var OFP = require('./ofp.js'); //v1.0.0
var toClient = require('./controller.js');
 
/* NOTE Only fields that differ are included below */
var TO_OFP = {
	//incomplete
};

/* Creates a function that, when called, will make a REST API call */
var restCall = function(apiMethod,apiPath){
	//var self = this;
	return function(options){
		if (options.args){
			for (arg in options.args){
				apiPath = apiPath.replace(':arg:', options.args[arg]);
			}
		}
		opts = {method:apiMethod,hostname:this.hostname,port:8080,path:apiPath,auth:'admin:admin'}; //TODO: ODL auth protection
		req = http.request(opts, toClient(this));
		if (options.data) {
			req.write(JSON.stringify(options.data));
		}
		req.end();
	}
};

module.exports = {
//	hostname: 'localhost',
  //http://tobyho.com/2011/01/28/checking-types-in-javascript/
    //TODO: Why is a number printed with the JSON?
	normalize: function (obj) {
		var normalizedField;
		var normalizedObj = {};
		if (obj instanceof String || obj.constructor === Number) { return obj; } //TODO: Other possible types? This finds and returns the data, not an object
		for (field in obj) {
			if (TO_OFP[field]) {
				normalizedField = TO_OFP[field];
                console.log(normalizedField);
			} else {
				normalizedField = field;
			}
			normalizedObj[normalizedField] = this.normalize(obj[field]); //Nested structs? Probably handled recursively
		}
		return normalizedObj;
	},
 
	getPortStats: restCall('GET',''),
	getQueueStats: restCall('GET', ''),
	getFlowStats: restCall('GET',''),
	getAggregateStats: restCall('GET',''),
	getDescStats: restCall('GET',''),
	getTableStats: restCall('GET',''),
	getFeatures: restCall('GET',''),
	getSwitches: restCall('GET',''),
	getSummary: restCall('GET',''),
	getCounters: restCall('GET',''),
	// etc.
}