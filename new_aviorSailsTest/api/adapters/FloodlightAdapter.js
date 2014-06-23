var toClient = require('../../toClient.js');
var http = require('http');

var FROM_OFP = {
	// name-in-models: name-in-floodlight
	MAC_Address: 'mac',
	IP_Address: 'ipv4',
	VLAN_ID: 'vlan',
	Attached_To: 'attachmentPoint',
	DPID: 'switchDPID',
	Port: 'port',
	Last_Seen: 'lastSeen',
};

var TO_OFP = {
	// name-in-floodlight: name-in-models
	mac: 'MAC_Address',
	ipv4: 'IP_Address',
	vlan: 'VLAN_ID',
	attachmentPoint: 'Attached_To',
	switchDPID: 'DPID',
	port: 'Port',
	lastSeen: 'Last_Seen',
};

// Creates a function that, when called, will make a REST API call
var restCall = function(apiMethod,apiPath){
        //var self = this;
        return function(options,cb){
                if (options.args){
                        for (arg in options.args){
                                apiPath = apiPath.replace(/:[A-Za-z]+:/, options.args[arg]);
                        }
                }
                opts = {method:apiMethod,hostname:'10.11.17.40',port:8080,path:apiPath};
                req = http.request(opts, toClient(this,cb));
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                }
                req.end();
        }
};

module.exports = {
	identity: 'floodlight',

        registerConnection: function (conn, coll, cb) {
                if (!conn.port) { conn.port = 8080; }
                if (!conn.method) { conn.method = 'GET'; }
                cb();
        },

        find: function (conn, coll, options, cb) {
                switch (coll){
                case 'host': return this.getHosts({},cb);
		default: return cb();
                }
        },

        getHosts: restCall('GET','/wm/device/'),
    
        getPortStats: restCall('GET','/wm/core/switch/:arg:/port/json'),

        getQueueStats: restCall('GET', '/wm/core/switch/:arg:/queue/json'),

        getFlowStats: restCall('GET','/wm/core/switch/:arg:/flow/json'),

        getAggregateStats: restCall('GET','/wm/core/switch/:arg:/aggregate/json'),

        getDescStats: restCall('GET','/wm/core/switch/:arg:/desc/json'),

        getTableStats: restCall('GET','/wm/core/switch/:arg:/table/json'),

        getFeatures: restCall('GET','/wm/core/switch/:arg:/features/json'),

        getSwitches: restCall('GET','/wm/core/controller/switches/json'),

        getSummary: restCall('GET','/wm/core/controller/summary/json'),

        getCounters: restCall('GET','/wm/core/counter/:arg:/:arg:/json'),

        //I want to consolidate these into getSummary for Avior routes
        getMemory: restCall('GET','/wm/core/memory/json'),
        getHealth: restCall('GET','/wm/core/health/json'),
        getUptime: restCall('GET','/wm/core/system/uptime/json'),

        getTopologyLinks: restCall('GET','/wm/topology/links/json'),

        getTopologyClusters: restCall('GET','/wm/topology/switchclusters/json'),

        getTopologyExternalLinks: restCall('GET','/wm/topology/external-links/json'),

        postFlow: restCall('POST','/wm/staticflowentrypusher/json'),

        delFlow: restCall('DELETE','/wm/staticflowentrypusher/json'),

        getFlows: restCall('GET','/wm/staticflowentrypusher/list/:arg:/json'),

        clearFlows: restCall('GET','/wm/staticflowentrypusher/clear/:arg:/json'),

        //////////////// PLACEHOLDER FOR VIRTUAL NETWORK CALLS
        getFirewallStatus: restCall('GET','/wm/firewall/module/status/json'),

        enableFirewall: restCall('GET','/wm/firewall/module/enable/json'),

        disableFirewall: restCall('GET','/wm/firewall/module/disable/json'),

        getFirewallStorageRules: restCall('GET','/wm/firewall/module/storageRules/json'),

        getFirewallSubnetMask: restCall('GET','/wm/firewall/module/subnet-mask/json'),

        getFirewallRules: restCall('GET','/wm/firewall/rules/json'),

        postFirewallRule: restCall('POST','/wm/firewall/rules/json'),

        deleteFirewallRule: restCall('DELETE','/wm/firewall/rules/json'),

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

