var toClient = require('../../toClient.js');
var http = require('http');

var FROM_OFP = {
	// name-in-models: name-in-opendaylight
	MAC_Address: 'dataLayerAddress',
	IP_Address: 'networkAddress',
	VLAN_ID: 'vlan',
	DPID: 'nodeId',
	Port: 'nodeConnectorId',
};

var TO_OFP = {
	// name-in-opendaylight: name-in-models
	dataLayerAddress: 'MAC_Address',
	networkAddress: 'IP_Address',
	vlan: 'VLAN_ID',
	nodeId: 'DPID',
	nodeConnectorId: 'Port',
    hostConfig: '',
};

// Creates a function that, when called, will make a REST API call
var restCall = function(apiMethod,apiPath){
        //var self = this;
        return function(options,cb){
                if (options.args){
                        for (arg in options.args){
                                apiPath = apiPath.replace(':containerName:', options.args[arg]);
                        }
                }
                opts = {method:apiMethod,hostname:'localhost',port:8080,path:apiPath,auth:'admin:admin'}; //TODO: mask auth
                req = http.request(opts, toClient(this,cb));
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                }
                req.end();
        }
};

module.exports = {
	identity: 'opendaylight',

        registerConnection: function (conn, coll, cb) {
                if (!conn.port) { conn.port = 8080; }
                if (!conn.method) { conn.method = 'GET'; }
                cb();
        },

        find: function (conn, coll, options, cb) {
                switch (coll){
                case 'host': return this.getHosts({args:'default'},cb);
		        default: return cb();
                }
        },

        getHosts: restCall('GET','/controller/nb/v2/hosttracker/default/hosts/active'),

        normalize: function (obj) {
                var normalizedField;
                var normalizedObj;
                if (!obj){ return 'null'; }
		if (obj.constructor === Array) {
			normalizedObj = [];
			for (i in obj) {
				normalizedObj.push(this.normalize(obj[i]))
			}
		} else if (obj.constructor === String || obj.constructor === Number) {
			normalizedObj = obj;
		} else {
			normalizedObj = {};
			for (fromField in TO_OFP) {
				if (obj[fromField]) {
		 	        	toField = TO_OFP[fromField];
	                        	normalizedObj[toField] = this.normalize(obj[fromField]); //Nested structs? Probably handled recursively
				}
			}
			/* NOT CURRENTLY USED - REVERTED BACK TO TO_OFP APPROACH
			for (toField in FROM_OFP) {
                	        fromField = FROM_OFP[toField];
				if (obj[fromField]) {
	                        	normalizedObj[toField] = this.normalize(obj[fromField]); //Nested structs? Probably handled recursively
				}
			}*/
                }
                return normalizedObj;
        },

}

