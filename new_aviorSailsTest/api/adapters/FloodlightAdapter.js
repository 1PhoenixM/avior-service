var toClient = require('../../toClient.js');
var http = require('http');

var FROM_OFP = {
	// name-in-models: name-in-floodlight
	//Hosts Information    
    MAC_Address: 'mac',
	IP_Address: 'ipv4',
	VLAN_ID: 'vlan',
	Attached_To: 'attachmentPoint',
	DPID: 'switchDPID',
	Port: 'port',
	Last_Seen: 'lastSeen',
    //Uptime Information
    Uptime_msec: 'systemUptimeMsec',
    //Switch Description Information(Shortened to Desc in files)
    Manufacturer:'manufacturerDescription',
    Hardware:'hardwareDescription',
    Software:'softwareDescription',
    SerialNum:'serialNumber',
    //Switch Features information
    PortNum: "portNumber",
    RXPackets: "receivePackets",
    TXPackets: "transmitPackets",
    RXBytes: "receiveBytes",
    TXBytes:"transmitBytes",
    DroppedPackets: "receiveDropped",
    //Switch Port Information
    //I assume that this will use PortNum from switch features above
    PortName: "name",
    //Keep in mind that it seems that a state of 512 means that the port is up and a state of 513 means that the port is down
    PortState: "state",
    
};

