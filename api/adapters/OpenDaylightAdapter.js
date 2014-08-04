var toClient = require('../../toClient.js');
var http = require('http');

/*var FROM_OFP = {
	// name-in-models: name-in-opendaylight
	MAC_Address: 'dataLayerAddress',
	IP_Address: 'networkAddress',
	VLAN_ID: 'vlan',
	DPID: 'nodeId',
	Port: 'nodeConnectorId',
    Priority: 'priority', 
    IdleTimeout: 'idleTimeout', 
    HardTimeout: 'hardTimeout', 
    ID: 'id',  //flow id and dpid are both id.
    TableID: 'tableId',
    DurationSeconds:'durationSeconds', 
    DurationNanoSeconds:'durationNanoseconds',
    PacketCount:'packetCount',
    ByteCount:'byteCount',
    RXPackets:'receivePackets',
    TXPackets:'transmitPackets',
    RXBytes:'receiveBytes',
    TXBytes:'transmitBytes', 
    RXDrops:'receiveDrops', 
    TXDrops:'transmitDrops', 
    RXErrors:'receiveErrors',
    TXErrors:'transmitErrors', 
    RXFrameErr:'receiveFrameError',
    RXOverrunErr:'receiveOverRunError',
    RXCrcErr:'receiveCrcError',
    Collisions:'collisionCount', 
};*/

var TO_OFP = {
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
    TotalMemory: 'TotalMemory', //total is mem_free + mem_used & note that this is JVM mem, not just the controller.
    mem_free: 'FreeMemory',
    
    DPID: "DPID",
    Actions: "Actions",
    Buffers: "Buffers",
    Capabilities: "Capabilities",
    Connected_Since: "Connected_Since",
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
                if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = 'localhost';
                }
                opts = {method:apiMethod,hostname:host,port:8080,path:apiPath,auth:'admin:admin'}; //TODO: mask auth
                req = http.request(opts, toClient(this,options.call,null,cb));
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
    
        teardown: function(connectionName, cb) {
          if(!sails.config.connections[connectionName]) return cb();
          delete sails.config.connections[connectionName];
          cb();
        },

        find: function (conn, coll, options, cb) {
                switch (coll){
                
                //fake calls for front-end
                case 'uptime': return 'uptime';
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
                case 'port': return this.getNodeConnectors({args:['default', 'OF', '00:00:00:00:00:00:00:01'],call:coll},cb); //for now
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
                case 'flows': return this.getFlows({args:['default'],call:coll},cb);
                         break;
                case 'switch': return this.getNodes({args:['default'],call:coll},cb);
                         break;
                case 'flowspec': return this.getFlowSpecs({args:['default'],call:coll},cb);
                         break;
                        
                case 'switchfeatures': this.find(conn, 'switch', options, cb); //close to the same call, but fix later
                         break;
                        
                //no calls in opendaylight
                case 'switchdesc': return this.getNodes({args:['default'],call:coll},cb);
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
		        default: return cb();
                        break;
                }
        },
    
        create: function (conn, coll, options, cb) {
                switch (coll){
                case 'flow': 
                        console.log("POSTED DATA: " + JSON.stringify(options.data) + '\n')
                        
                        //Todo: parse/normalize the flow data
                        /*unparsed = options.data;
                        flowData = {};
                        flowData.node = {};
                        flowData.node.id = unparsed.switch;
                        flowData.node.type = 'OF';
                        flowData.name = unparsed.name;
                        flowData.ingressPort = unparsed.ingress_port;
                        flowData.actions = [];
                        flowData.actions.push(unparsed.actions);*/
                        flowData = options.data;
        
                        resp = options.response;
                        if(sails.controllers.main.hostname){
                                  var host = sails.controllers.main.hostname;
                                }
                                else{
                                  var host = 'localhost';
                                }
                        var opts = {method:'PUT',hostname:host,port:8080,path:'http://localhost:8080/controller/nb/v2/flowprogrammer/default/node/OF/' + flowData.node.id +  '/staticFlow/' + flowData.name +'',auth:'admin:admin'};
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
                case 'flow': return this.deleteFlow();
		        default: return cb();
                }
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
    
    
    //
    
    getControllerData: restCall('GET', '/controller/osgi/system/console/vmstat'),
    
    getModules: restCall('GET', '/controller/osgi/system/console/status-Bundlelist'),
    
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
			for (fromField in TO_OFP) {
				if (obj[fromField] || obj[fromField] === 0) {
		 	        	toField = TO_OFP[fromField];
	                        	normalizedObj[toField] = this.normalize(obj[fromField]);
				}
			}
			/* NOT CURRENTLY USED - REVERTED BACK TO TO_OFP APPROACH
			for (toField in FROM_OFP) {
                	        fromField = FROM_OFP[toField];
				if (obj[fromField]) {
	                        	normalizedObj[toField] = this.normalize(obj[fromField]);
				}
			}*/
                }
                //parse out unnessecary fields? Make all hostConfig, flowStatistic etc. equal to "Stats", then parse that in toClient.
                return normalizedObj;
        },
    
    
    //This function parses ODL data into the format of the Avior API
    nodeParse: function(current, obj, innerArr) {
    
    switch(current){
            
              case 'memory':
                obj.TotalMemory = obj.mem_free + obj.mem_used;
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
                    for(var k=0; k<innerArr.length; k++){
                        innerArr[k].Ports = Ports;
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
                        for(key in obj.flowStatistics[i].flowStatistic[j]){
                            flowObj[key] = obj.flowStatistics[i].flowStatistic[j][key];
                        }
                        newObj.Flows.push(flowObj);
                    }
                    arr.push(newObj);    
                }
                return arr;
                break;
            
            case 'switchdesc':
                arr = [];
                 for (var i=0; i<obj.nodeProperties.length; i++){
                 newObj = {};
                 newObj.DPID = obj.nodeProperties[i].node.id;
                 newObj.Manufacturer = "Not found"; 
                 newObj.Hardware = "Not found";
                 newObj.Software = "Not found";
                 newObj.SerialNum = "Not found";
                 arr.push(newObj);  
                 }
                return arr;
                break;
            
            default:
                return obj;
      }  
    },
    
}