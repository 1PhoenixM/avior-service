var toClient = require('../../toClient.js');
var http = require('http');

// Function calls the REST API depending on the call that is chosen from the find, create, and destroy switch case clauses below.
var restCall = function(apiMethod,apiPath){
        return function(options,cb){
                var rawPath = apiPath;
                if (options.args){ 
                        for (arg in options.args){
                                apiPath = apiPath.replace(/:[A-Za-z]+:/, options.args[arg]);
                        }
                }
                if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
            
                var username = 'admin';
                var password = 'admin';
                var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

                opts = {method:apiMethod,hostname:host,port:8080,path:apiPath, auth:auth}; //TODO: mask auth //auth:'admin:admin'
                opts.headers = {'Host': opts.hostname + ':' + opts.port, 'Authorization': auth, 'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Encoding': 'gzip,deflate,sdch',
                    'Accept-Language':'en-US,en;q=0.8',
                    'Cache-Control':'max-age=0',
                    'Connection':'keep-alive',
                    'Cookie':'',
                    'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'}; //spoofing for now, will fix
            
                if(this.cookie){
                    opts.headers = {'Cookie': this.cookie, 'Authorization': auth, 'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Encoding': 'gzip,deflate,sdch',
                    'Accept-Language':'en-US,en;q=0.8',
                    'Cache-Control':'max-age=0',
                    'Connection':'keep-alive',
                    'Cookie':'',
                    'Host': opts.hostname + ':' + opts.port,
                    'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'};
                    //console.log(this.cookie);
                }
                req = http.request(opts, toClient(this,options.call,options,cb));
                
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                }
                apiPath = rawPath;
                req.end();
        }
};