var TO_OFP = {
	// name-in-floodlight: name-in-models
	//Hosts Information
    mac: 'MAC_Address',
	ipv4: 'IP_Address',
	vlan: 'VLAN_ID',
	attachmentPoint: 'Attached_To',
	switchDPID: 'DPID',
	port: 'Port',
	lastSeen: 'Last_Seen',
    //Uptime Information
    systemUptimeMsec: 'Uptime_msec',
    //Switch Description Information(Shortened to Desc in files)
    manufacturerDescription:'Manufacturer',
    hardwareDescription:'Hardware',
    softwareDescription:'Software',
    serialNumber:'SerialNum',
    //Switch Features information
    portNumber: "PortNum",
    receivePackets: "RXPackets",
    transmitPackets: "TXPackets",
    receiveBytes: "RXBytes",
    transmitBytes:"TXBytes",
    receiveDropped: "DroppedPackets",
    //Switch Port Information
    //I assume that this will use PortNum from switch features above
    name: "PortName",
    //Keep in mind that it seems that a state of 512 means that the port is up and a state of 513 means that the port is down
    state: "PortState",
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
                        break;
                case 'uptime': return this.getUptime({},cb);
                        break;
                case 'switchdesc': return this.getSwitchDesc({args:['all']},cb);
                        break;
                case 'switchfeatures': return this.getSwitchFeatures({args:['all']},cb);
                        break;
                case 'switchports': return this.getSwitchPorts({args:['all']},cb);
                        break;
                case 'queue': return this.getQueueStats({args:['all']},cb);
                        break;
                case 'flow': return this.getFlowStats({args:['all']},cb);
                        break;
                case 'aggregate': return this.getAggregateStats({args:['all']},cb);
                        break;
                case 'table': return this.getTableStats({args:['all']},cb);
                        break;
                case 'switch': return this.getSwitches({args:['all']},cb);
                        break;
                case 'topology': return this.getTopologyLinks({args:['all']},cb);
                        break;
                case 'memory': return this.getMemory({args:['all']},cb);
                        break;
                case 'health': return this.getHealth({args:['all']},cb);
                        break;
                case 'topologyclusters':return this..getTopologyClusters({args:['all']},cb);
                        break;
                case 'topologyexternallinks':return this.getTopologyExternalLinks({args:['all']},cb);
                        break;
                case 'postflow':return this.postFlow({args:['all']},cb);
                        break;
                case 'delflow': return this.delFlow({args:['all']},cb);
                        break;
                case 'getflows': return this.getFlows({args:['all']},cb);
                        break;
                case 'clearflows':return this.clearFlows({args:['all']},cb);
                        break;
                case 'getFirewallStatus':return this.getFirewallStatus({args:['all']},cb); 

                case 'enableFirewall':return this.enableFirewall({args:['all']},cb); 

                case 'disableFirewall':return this.disableFirewall({args:['all']},cb); 

                case 'getFirewallStorageRules':return this.getFirewallStorageRules({args:['all']},cb);

                case 'getFirewallSubnetMask':return this.getFirewallSubnetMask({args:['all']},cb);

                case 'getFirewallRules':return this.getFirewallRules({args:['all']},cb); 

                case 'postFirewallRule':return this.postFirewallRule({args:['all']},cb); 

                case 'deleteFirewallRule':return this.deleteFirewallRule({args:['all']},cb);
		        default: return cb();
                        break;
                }
        },
    
        
        create: function (conn, coll, options, cb) {
                switch (coll){
                case 'flow': return this.postFlow({data:{}},cb);
		        default: return cb();
                }
        },
    
        update: function (conn, coll, options, cb) {
                switch (coll){
		        default: return cb();
                }
        },
    
        destroy: function (conn, coll, options, cb) {
                switch (coll){
                case 'flow': return this.delFlow({data:{}},cb);
		        default: return cb();
                }
        },

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
    
        dpidCheck: function (obj) {
            for (field in obj){
             if (field === '/[A-Za-z0-9]+:[A-Za-z0-9]+:[A-Za-z0-9]+:[A-Za-z0-9]+:[A-Za-z0-9]+:[A-Za-z0-9]+:[A-Za-z0-9]+:[A-Za-z0-9]+:[A-Za-z0-9]+:/'){
                obj = obj[field];
             }
            }
            this.normalize(obj);
        },
    
        getHosts: restCall('GET','/wm/device/'),
    
        getUptime: restCall('GET','/wm/core/system/uptime/json'),
    
        getSwitchDesc: restCall('GET','/wm/core/switch/:arg:/desc/json'),    
    
        getSwitchFeatures: restCall('GET','/wm/core/switch/:arg:/features/json'),
    
        getSwitchPorts: restCall('GET','/wm/core/switch/:arg:/ports/json'),
    
        //arg is 'all' or a dpid
    
        getQueueStats: restCall('GET', '/wm/core/switch/:arg:/queue/json'),

        getFlowStats: restCall('GET','/wm/core/switch/:arg:/flow/json'),

        getAggregateStats: restCall('GET','/wm/core/switch/:arg:/aggregate/json'),

        getTableStats: restCall('GET','/wm/core/switch/:arg:/table/json'),

        getSwitches: restCall('GET','/wm/core/controller/switches/json'),

        getSummary: restCall('GET','/wm/core/controller/summary/json'),

        getCounters: restCall('GET','/wm/core/counter/:arg:/:arg:/json'),

        //I want to consolidate these into getSummary for Avior routes
        getMemory: restCall('GET','/wm/core/memory/json'),
        getHealth: restCall('GET','/wm/core/health/json'),

        getTopologyLinks: restCall('GET','/wm/topology/links/json'),

        getTopologyClusters: restCall('GET','/wm/topology/switchclusters/json'),

        getTopologyExternalLinks: restCall('GET','/wm/topology/external-links/json'),

        postFlow: restCall('POST','/wm/staticflowentrypusher/json'),

        delFlow: restCall('DELETE','/wm/staticflowentrypusher/json'),

        getFlows: restCall('GET','/wm/staticflowentrypusher/list/:arg:/json'),

        clearFlows: restCall('GET','/wm/staticflowentrypusher/clear/:arg:/json'),

        //////////////// PLACEHOLDER FOR VIRTUAL NETWORK CALLS
        //Firewall is unused for now
        getFirewallStatus: restCall('GET','/wm/firewall/module/status/json'),

        enableFirewall: restCall('GET','/wm/firewall/module/enable/json'),

        disableFirewall: restCall('GET','/wm/firewall/module/disable/json'),

        getFirewallStorageRules: restCall('GET','/wm/firewall/module/storageRules/json'),

        getFirewallSubnetMask: restCall('GET','/wm/firewall/module/subnet-mask/json'),

        getFirewallRules: restCall('GET','/wm/firewall/rules/json'),

        postFirewallRule: restCall('POST','/wm/firewall/rules/json'),

        deleteFirewallRule: restCall('DELETE','/wm/firewall/rules/json'),

}

