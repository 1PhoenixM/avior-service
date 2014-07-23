var toClient = require('../../toClient.js');
var http = require('http');

/*var FROM_OFP = {
	// name-in-models: name-in-floodlight
	//Hosts Information    
    MAC_Address: 'mac',
	IP_Address: 'ipv4',
	VLAN_ID: 'vlan',
	Attached_To: 'attachmentPoint',
	DPID: 'switchDPID',
	Port: 'port',
    IdleTimeout: 'idleTimeout', 
    HardTimeout: 'hardTimeout',
    TableID: 'tableId',
    DurationSeconds:'durationSeconds', 
    DurationNanoSeconds:'durationNanoseconds',
    PacketCount:'packetCount',
    ByteCount:'byteCount',
	Last_Seen: 'lastSeen',
    //Uptime Information
    Uptime_msec: 'systemUptimeMsec',
    //Switch Description Information(Shortened to Desc in files)
    Manufacturer:'manufacturerDescription',
    Hardware:'hardwareDescription',
    Software:'softwareDescription',
    SerialNum:'serialNumber',
    //Switch Port information
    PortNum: "portNumber",
    RXPackets: "receivePackets",
    TXPackets: "transmitPackets",
    RXBytes: "receiveBytes",
    TXBytes:"transmitBytes",
    RXErrors: "receiveErrors",
    TXErrors: "transmitErrors",
    RXFrameErr: "receiveFrameErrors",
    RXOverrunErr: "receiveOverrunErrors",
    RXCrcErr: "receiveCRCErrors",
    Collisions: "collisions",
    //Switch Port Information
    //I assume that this will use PortNum from switch features above
    PortName: "name",
    //Keep in mind that it seems that a state of 512 means that the port is up and a state of 513 means that the port is down
    PortState: "state",
    TotalMemory: "total",
    FreeMemory: "free",
    Health: "healthy"
    
};*/