module.exports = {
    
    TO_OFP:  {
	// name-in-opendaylight: name-in-models
	dataLayerAddress: 'MAC_Address',
	networkAddress: 'IP_Address',
	vlan: 'VLAN_ID',
	nodeId: 'DPID',
	nodeConnectorId: 'Port',
    //ODL includes many object/array labels that FL doesn't, such as the below.
    hostConfig: 'Stats',
    flowStatistics: 'Stats',
    //node: 'AttachedTo',
    flowStatistic: 'Stats',
    flow: 'Stats',
    match: 'Match',
    matchField: 'MatchField',
    type: 'Type', //switch type or match type?
    value: 'Value', //this is used a lot
    actions: 'Actions',
    port: 'Port',
    priority: 'Priority',
    idleTimeout: 'IdleTimeout',
    hardTimeout: 'HardTimeout',
    //id: 'ID', //flow id and dpid are both id.
    tableId: 'TableID',
    durationSeconds: 'DurationSeconds',
    durationNanoseconds: 'DurationNanoSeconds',
    packetCount: 'PacketCount',
    byteCount: 'ByteCount',
    portStatistics: 'Stats',
    portStatistic: 'Stats',
    //nodeConnector: 'Port',
    receivePackets: 'RXPackets',
    transmitPackets: 'TXPackets',
    receiveBytes: 'RXBytes',
    transmitBytes: 'TXBytes',
    receiveDrops: 'RXDrops',
    transmitDrops: 'TXDrops',
    receiveErrors: 'RXErrors',
    transmitErrors: 'TXErrors',
    receiveFrameError: 'RXFrameErr',
    receiveOverRunError: 'RXOverrunErr',
    receiveCrcError: 'RXCrcErr',
    collisionCount: 'Collisions',
    properties: 'Stats',
    tables: 'Tables',
    actions: 'Actions',
    macAddress: 'MAC_Address',
    capabilities: 'Capabilities',
    buffers: 'Buffers',
    tableStatistics: 'Stats',
    tableStatistic: 'Stats',
    activeCount: 'ActiveCount',
    lookupCount: 'LookupCount',
    matchedCount: 'MatchedCount',
    maximumEntries: 'MaxEntries', 
    nodeProperties: '',
    //topology
    edgeProperties: 'Stats',
    edge: 'Stats',
    tailNodeConnector: 'Stats',
    headNodeConnector: 'Stats',
    node: 'Stats',
    id: 'PortNum', //other ids?
    properties: 'Port',
    state: 'State', 
    config: 'Config',
    //timestamp
    //bandwidth
    name: 'PortName',
    // topology modified by nodeparse, not odl
    SourceDPID: 'SourceDPID',
    SourcePortNum: 'SourcePortNum',
    DestinationDPID: 'DestinationDPID',
    DestinationPortNum: 'DestinationPortNum',
    Stats: 'Stats',
    MAC_Address: 'MAC_Address', 
    IP_Address: 'IP_Address',
    VLAN_ID: 'VLAN_ID',
    Attached_To: 'Attached_To',
    DPID: 'DPID',
    PortNum: 'PortNum',
    Actions: 'Actions',
    Buffers: 'Buffers',
    Capabilities: 'Capabilities',
    Connected_Since: 'Connected_Since',
    Ports: 'Ports',
    Flows: 'Flows',
    Manufacturer: 'Manufacturer',
    Software: 'Software',
    Hardware: 'Hardware',
    SerialNum: 'SerialNum',
    PortName: 'PortName',
    PortState: 'PortState',
    CurrentFeatures: 'CurrentFeatures',
    AdvertisedFeatures: 'AdvertisedFeatures',
    SupportedFeatures: 'SupportedFeatures',
    PeerFeatures: 'PeerFeatures',
    Config: 'Config',
    HardwareAddress: 'HardwareAddress',
    
    upTime: 'Uptime_msec',
    Uptime_msec: 'Uptime_msec',
    TotalMemory: 'TotalMemory', //total is mem_free + mem_used & note that this is JVM mem, not just the controller.
    mem_free: 'FreeMemory',
    
    IdleTimeout: 'IdleTimeout', 
    HardTimeout: 'HardTimeout',
    Actions: 'Actions',
    Match: 'Match',
    Cookie: 'Cookie',
    Priority: 'Priority',
    Flow: "Flow",
    Actions: "Actions",
    Buffers: "Buffers",
    Capabilities: "Capabilities",
    Connected_Since: "Connected_Since",
    
    DurationSeconds: 'DurationSeconds',
    DurationNanoSeconds: 'DurationNanoSeconds',
    PacketCount: 'PacketCount',
    ByteCount: 'ByteCount',
    
    Wildcards: "Wildcards",
    DataLayerDestination: "DataLayerDestination",
    DataLayerSource:      "DataLayerSource",
    DataLayerType:      "DataLayerType",
    DataLayerVLAN:      "DataLayerVLAN",
     DataLayerVLAN_PCP:     "DataLayerVLAN_PCP",
     InputPort:     "InputPort",
      NetworkDestination:    "NetworkDestination",
    NetworkDestinationMaskLen:      "NetworkDestinationMaskLen",
      NetworkProtocol:    "NetworkProtocol",
      NetworkSource:    "NetworkSource",
      NetworkSourceMaskLen:    "NetworkSourceMaskLen",
    NetworkTOS:      "NetworkTOS",
      TransportDestination:    "TransportDestination",
      TransportSource:    "TransportSource",
    
    Type: "Type",
    },
    
	identity: 'opendaylight',
    
     drop: function() {
        
        
     },
    
        dpid: '00:00:00:00:00:00:00:0e',
    
    
        cookie: '',
    
    
        cookieGet: false, //keeps resetting to false here

        registerConnection: function (conn, coll, cb) {
                if (!conn.port) { conn.port = 8080; }
                if (!conn.method) { conn.method = 'GET'; }
                cb();
        },
    
        teardown: function(connectionName, cb) {
          if(!sails.config.connections[connectionName]) return cb();
          delete sails.config.connections[connectionName];
          cb();
        },

        find: function (conn, coll, options, cb) {
            switch (coll){
                
                //fake calls for front-end
                case 'uptime': return this.getControllerData({args:['default'],call:coll},cb);
                        break;    
                case 'health': return 'health';
                        break;    
                //case 'memory': return 'memory';
                        //break;
                case 'memory': return this.getControllerData({args:['default'],call:coll},cb);
                        break;
                case 'modules': return this.getModules({args:['default'],call:coll},cb);
                        break;
                //core
                case 'port': return this.getNodeConnectors({args:['default', 'OF', '00:00:00:00:00:00:00:0e'],call:coll},cb); //for now
                       break;
                case 'flow': return this.getFlowStats({args:['default'],call:coll},cb);
                        break;
                case 'switchports': return this.getPortStats({args:['default'],call:coll},cb);
                         break;
                case 'table': return this.getTableStats({args:['default'],call:coll},cb);
                         break;
                case 'topology': return this.getTopology({args:['default'],call:coll},cb);
                         break;
                case 'topologylinks': return this.getTopologyLinks({args:['default'],call:coll},cb);
                         break;
                case 'host': return this.getHosts({args:['default'],call:coll},cb);
                         break;
                case 'alterflow': if(options.action){ 
                                return this.getFlows({args:['default'],call:coll,action:options.action},cb);
                                }
                                else{
                                return this.getFlows({args:['default'],call:coll},cb);    
                                }
                         break;
                case 'switch': return this.getNodes({args:['default'],call:coll},cb);
                         break;
                case 'flowspec': return this.getFlowSpecs({args:['default'],call:coll},cb);
                         break;
                        
                //case 'switchfeatures': this.find(conn, 'switch', options, cb); //close to the same call, but fix later. //this recursion may be causing socket issues?
                  //       break;
                case 'flowstats': this.find(conn, 'flow', options, cb);
                         break;
                //case 'flows': return this.find(conn, 'flow', options, cb);
                         //break;
                        
                case 'switchdesc': return this.getNodes({args:['default'],call:coll},cb);
                        //return this.getSwitchDesc({args:[this.dpid],call:coll},cb); //what if no dpid provided? //this does not allow auth unless you're in the browser...
                        //maybe it's not an allowed call because not part of rest api
                        break;
                        
                //odl only        
                case 'staticroute': return this.getStaticRoutes({args:['default'],call:coll},cb);
                         break;
                case 'subnet': return this.getSubnets({args:['default'],call:coll},cb);
                         break;
                case 'flowspec': return this.getFlowSpecs({args:['default'],call:coll},cb);
                         break;
                case 'container': return this.getContainers({args:['default'],call:coll},cb);
                         break;
                case 'nodecluster': return this.getNodeCluster({args:['default'],call:coll},cb);
                         break;
		        default: this.pluginFind(conn, coll, options, cb); //return this.get + coll + ({args:['default'],call:coll},cb); //for plugin routes
                        break;
                }
        },
    
        pluginFind: function(conn, coll, options, cb){
            return cb();
        },
    
        create: function (conn, coll, options, cb) {
                switch (coll){
                case 'flow': 
                        console.log(" odl POSTED DATA: " + JSON.stringify(options.data) + '\n');
                        unparsed = options.data;
                        flowData = {};
                        flowData.node = {};
                        flowData.node.id = unparsed.switch;
                        flowData.node.type = 'OF';
                        flowData.name = unparsed.name;
                        flowData.ingressPort = unparsed["ingress-port"];
                        flowData.actions = [];
                        flowData.actions.push(unparsed.actions.toUpperCase());
                        
                        string = JSON.stringify(flowData);
                        parsed = JSON.parse(string);
                        parsed.switch = flowData.node.id;
                        
                        resp = options.response;
                        if(sails.controllers.main.hostname){
                                  var host = sails.controllers.main.hostname;
                                }
                        var username = 'admin';
                        var password = 'admin';
                        var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
                        var opts = {method:'PUT',hostname:host,port:8080,path:'/controller/nb/v2/flowprogrammer/default/node/OF/' + unparsed.switch +  '/staticFlow/' + unparsed.name +'',auth:auth};
                        console.log(opts.path);
                        opts.headers = {'Host': opts.hostname + ':' + opts.port, 'Authorization': auth, 'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                            'Accept-Encoding': 'gzip,deflate,sdch',
                            'Accept-Language':'en-US,en;q=0.8',
                            'Cache-Control':'max-age=0',
                            'Connection':'keep-alive',
                            'Content-type':'application/json', //necessary
                            'Cookie':'',
                            'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'};
                        var requ = http.request(opts,  function(res) {
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
                        break;
		        default: return this.pluginCreate(conn, coll, options, cb);
                }
        },
    
        pluginCreate: function(conn, coll, options, cb){
            return cb();
        },
    
        update: function (conn, coll, options, cb) {
                switch (coll){
                
		        default: return this.pluginUpdate(conn, coll, options, cb);
                }
        },
    
        pluginUpdate: function(conn, coll, options, cb){
            return cb();
        },
    
        destroy: function (conn, coll, options, cb) {
                switch (coll){
                case 'flow': 
                        console.log("DELETED DATA: " + options.data + '\n')
                        flowData = options.data;
                        var realData;
                        for (realData in flowData){
                            break;
                        }
                        console.log(realData);
                        var parsed = JSON.parse(realData);
                        
                        resp = options.response;
                        if(sails.controllers.main.hostname){
                                  var host = sails.controllers.main.hostname;
                                }
                        var opts = {method:'DELETE',hostname:host,port:8080,path:'http://localhost:8080/controller/nb/v2/flowprogrammer/default/node/OF/' + parsed.switch +  '/staticFlow/' + parsed.name +'',auth:'admin:admin'};
                        console.log(opts.path);
                        var requ = http.request(opts,  function(res) {
                          console.log('STATUS: ' + res.statusCode);
                          console.log('HEADERS: ' + JSON.stringify(res.headers));
                          res.setEncoding('utf8');
                          res.on('data', function (chunk) {
                            console.log('BODY: ' + chunk);
                            resp.send(chunk);
                          });
                        });
                        
                        //console.log(JSON.stringify(flowData));
                        //requ.write(JSON.stringify(flowData));
                        requ.end();
                        break;
		        default: return this.pluginDestroy(conn, coll, options, cb);
                }
        },
    
     pluginDestroy: function(conn, coll, options, cb){
            return cb();
        },
    
    
    //Statistics API
    getFlowStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/flow'),
            
    getFlowStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/flow/node/:nodeType:/:nodeId:'),
            
    getPortStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/port'),
            
    getPortStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/port/node/:nodeType:/:nodeId:'),
            
    getTableStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/table'), 
            
    getTableStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/table/node/:nodeType:/:nodeId:'), 
    
    
    //Topology API
    getTopology:restCall('GET', '/controller/nb/v2/topology/:containerName:'), 
        
    addTopologyLinks: restCall('PUT', '/controller/nb/v2/topology/:containerName:/userLink/:name:'), 
        
    deleteTopologyLinks: restCall('DELETE', '/controller/nb/v2/topology/:containerName:/userLink/:name:'), 
        
    getTopologyLinks: restCall('GET', '/controller/nb/v2/topology/:containerName:/userLinks'), 
    
    
    //Host API
    getHost: restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
        
    addHost: restCall('PUT', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
            
    deleteHost: restCall('DELETE', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
            
    getHosts: restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/hosts/active'),
   
    getInactiveHosts:restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/hosts/inactive'),
    
       
    //Flow API
    getFlows: restCall('GET', '/controller/nb/v2/flowprogrammer/:containerName:'), 
        
    getFlowsByNode: restCall('GET', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:'), 
            
    getFlow: restCall('GET', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'), 
     
    addFlow: restCall('PUT', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'), 
            
    deleteFlow: restCall('DELETE', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'),
            
    toggleFlow: restCall('POST', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'),
    
    
    //Static Route API        
    getStaticRoute: restCall('GET', '/controller/nb/v2/staticroute/:containerName:/route/:route:'), 
            
    addStaticRoute: restCall('PUT', '/controller/nb/v2/staticroute/:containerName:/route/:route:'), 
         
    deleteStaticRoute: restCall('DELETE', '/controller/nb/v2/staticroute/:containerName:/route/:route:'), 
            
    getStaticRoutes: restCall('GET', '/controller/nb/v2/staticroute/:containerName:/routes'), 
    
    
    //Subnet API
    getSubnet: restCall('GET', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
            
    addSubnet: restCall('PUT', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
            
    deleteSubnet: restCall('DELETE', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
                    
    modSubnet: restCall('POST', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
                    
    getSubnets: restCall('GET', '/controller/nb/v2/subnetservice/:containerName:/subnets'),
    
    
    //Switch API                
    getNodeConnectors: restCall('GET', '/controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:'),
                    
    getNodeProperty: restCall('GET', '/controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:/property/:propertyName:'),
    
    deleteNodeProperty: restCall('DELETE', '/controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:/property/:propertyName:'),
                    
    addNodeProperties: restCall('PUT', ' /controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:/property/:propertyName:/:propertyValue:'), 
                    
    deleteNodeConnectorProperty: restCall('DELETE', '/controller/nb/v2/switchmanager/:containerName:/nodeconnector/:nodeType:/:nodeId:/:nodeConnectorType:/:nodeConnectorId:/property/:propertyName:'), 
                    
    addNodeConnectorProperty: restCall('PUT', '/controller/nb/v2/switchmanager/:containerName:/nodeconnector/:nodeType:/:nodeId:/:nodeConnectorType:/:nodeConnectorId:/property/:propertyName:/:propertyValue:'), 
                    
    getNodes: restCall('GET', '/controller/nb/v2/switchmanager/:containerName:/nodes'), 
                    
    saveNodes: restCall('POST', '/controller/nb/v2/switchmanager/:containerName:/save'), 
    
    
    //User API                
    addUser: restCall('POST', '/controller/nb/v2/usermanager/users'),
                  
    deleteUser: restCall('DELETE', '/controller/nb/v2/usermanager/users/:userName:'), 
    
    
    //Container API
    getContainer: restCall('GET', '/controller/nb/v2/containermanager/container/:container:'), 
    
    createContainer: restCall('PUT', '/controller/nb/v2/containermanager/container/:container:'), 
    
    deleteContainer: restCall('DELETE', '/controller/nb/v2/containermanager/container/:container:'), 
    
    getFlowSpec: restCall('GET', '/controller/nb/v2/containermanager/container/:container:/flowspec/:flowspec:'), 
        
    addFlowSpec: restCall('PUT', '/controller/nb/v2/containermanager/container/:container:/flowspec/:flowspec:'),
                    
    deleteFlowSpec: restCall('DELETE', '/controller/nb/v2/containermanager/container/:container:/flowspec/:flowspec:'), 
                    
    getFlowSpecs: restCall('GET', '/controller/nb/v2/containermanager/container/:container:/flowspecs'),
    
    addNodeConnectors: restCall('PUT', '/controller/nb/v2/containermanager/container/:container:/nodeconnector'),
                    
    removeNodeConnectors: restCall('DELETE', '/controller/nb/v2/containermanager/container/:container:/nodeconnector'), 
    
    getContainers: restCall('GET', '/controller/nb/v2/containermanager/containers'), 
    
    
    //Connection API
    addMgmtConnectionWithoutNodeType: restCall('PUT', '/controller/nb/v2/connectionmanager/node/:nodeId:/address/:ipAddress:/port/:port:'),
                    
    disconnectConnection: restCall('DELETE', '/controller/nb/v2/connectionmanager/node/:nodeType:/:nodeId:'),
        
    addMgmtConnectionWithKnownNodeType: restCall('PUT', '/controller/nb/v2/connectionmanager/node/:nodeType:/:nodeId:/address/:ipAddress:/port/:port:'),
    
    getNodeCluster: restCall('GET', '/controller/nb/v2/connectionmanager/nodes'),
    
    
    //Bridge API   
    createBridge: restCall('POST', '/controller/nb/v2/networkconfig/bridgedomain/bridge/:nodeType:/:nodeId:/:bridgeName:'), 
                    
    deleteBridge: restCall('DELETE', '/controller/nb/v2/networkconfig/bridgedomain/bridge/:nodeType:/:nodeId:/:bridgeName:'), 
                    
    addPortToBridge: restCall('POST', '/controller/nb/v2/networkconfig/bridgedomain/port/:nodeType:/:nodeId:/:bridgeName:/:portName:'), 
                    
    deletePortFromBridge: restCall('DELETE', '/controller/nb/v2/networkconfig/bridgedomain/port/:nodeType:/:nodeId:/:bridgeName:/:portName:'), 
                    
    addPortAndVlanToBridge: restCall('POST', '/controller/nb/v2/networkconfig/bridgedomain/port/:nodeType:/:nodeId:/:bridgeName:/:portName:/:vlan:'), 
    
    
    //Not part of normal Northbound REST APIs
    
    getControllerData: restCall('GET', '/controller/osgi/system/console/vmstat'),
    
    getModules: restCall('GET', '/controller/osgi/system/console/status-Bundlelist'),
    
    getSwitchDesc: restCall('GET', '/controller/web/troubleshoot/nodeInfo?nodeId=OF|:nodeId:'), //unused until toClient
    
    //Left to add: 
    //Neutron: https://jenkins.opendaylight.org/controller/job/controller-merge/lastSuccessfulBuild/artifact/opendaylight/northbound/networkconfiguration/neutron/target/site/wsdocs/index.html
	// etc.

    normalize: function (obj) {
                var normalizedField;
                var normalizedObj;
        if (!obj){ return 0; }
		if (obj.constructor === Array) {
			normalizedObj = [];
			for (i in obj) {
				normalizedObj.push(this.normalize(obj[i]))
			}
		} else if (obj.constructor === String || obj.constructor === Number ||  obj.constructor === Boolean || obj === 0) {
			normalizedObj = obj;
		} else {
			normalizedObj = {};
			for (fromField in this.TO_OFP) {
				if (obj[fromField] || obj[fromField] === 0 || obj[fromField] === "") {
		 	        	toField = this.TO_OFP[fromField];
	                        	normalizedObj[toField] = this.normalize(obj[fromField]);
				}
			}
            }
                return normalizedObj;
    },
    
    
    //This function parses ODL data into the format of the Avior API
    nodeParse: function(current, obj, innerArr) {
    
    switch(current){
            
              case 'uptime':
                //obj.Uptime_msec = obj.upTime;
                var days = obj.upTime.search(" days");
                var actualDays = obj.upTime.slice(0, days);
                var Days_in_msec = parseInt(actualDays) * 86400000;
              
                //trim whitespace?
                //todo: months, years (?)
                var time = obj.upTime.search(" days") + 5;
                time++;
                var actualTime = obj.upTime.slice(time, obj.upTime.length);
                
                var hrs = actualTime.slice(0,2);
                var hrs_in_msec = parseInt(hrs) * 3600000;
                
                var mins = actualTime.slice(3,5);
                var mins_in_msec = parseInt(mins) * 60000;
                   
                var secs = actualTime.slice(6,8);
                var secs_in_msec = parseInt(secs) * 1000; 
                
                var ms = actualTime.slice(9,12);
                var ms = parseInt(ms);
                
                obj.Uptime_msec = Days_in_msec + hrs_in_msec + mins_in_msec + secs_in_msec + ms;
               
                return obj;
                break;
            
              case 'memory':
                obj.TotalMemory = obj.mem_free + obj.mem_used;
                obj.TotalMemory = obj.TotalMemory * 1024;
                obj.mem_free = obj.mem_free * 1024; 
                //supposedly the mem. in odl is in kB. we expect bytes (?).
                return obj;    
                break;
            
              case 'topology':
                arr = [];
                for (var i=0; i<obj.edgeProperties.length; i++){
                    newObj = {};
                    newObj.SourceDPID = obj.edgeProperties[i].edge.tailNodeConnector.node.id;
                    newObj.SourcePortNum = parseInt(obj.edgeProperties[i].edge.tailNodeConnector.id);
                    newObj.DestinationDPID = obj.edgeProperties[i].edge.headNodeConnector.node.id;
                    newObj.DestinationPortNum = parseInt(obj.edgeProperties[i].edge.headNodeConnector.id);
                    //srcPortObj = this.getNodeConnectors({args:['default', 'OF', newObj.SourceDPID],call:'port'},null);
                    //newObj.SourcePortState = srcPortObj.nodeConnectorProperties.properties.state.value;
                    //dstPortObj = this.getNodeConnectors({args:['default', 'OF', newObj.DestinationDPID],call:'port'},null);
                    //newObj.DestinationPortState = dstPortObj.nodeConnectorProperties.properties.state.value;
                    arr.push(newObj);
                }
                normalizerObj = {};
                normalizerObj.Stats = arr;
                return normalizerObj;
                break;
            
            case 'host':
                arr = [];
                //newObj = {};
                for (var i=0; i<obj.hostConfig.length; i++){
                    newObj = {};
                    var MACarr = [];
                    MACarr.push(obj.hostConfig[i].dataLayerAddress);
                    newObj.MAC_Address = MACarr;
                    var IParr = [];
                    IParr.push(obj.hostConfig[i].networkAddress); 
                    newObj.IP_Address = IParr;
                    var VLANarr = [];
                    VLANarr.push(obj.hostConfig[i].vlan);
                    newObj.VLAN_ID = VLANarr;
                    newObj.Attached_To = [];
                    var Attached_To_Obj = {};
                    Attached_To_Obj.DPID = obj.hostConfig[i].nodeId;
                    Attached_To_Obj.PortNum = parseInt(obj.hostConfig[i].nodeConnectorId);
                    newObj.Attached_To.push(Attached_To_Obj);
                    arr.push(newObj);
                    //Missing: LastSeen
                }
                normalizerObj = {};
                normalizerObj.Stats = arr;
                return normalizerObj;
                break;
            
            case 'switch':
                arr = [];
                for (var i=0; i<obj.nodeProperties.length; i++){
                    newObj = {}; //newObj has to be defined within the for loop
                    //console.log(obj.nodeProperties);
                    newObj.Actions = parseInt(obj.nodeProperties[i].properties.supportedFlowActions.value.length); //Correct value?
                    newObj.Buffers = obj.nodeProperties[i].properties.buffers.value;
                    newObj.Capabilities = obj.nodeProperties[i].properties.capabilities.value;
                    newObj.Connected_Since = obj.nodeProperties[i].properties.timeStamp.value;
                    newObj.DPID = obj.nodeProperties[i].node.id;
                    this.getNodeConnectors({args:['default', 'OF', newObj.DPID],call:'port'}, function(a, b){return b;});
                    arr.push(newObj);
                }
                    normalizerObj = {};
                    normalizerObj.Stats = arr;
                    return normalizerObj; //returns without port list, change function order
                break;
            
            case 'port':
                            portsObj = obj;
                            Ports = [];
                            for(var j=0; j<portsObj.nodeConnectorProperties.length; j++){
                            portObj = {};
                            portObj.DPID = portsObj.nodeConnectorProperties[j].nodeconnector.node.id;
                            portObj.PortNum = parseInt(portsObj.nodeConnectorProperties[j].nodeconnector.id);
                            portObj.PortName = portsObj.nodeConnectorProperties[j].properties.name.value;
                            portObj.PortState = portsObj.nodeConnectorProperties[j].properties.state.value;
                            portObj.CurrentFeatures = "N/A";
                            portObj.AdvertisedFeatures = "N/A";
                            portObj.SupportedFeatures = "N/A";
                            portObj.PeerFeatures = "N/A";
                            portObj.Config = portsObj.nodeConnectorProperties[j].properties.config.value;
                            portObj.HardwareAddress = "N/A";
                            Ports.push(portObj);
                            }
                //this.nodeParse('switch', {nodeProperties:[]}, Ports);
                if(innerArr){
                    for(var k=0; k<Ports.length; k++){
                        for(var m=0; m<innerArr.length; m++){
                            if(innerArr[m].DPID === Ports[k].DPID){
                                innerArr[m].Ports = Ports;
                            }
                        }
                    }
                }
                else{
                 return Ports;   
                }
                break;
            
            case 'switchports':
                arr = [];
                for(var i=0; i<obj.portStatistics.length; i++){
                    newObj = {};
                    newObj.DPID = obj.portStatistics[i].node.id;
                    newObj.Ports = [];
                    for(var j=0; j<obj.portStatistics[i].portStatistic.length; j++){
                        portObj = {};
                        portObj.PortNum = parseInt(obj.portStatistics[i].portStatistic[j].nodeConnector.id);
                        for(key in obj.portStatistics[i].portStatistic[j]){
                            portObj[key] = obj.portStatistics[i].portStatistic[j][key];
                        }
                        newObj.Ports.push(portObj);
                    }
                    arr.push(newObj);    
                }
                return arr;
                break;
            
            case 'flow':
                arr = [];
                for(var i=0; i<obj.flowStatistics.length; i++){
                    newObj = {};
                    newObj.DPID = obj.flowStatistics[i].node.id;
                    newObj.Flows = [];
                    for(var j=0; j<obj.flowStatistics[i].flowStatistic.length; j++){
                        flowObj = {};
                        flowObj.DurationSeconds = obj.flowStatistics[i].flowStatistic[j].durationSeconds;
                        flowObj.DurationNanoSeconds = obj.flowStatistics[i].flowStatistic[j].durationNanoseconds;
                        flowObj.PacketCount = obj.flowStatistics[i].flowStatistic[j].packetCount;
                        flowObj.ByteCount = obj.flowStatistics[i].flowStatistic[j].byteCount;
                        flowObj.Match = {};
                        
                        //Match fields not accurate yet. Also, the same flowmatch appears on all switches?
                        for(var k=0; k<obj.flowStatistics[i].flowStatistic[j].flow.match.matchField.length; k++){
                            flowObj.Match.Wildcards = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "WILDCARDS" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.DataLayerDestination = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "DL_DST" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.DataLayerSource = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "DL_SRC" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.DataLayerType = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "DL_TYPE" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.DataLayerVLAN = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "DL_VLAN" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.DataLayerVLAN_PCP = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "DL_VLAN_PR" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.InputPort = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "IN_PORT" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.NetworkDestination = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "NW_DST" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.NetworkDestinationMaskLen = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "NW_DST_MASK" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.NetworkProtocol = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "NW_PROTOCOL" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.NetworkSource = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "NW_SRC" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.NetworkSourceMaskLen = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "NW_SRC_MASK" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.NetworkTOS = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "NW_TOS" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.TransportDestination = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "TP_DST" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                            flowObj.Match.TransportSource = obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].type === "TP_SRC" ?                      obj.flowStatistics[i].flowStatistic[j].flow.match.matchField[k].value : 0;
                        }
                        
                        flowObj.Actions = [];
                            
                        for(var m=0; m<obj.flowStatistics[i].flowStatistic[j].flow.actions.length; m++){
                             actionObj = {}; //specify the switch that port belongs to?
                             actionObj.Type = obj.flowStatistics[i].flowStatistic[j].flow.actions[m].type;
                             if(obj.flowStatistics[i].flowStatistic[j].flow.actions[m].port){
                             actionObj.PortNum = parseInt(obj.flowStatistics[i].flowStatistic[j].flow.actions[m].port.id);
                             }
                             flowObj.Actions.push(actionObj);
                            }
                        
                        flowObj.Priority = obj.flowStatistics[i].flowStatistic[j].flow.priority;
                        flowObj.IdleTimeout = obj.flowStatistics[i].flowStatistic[j].flow.idleTimeout;
                        flowObj.HardTimeout = obj.flowStatistics[i].flowStatistic[j].flow.hardTimeout;
                        flowObj.Cookie = obj.flowStatistics[i].flowStatistic[j].flow.id;
                        /*for(key in obj.flowStatistics[i].flowStatistic[j]){
                            flowObj[key] = obj.flowStatistics[i].flowStatistic[j][key];
                        }*/
                        newObj.Flows.push(flowObj);
                    }
                    arr.push(newObj);    
                }
                return arr;
                break;
            
            case 'alterflow':
                arr = [];
                for(var i=0; i<obj.flowConfig.length; i++){
                    newObj = {};
                    newObj.DPID = obj.flowConfig[i].node.id;
                    newObj.Flows = [];
                    flowObj = {}; //soon: multiple flows
                    flowObj.IdleTimeout = obj.flowConfig[i].idleTimeout;
                    flowObj.HardTimeout = obj.flowConfig[i].hardTimeout;
                    flowObj.Actions = [];
                    flowObj.Match = {};  //todo: add match and actions
                    flowObj.Cookie = obj.flowConfig[i].cookie;
                    flowObj.Priority =obj.flowConfig[i].priority;
                    flowObj.Flow = obj.flowConfig[i].name;
                    newObj.Flows.push(flowObj);
                    arr.push(newObj);    
                }
                return arr;
                break;
                
            
            case 'switchdesc': //actually calling nodes (switches) call first
                arr = [];
                for (var i=0; i<obj.nodeProperties.length; i++){
                    newObj = {}; //newObj has to be defined within the for loop
                    newObj.DPID = obj.nodeProperties[i].node.id;
                    arr.push(newObj);
                }
                    normalizerObj = {};
                    normalizerObj.Stats = arr;
                    return normalizerObj;
                break;
            
            case 'switchdesc2':
                 //newObj = {};
                //improve the accuracy of this
            
                //Note that would be much easier and more accurate to use the DPID that was sent to Opendaylight to compare,
                //but can't seem to find this.
                for(var j=0; j<innerArr.length; j++){
                    var description = obj.description.slice(14, obj.description.length);
                    var parseDP = innerArr[j].DPID.replace(/:/g, "");
                     if(parseDP === description || innerArr[j].DPID.toUpperCase() === obj.description){ //handles how switches broadcast datapath id?
                     innerArr[j].Manufacturer = obj.manufacturer;
                     innerArr[j].Hardware = obj.hardware;
                     innerArr[j].Software = obj.software;
                     innerArr[j].SerialNum = obj.serialNumber;
                     }
                 }  
                return innerArr;
                break;
            
            default:
                return obj;
      }  
    },
    
}