var TO_OFP = {
	// name-in-floodlight: name-in-models
	//Hosts Information
    Stats: 'Stats',
    DPID: 'DPID',
    mac: 'MAC_Address',
	ipv4: 'IP_Address',
	vlan: 'VLAN_ID',
	attachmentPoint: 'Attached_To',
	switchDPID: 'DPID',
	port: 'Port',
    idleTimeout: 'IdleTimeout', 
    hardTimeout: 'HardTimeout',
    tableId: 'TableID',
    durationSeconds:'DurationSeconds', 
    durationNanoseconds:'DurationNanoSeconds',
    packetCount:'PacketCount',
    byteCount:'ByteCount',
    flowCount:'FlowCount',
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
    receiveErrors: "RXErrors",
    transmitErrors: "TXErrors",
    receiveFrameErrors: "RXFrameErr",
    receiveOverrunErrors: "RXOverrunErr",
    receiveCRCErrors: "RXCrcErr",
    collisions: "Collisions",
    //Switch Port Information
    //I assume that this will use PortNum from switch features above
    name: "PortName",
    //Keep in mind that it seems that a state of 512 means that the port is up and a state of 513 means that the port is down
    state: "PortState",
    currentFeatures: "CurrentFeatures",
    advertisedFeatures: "AdvertisedFeatures",
    supportedFeatures: "SupportedFeatures",
    peerFeatures: "PeerFeatures",
    config: "Config",
    hardwareAddress: "HardwareAddress",
    //TableStats
    activeCount: "ActiveCount",
    wildcards: "Wildcards",
    tableId: "TableID",
    maximumEntries: "MaxEntries",
    lookupCount: "LookupCount",
    matchedCount: "MatchedCount",
    //name: "Name",
    //Topology
    "src-switch": "SourceDPID",
    "src-port": "SourcePortNum",
    "src-port-state": "SourcePortState",
    "dst-switch": "DestinationDPID",
    "dst-port": "DestinationPortNum",
    "dst-port-state": "DestinationPortState",
    total: "TotalMemory",
    free: "FreeMemory",
    healthy: "Health",
    type: "Type",
    //SwitchFeatures
    connectedSince: "Connected_Since",
    actions: "Actions",
    buffers: "Buffers",
    capabilities: "Capabilities",
    datapathId: "Datapath",
    ports: "Ports",
    dpid: "DPID",
    healthy: "Healthy",
    //type: "LinkType",
    total: "TotalMemory",
    free: "FreeMemory",
    healthy: "Health",
    //Match Criteria
    match: "Match",
    dataLayerDestination: "DataLayerDestination",
    dataLayerSource: "DataLayerSource",
    dataLayerType: "DataLayerType",
    dataLayerVirtualLan: "DataLayerVLAN",
    dataLayerVirtualLanPriorityCodePoint: "DataLayerVLAN_PCP",
    inputPort: "InputPort",
    networkDestination: "NetworkDestination",
    networkDestinationMaskLen: "NetworkDestinationMaskLen",
    networkProtocol: "NetworkProtocol",
    networkSource: "NetworkSource",
    networkSourceMaskLen: "NetworkSourceMaskLen",
    networkTypeOfService: "NetworkTOS",
    transportDestination: "TransportDestination",
    transportSource: "TransportSource",
    wildcards: "Wildcards",
    //Ports
    Ports: 'Ports',
    //Flows
    Link: 'Link',
    bufferId: 'BufferID',
    cookie: 'Cookie',
    idleTimeout: 'IdleTimeout',
    hardTimeout: 'HardTimeout',
    //command: 
    outPort: 'OutPort',
    actions: 'Actions',
    port: 'PortNum',
    priority: 'Priority',
    flags: 'Flags',
    Flow: "Flow",
    Flows: "Flows",
    result: "Result",
    status: "Status",
    details: "Details",
    Name: "Name",
    /*loaded: "Loaded",
    provides: "Provides",
    depends: "Depends"*/ 
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
                req = http.request(opts, toClient(this,options.call,cb));
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                        console.log(req.body);
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
                //core        
                case 'flow': return this.getFlows({args:['all'],call:coll},cb);
                        break;
                case 'switchports': return this.getSwitchPorts({args:['all'],call:coll},cb);
                        break;
                case 'tablestats': return this.getTableStats({args:['all'],call:coll},cb);
                        break;
                case 'topology': return this.getTopologyLinks({args:['all'],call:coll},cb);
                        break;
                case 'host': return this.getHosts({call:coll},cb);
                        break;
                case 'switchfeatures': return this.getSwitchFeatures({args:['all'],call:coll},cb);
                        break;
                case 'flowstats': return this.getFlowStats({args:['all'],call:coll},cb);
                        break;
                case 'switchdesc': return this.getSwitchDesc({args:['all'],call:coll},cb);
                        break;
                case 'queue': return this.getQueueStats({args:['all'],call:coll},cb);
                        break;
                case 'aggregate': return this.getAggregateStats({args:['all'],call:coll},cb);
                        break;
                case 'switch': return this.getSwitches({args:['all'],call:coll},cb);
                        break;
                        
                
                //fl only
                case 'uptime': return this.getUptime({args:['all'],call:coll},cb);
                        break;
                case 'memory': return this.getMemory({args:['all'],call:coll},cb);
                        break;
                case 'health': return this.getHealth({args:['all'],call:coll},cb);
                        break;
                case 'topologyclusters':return this.getTopologyClusters({args:['all'],call:coll},cb);
                        break;
                case 'topologyexternallinks':return this.getTopologyExternalLinks({args:['all'],call:coll},cb);
                        break;
                case 'firewallstatus':return this.getFirewallStatus({args:[],call:coll},cb);
                        break;
                case 'disablefirewall':return this.disableFirewall({args:[],call:coll},cb);
                         break;
                case 'enablefirewall':return this.enableFirewall({args:[],call:coll},cb);
                         break;
                case 'getFirewallStorageRules':return this.getFirewallStorageRules({args:['all'],call:coll},cb);
                         break;
                case 'getFirewallSubnetMask':return this.getFirewallSubnetMask({args:['all'],call:coll},cb);
                         break;
                case 'firewallrules':return this.getFirewallRules({args:['all'],call:coll},cb); 
                         break;
                case 'clearflows':return this.clearFlows({args:['all'],call:coll},cb);
                         break;
                case 'modules':return this.getModules({args:[],call:coll},cb);
                         break;
               
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
                        break;
                //case 'clearflows':return this.clearFlows({args:['all']},cb);
                        //break;
		        default: return cb();
                }
        },
    
        normalize: function (obj) {
                var normalizedField;
                var normalizedObj;
                if (!obj){ return 0; } //to fix: this applies to both "null" and "0" responses.
		        if (obj.constructor === Array) {
			         normalizedObj = [];
			         for (i in obj) {
				        normalizedObj.push(this.normalize(obj[i]))
			         }
		        } else if (obj.constructor === String || obj.constructor === Number || obj.constructor === Boolean || obj === 0) {
                        normalizedObj = obj;
		        } else {
			         normalizedObj = {};
			         for (fromField in TO_OFP) {
				        if (obj[fromField] || obj[fromField] === 0) { //added so that "0" responses are not discarded
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
    
        dpidParse: function (current, obj) {
            /*if(current === 'switchports' || current === 'queue' || current === 'flowstats' || current === 'aggregate' || current === 'switchdesc' || current === 'tablestats'                 || current === 'switchfeatures' || current === 'flow')*/
                
                arr = [];
                    
                if(current === 'switchports'){   
                for (dpid in obj){
                        innerObj = {};
                        Ports = [];
                        innerObj.DPID = dpid;
                        //innerObj.Ports = Ports;
                        //arr.push(innerObj);
                        innerArr = obj[dpid];
                    
                        if(innerArr.constructor === Array && innerArr.length > 1){
                            for (i=0;i<innerArr.length;i++){
                            ob = innerArr[i]; //TODO: Iterate
                            portObj = {};
                            for (key in ob){
                                portObj[key] = ob[key];
                                }
                            Ports.push(portObj);
                            innerObj.Ports = Ports;
                            }
                        }
                    
                        arr.push(innerObj);
                    }
                      return arr;
                }
            
                else if(current === 'switchdesc' || current === 'aggregate'){
                    for (dpid in obj){
                        innerObj = {};
                        innerObj.DPID = dpid;
                        Desc = obj[dpid];
                        Desc = Desc[0];
                        for (key in Desc){
                            innerObj[key] = Desc[key];
                        }
                        arr.push(innerObj);
                    }
                    return arr;
                }
            
             else if(current === 'switchfeatures'){
                 for (dpid in obj){
                        innerObj = {};
                        innerObj.DPID = dpid;
                        Features = obj[dpid];
                        for (key in Features){
                            innerObj[key] = Features[key];
                        }
                        arr.push(innerObj);
                    }
                    return arr;
             }
            
            /*else if(current === 'flow'){
                for (dpid in obj){
                innerObj = {};
                innerObj.DPID = dpid;
                Flows = [];
                flows = obj[dpid];
                  for (link in flows){
                    flowObj = {};
                    flowObj.Link = link;
                      for(key in flows[link]){
                        flowObj[key] = flows[link][key];
                      }
                    Flows.push(flowObj);
                  }
                 arr.push(innerObj);    
                }
                return arr;
            }*/

            else if(current === 'flow'){
                 for (dpid in obj){
                     innerObj = {};
                     Flows = [];
                     innerObj.DPID = dpid;
                     Features = obj[dpid];
                     
                     for (flow in Features){
                        flowObj = {};
                        flowObj.Flow = flow;
                        Features = obj[dpid][flow];
                         
                        for (key in Features){
                            flowObj[key] = Features[key];
                        }
                        Flows.push(flowObj);
                     }
                     innerObj.Flows = Flows;
                     arr.push(innerObj);
                    }
                    return arr;
             }
            
             else if(current === 'flowstats'){   
                for (dpid in obj){
                        innerObj = {};
                        Flows = [];
                        innerObj.DPID = dpid;
                        //innerObj.Ports = Ports;
                        //arr.push(innerObj);
                        innerArr = obj[dpid];
                    
                        if(innerArr.constructor === Array && innerArr.length >= 1){
                            for (i=0;i<innerArr.length;i++){
                            ob = innerArr[i]; //TODO: Iterate
                            flowObj = {};
                            for (key in ob){
                                flowObj[key] = ob[key];
                                }
                            Flows.push(flowObj);
                            innerObj.Flows = Flows;
                            }
                        }
                        arr.push(innerObj);
                    }
                      return arr;
                }
            else if(current === 'modules'){
                for (Name in obj){
                    innerObj = {};
                    innerObj.Name = Name;
                    Features = obj[Name];
                        for (key in Features){
                            innerObj[key] = Features[key];
                        }
                        arr.push(innerObj);
                    }
                    return arr;
                }
            else{
                return obj;
            }
        
        },
  
    getSwitchDesc: restCall('GET','/wm/core/switch/:arg:/desc/json'),    //"all" returns switch dpid objects
    getSwitchFeatures: restCall('GET','/wm/core/switch/:arg:/features/json'),   //"all" returns switch dpid objects
    getSwitchPorts: restCall('GET','/wm/core/switch/:arg:/port/json'), //"all" returns switch dpid objects
	getQueueStats: restCall('GET', '/wm/core/switch/:arg:/queue/json'), //"all" returns switch dpid objects
	getFlowStats: restCall('GET','/wm/core/switch/:arg:/flow/json'), //"all" returns switch dpid objects
	getAggregateStats: restCall('GET','/wm/core/switch/:arg:/aggregate/json'),  //"all" returns switch dpid objects
	getTableStats: restCall('GET','/wm/core/switch/:arg:/table/json'),  //"all" returns switch dpid objects
	getCounters: restCall('GET','/wm/core/counter/:arg:/:arg:/json'), //an object with dynamic counter titles as property names
    getTopologyClusters: restCall('GET','/wm/topology/switchclusters/json'), //an object with switch dpids as property names
    getFlows: restCall('GET','/wm/staticflowentrypusher/list/:arg:/json'),  //an object with switch dpids as property names
    
    getSwitches: restCall('GET','/wm/core/controller/switches/json'), //array of unnamed Switch objects
    getSummary: restCall('GET','/wm/core/controller/summary/json'), //one unnamed Controller object  
    getHosts: restCall('GET','/wm/device/'), //array of unnamed Host objects
    getTopologyLinks: restCall('GET','/wm/topology/links/json'), //an array of unnamed objects, each with a Topology link
   
    getUptime: restCall('GET','/wm/core/system/uptime/json'), //one unnamed object containing uptime
    getMemory: restCall('GET','/wm/core/memory/json'), //an unnamed object with memory
    getHealth: restCall('GET','/wm/core/health/json'), //an unnamed object with health
    getFirewallStatus: restCall('GET','/wm/firewall/module/status/json'), //single object with status
    enableFirewall: restCall('GET','/wm/firewall/module/enable/json'), //single object with success/failure
    disableFirewall: restCall('GET','/wm/firewall/module/disable/json'), //single object with success/failure
    
    getTopologyExternalLinks: restCall('GET','/wm/topology/external-links/json'), //unknown
    getFirewallStorageRules: restCall('GET','/wm/firewall/module/storageRules/json'), //unknown
    getFirewallRules: restCall('GET','/wm/firewall/rules/json'), //unknown
    clearFlows: restCall('GET','/wm/staticflowentrypusher/clear/:arg:/json'), //unknown
    
    postFlow: restCall('POST','/wm/staticflowentrypusher/json'),
    delFlow: restCall('DELETE','/wm/staticflowentrypusher/json'),
    postFirewallRule: restCall('POST','/wm/firewall/rules/json'),
    deleteFirewallRule: restCall('DELETE','/wm/firewall/rules/json'),
    
    
	//////////////// PLACEHOLDER FOR VIRTUAL NETWORK CALLS
    //Firewall is unused for now
    
    getFirewallSubnetMask: restCall('GET','/wm/firewall/module/subnet-mask/json'), //not an object, just a subnet.
    getModules: restCall('GET','/wm/core/module/loaded/json'),

}