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
                //console.log(apiPath);
                opts = {method:apiMethod,hostname:host,port:8181,path:apiPath, auth:auth}; //TODO: mask auth //auth:'admin:admin'
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
    
	identity: 'helium',
    
     drop: function() {
        
        
     },
    
        dpid: '00:00:00:00:00:00:00:0e',
    
    
        cookie: '',
    
    
        cookieGet: false, //keeps resetting to false here

        registerConnection: function (conn, coll, cb) {
                if (!conn.port) { conn.port = 8181; }
                if (!conn.method) { conn.method = 'GET'; }
                cb();
        },
    
        teardown: function(connectionName, cb) {
          if(!sails.config.connections[connectionName]) return cb();
          delete sails.config.connections[connectionName];
          cb();
        },

        find: function (conn, coll, options, cb) {
            //console.log(options);
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
                case 'table': return this.getTableStats({args:['default'],call:coll},cb);
                         break;
                case 'topology': return this.getTopology({args:['default'],call:coll},cb);
                         break;
                    
                    
                case 'topologylinks': return this.getTopologyLinks({args:['default'],call:coll},cb);
                         break;
                
                case 'host': return this.getNodes({args:['openflow:1'],call:coll},cb);
                         break;
                case 'allhost': return this.getHosts({args: options.a_switch,call:coll,current_array:options.current_array,switches:options.switches,switch_no:options.switch_no},cb);
                         break;
                case 'host_attachments': return this.getTopology({args:['default'],call:coll,current_array:options.current_array},cb);
                         break;    
                
                case 'alterflow': return this.getNodes({args:['default'],call:coll},cb);  
                         break;
                case 'allalterflow':  return this.getFlows({args: options.a_switch,call:coll,current_array:options.current_array,switches:options.switches,switch_no:options.switch_no},cb);    
                         break;
                    
                case 'switchports': return this.getNodes({args:['default'],call:coll},cb);
                         break; 
                case 'allswitchports': return this.getPortStats({args: options.a_switch,call:coll,current_array:options.current_array,switches:options.switches,switch_no:options.switch_no},cb);
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
                        flowData['flow-node-inventory:flow'] = {};
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match'] = {};
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match']['flow-node-inventory:ethernet-match'] = {};
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match']['flow-node-inventory:ethernet-match']['opendaylight-group-statistics:ethernet-destination'] = {};
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match']['flow-node-inventory:ethernet-match']['opendaylight-group-statistics:ethernet-destination']['opendaylight-group-statistics:address'] = unparsed['dst-ip'];
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match']['flow-node-inventory:ethernet-match']['opendaylight-group-statistics:ethernet-type'] = {};
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match']['flow-node-inventory:ethernet-match']['opendaylight-group-statistics:ethernet-type']['opendaylight-group-statistics:type'] = unparsed['tos-bits'];
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match']['flow-node-inventory:ethernet-match']['opendaylight-group-statistics:ethernet-source'] = {};
                        flowData['flow-node-inventory:flow']['flow-node-inventory:match']['flow-node-inventory:ethernet-match']['opendaylight-group-statistics:ethernet-source']['opendaylight-group-statistics:address'] = unparsed['src-ip'];
                        
                        string = JSON.stringify(flowData);
                        parsed = JSON.parse(string);
                        parsed.switch = unparsed.switch;
                        
                        resp = options.response;
                        if(sails.controllers.main.hostname){
                                  var host = sails.controllers.main.hostname;
                                }
                        var username = 'admin';
                        var password = 'admin';
                        var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
                        var opts = {method:'PUT',hostname:host,port:8181,path:'/restconf/config/opendaylight-inventory:nodes/node/' + unparsed.switch + '/table/0/flow/' + unparsed.name + '',auth:auth};
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
                        var opts = {method:'DELETE',hostname:host,port:8181,path:'/restconf/config/opendaylight-inventory:nodes/node/' + parsed.switch + '/table/0/flow/' + parsed.name + '',auth:'admin:admin'};
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
    
    //Collected MD-SAL calls
    ///restconf/operational/opendaylight-inventory:nodes/node/openflow%3A5
    ///restconf/operational/opendaylight-inventory:nodes
    ///restconf/operational/network-topology:network-topology/topology/flow%3A1
    
    /*GET /config/opendaylight-inventory:nodes/node/{id}/flow-node-inventory:switch-features/


/config/opendaylight-inventory:nodes/node/{id}/flow-node-inventory:table/{id}/opendaylight-flow-statistics:aggregate-flow-statistics/


GET /config/opendaylight-inventory:nodes/node/{id}/flow-node-inventory:table/{id}/flow/{id}/match/
GET /config/opendaylight-inventory:nodes/node/{id}/flow-node-inventory:table/{id}/flow/{id}/
GET /config/opendaylight-inventory:nodes/node/{id}/node-connector/{id}/address-tracker:addresses/{id}/
/config/opendaylight-inventory:nodes/node/{id}/node-connector/{id}/flow-node-inventory:queue/{queue-id}/opendaylight-queue-statistics:flow-capable-node-connector-queue-statistics/
GET /config/opendaylight-inventory:nodes/node/{id}/node-connector/{id}/opendaylight-port-statistics:flow-capable-node-connector-statistics/bytes/
GET /config/opendaylight-inventory:nodes/node/{id}/node-connector/{id}/opendaylight-port-statistics:flow-capable-node-connector-statistics/packets/
/config/opendaylight-inventory:nodes/node/{id}/node-connector/{id}/opendaylight-port-statistics:flow-capable-node-connector-statistics/
 GET /config/opendaylight-inventory:nodes/node/{id}/node-connector/{id}
 GET /config/opendaylight-inventory:nodes/node/{id}/
GET /config/opendaylight-inventory:nodes/
GET /config/network-topology:network-topology/
GET /config/network-topology:network-topology/topology/{topology-id}/node/{node-id}/
GET /config/network-topology:network-topology/topology/{topology-id}/node/{node-id}/host-tracker-service:addresses/{id}/
GET /config/network-topology:network-topology/topology/{topology-id}/link/{link-id}/ source or destination

*/
//http://localhost:8181/restconf/operational/opendaylight-inventory:nodes/node/openflow:1
//host and port
//http://localhost:8181/restconf/operational/opendaylight-inventory:nodes/node/openflow:1/node-connector/openflow:1:1/opendaylight-port-statistics:flow-capable-node-connector-statistics/
    
    getTopology:restCall('GET', '/restconf/operational/network-topology:network-topology/topology/flow%3A1'), 
    
    getNodes: restCall('GET', '/restconf/operational/opendaylight-inventory:nodes'), 
    
    getPortStats: restCall('GET', '/restconf/operational/opendaylight-inventory:nodes/node/:dpid:'),
    
    getHosts: restCall('GET', '/restconf/operational/opendaylight-inventory:nodes/node/:dpid:'),
    
    getFlows: restCall('GET', '/restconf/operational/opendaylight-inventory:nodes/node/:dpid:/flow-node-inventory:table/0'), 
 
    //http://localhost:8181/restconf/operational/opendaylight-inventory:nodes
    //everything
    
    //push flow: POST??
    //PUT : http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/openflow:1/table/0/flow/1234
    
    /*
    {
  "flow-node-inventory:table_id": "integer",
  "flow-node-inventory:idle-timeout": "integer",
  "flow-node-inventory:out_port": "integer",
  "flow-node-inventory:match": {
    "flow-node-inventory:layer-4-match": "object",
    "flow-node-inventory:tcp-flag-match": {
      "opendaylight-group-statistics:tcp-flag": "integer"
    },
    "flow-node-inventory:icmpv6-match": {
      "opendaylight-group-statistics:icmpv6-type": "integer",
      "opendaylight-group-statistics:icmpv6-code": "integer"
    },
    "openflowplugin-extension-general:extension-list": [
      {
        "openflowplugin-extension-general:extension": {
          "openflowplugin-extension-general:dos-ekis": "string"
        },
        "openflowplugin-extension-general:extension-key": "extension-key"
      }
    ],
    "flow-node-inventory:ethernet-match": {
      "opendaylight-group-statistics:ethernet-destination": {
        "opendaylight-group-statistics:mask": "string",
        "opendaylight-group-statistics:address": "string" //REQ
      },
      "opendaylight-group-statistics:ethernet-type": {
        "opendaylight-group-statistics:type": "integer" //REQ
      },
      "opendaylight-group-statistics:ethernet-source": {
        "opendaylight-group-statistics:mask": "string",
        "opendaylight-group-statistics:address": "string" //REQ
      }
    },
    "flow-node-inventory:in-phy-port": "string",
    "flow-node-inventory:tunnel": {
      "opendaylight-group-statistics:tunnel-id": "integer",
      "opendaylight-group-statistics:tunnel-mask": "integer"
    },
    "flow-node-inventory:ip-match": {
      "opendaylight-group-statistics:ip-dscp": "integer",
      "opendaylight-group-statistics:ip-ecn": "integer",
      "opendaylight-group-statistics:ip-proto": "enum",
      "opendaylight-group-statistics:ip-protocol": "integer"
    },
    "flow-node-inventory:icmpv4-match": {
      "opendaylight-group-statistics:icmpv4-code": "integer",
      "opendaylight-group-statistics:icmpv4-type": "integer"
    },
    "flow-node-inventory:in-port": "string",
    "flow-node-inventory:metadata": {
      "opendaylight-group-statistics:metadata-mask": "integer",
      "opendaylight-group-statistics:metadata": "integer"
    },
    "flow-node-inventory:protocol-match-fields": {
      "opendaylight-group-statistics:mpls-tc": "integer",
      "opendaylight-group-statistics:mpls-bos": "integer",
      "opendaylight-group-statistics:mpls-label": "integer",
      "opendaylight-group-statistics:pbb": {
        "opendaylight-group-statistics:pbb-mask": "integer",
        "opendaylight-group-statistics:pbb-isid": "integer"
      }
    },
    "flow-node-inventory:layer-3-match": "object",
    "flow-node-inventory:vlan-match": {
      "opendaylight-group-statistics:vlan-id": {
        "opendaylight-group-statistics:vlan-id": "integer",
        "opendaylight-group-statistics:vlan-id-present": "boolean"
      },
      "opendaylight-group-statistics:vlan-pcp": "integer"
    }
  },
  "flow-node-inventory:out_group": "integer",
  "flow-node-inventory:container-name": "string",
  "flow-node-inventory:flow-name": "string",
  "flow-node-inventory:strict": "boolean",
  "flow-node-inventory:cookie_mask": "integer",
  "flow-node-inventory:barrier": "boolean",
  "opendaylight-flow-statistics:flow-statistics": {
    "opendaylight-flow-statistics:duration": {
      "opendaylight-group-statistics:second": "integer",
      "opendaylight-group-statistics:nanosecond": "integer"
    },
    "opendaylight-flow-statistics:byte-count": "integer",
    "opendaylight-flow-statistics:packet-count": "integer"
  },
  "flow-node-inventory:id": "string",
  "flow-node-inventory:installHw": "boolean",
  "flow-node-inventory:instructions": {
    "flow-node-inventory:instruction": [
      {
        "flow-node-inventory:order": "integer",
        "flow-node-inventory:instruction": "object"
      }
    ]
  },
  "flow-node-inventory:priority": "integer",
  "flow-node-inventory:hard-timeout": "integer",
  "flow-node-inventory:buffer_id": "integer",
  "flow-node-inventory:cookie": "integer"
}
*/
    //delete to same url
    //how to get user-specified flow? will be same as in tempflows entire flow table?
    
    //Old
    
    //Statistics API
    getFlowStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/flow'),
            
    getFlowStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/flow/node/:nodeType:/:nodeId:'),
            
   
            
    getPortStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/port/node/:nodeType:/:nodeId:'),
            
    getTableStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/table'), 
            
    getTableStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/table/node/:nodeType:/:nodeId:'), 
    
    
    //Topology API
   
        
    addTopologyLinks: restCall('PUT', '/controller/nb/v2/topology/:containerName:/userLink/:name:'), 
        
    deleteTopologyLinks: restCall('DELETE', '/controller/nb/v2/topology/:containerName:/userLink/:name:'), 
        
    getTopologyLinks: restCall('GET', '/controller/nb/v2/topology/:containerName:/userLinks'), 
    
    
    //Host API
    getHost: restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
        
    addHost: restCall('PUT', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
            
    deleteHost: restCall('DELETE', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
            
    
   
    getInactiveHosts:restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/hosts/inactive'),
    
       
    //Flow API
    
        
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
    // Test if Helium or Hydrogen: sails.controllers.main.opendaylight_version === 'helium'
    nodeParse: function(current, obj, innerArr) {
    if(current === 'topology'){ //Disabled until we figure it out.
        //Returns hosts as topology elements.
        //On the front end, hosts are automatically seen at their switch attachment points
        //Hosts are not in topology.
         var links = obj.topology[0].link;
         var parsed_links = [];
         //Hosts are disallowed
         for(var i = 0; i < links.length; i++){
             var link = {};
             if(links[i].source["source-node"].substring(0,4) !== "host" && links[i].destination["dest-node"].substring(0,4) !== "host"){
                 link.SourceDPID =  links[i].source["source-node"];
                 var srcport = links[i].source["source-tp"].split(":");
                 link.SourcePortNum = parseInt(srcport[srcport.length-1]);
                 link.DestinationDPID =  links[i].destination["dest-node"];
                 var dstport = links[i].destination["dest-tp"].split(":");
                 link.DestinationPortNum = parseInt(dstport[dstport.length-1]);
                 parsed_links.push(link);
             }
         }
        return parsed_links;
     }
    //Note: This gets switches AND hosts
     else if(current === 'switch'){
         var nodes = obj.nodes.node;
         var parsed_nodes = [];
         for(var i = 0; i < nodes.length; i++){
             var node = {};
             node.DPID =  nodes[i].id;
             //node.Manufacturer = nodes[i]["flow-node-inventory:manufacturer"];
             //node.Hardware = nodes[i]["flow-node-inventory:hardware"];
             //node.Software = nodes[i]["flow-node-inventory:software"];
             //node.SerialNum = nodes[i]["flow-node-inventory:serial-number"];
             node.Buffers = nodes[i]["flow-node-inventory:switch-features"].max_buffers;
             node.Capabilities = nodes[i]["flow-node-inventory:switch-features"].capabilities.length;
             //node.SerialNum = nodes[i]["flow-node-inventory:serial-number"];
             if(nodes[i]["node-connector"]){
                 var ports = nodes[i]["node-connector"];
                 var parsed_ports = [];
                 for(var j = 0; j < ports.length; j++){
                    var port = {};
                    port.DPID =  nodes[i].id;
                    port.PortNum = parseInt(ports[j]["flow-node-inventory:port-number"]);
                    port.PortName = ports[j]["flow-node-inventory:name"];
                    port.CurrentFeatures = ports[j]["flow-node-inventory:current-feature"];
                    port.AdvertisedFeatures = ports[j]["flow-node-inventory:advertised-feature"];
                    port.SupportedFeatures = ports[j]["flow-node-inventory:supported"];                  
                    port.PeerFeatures = ports[j]["flow-node-inventory:port-peer-features"];
                    port.HardwareAddress = ports[j]["flow-node-inventory:hardware-address"];   
                    port.Config = ports[j]["flow-node-inventory:configuration"];
                    port.PortState = 1;
                    parsed_ports.push(port); 
                 }
                 node.Ports = parsed_ports;
                 parsed_nodes.push(node);
             }
         }
        return parsed_nodes;         
     }
      else if(current === 'switchdesc'){
         var nodes = obj.nodes.node;
         var parsed_nodes = [];
         for(var i = 0; i < nodes.length; i++){
             var node = {};
             node.DPID =  nodes[i].id;
             node.Manufacturer = nodes[i]["flow-node-inventory:manufacturer"];
             node.Hardware = nodes[i]["flow-node-inventory:hardware"];
             node.Software = nodes[i]["flow-node-inventory:software"];
             node.SerialNum = nodes[i]["flow-node-inventory:serial-number"];
             parsed_nodes.push(node);
         }
        return parsed_nodes;         
     } 
    else if(current === 'allswitchports'){
         var switch_ = obj.node;
         
         var dpid = obj.node[0].id;
         var parsed_port_stats = [];
         
         newObj = {};
         newObj.DPID = dpid;
         newObj.Ports = [];
        
        if(switch_[0]["node-connector"]){
            var portstats = switch_[0]["node-connector"];    
             for(var i = 0; i < portstats.length; i++){
                 var port_stats = {};
                 var inner_port = {};
                 if(parseInt(portstats[i]["flow-node-inventory:port-number"])){
                    inner_port.PortNum = parseInt(portstats[i]["flow-node-inventory:port-number"]);
                 }
                 else{
                    inner_port.PortNum = 0; 
                 }
                 if(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]){
                     inner_port.receivePackets = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["packets"]["received"]);
                     inner_port.transmitPackets = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["packets"]["received"]);
                     inner_port.receiveBytes = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["bytes"]["received"]);
                     inner_port.transmitBytes = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["bytes"]["transmitted"]);
                     inner_port.receiveDrops = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["receive-drops"]);
                     inner_port.transmitDrops = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["transmit-drops"]);
                     inner_port.receiveErrors = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["receive-errors"]);
                     inner_port.transmitErrors = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["transmit-errors"]);
                     inner_port.receiveFrameError  = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["receive-frame-error"]);
                     inner_port.receiveOverRunError  = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["receive-over-run-error"]);
                     inner_port.receiveCrcError = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["receive-crc-error"]);
                     inner_port.collisionCount = parseInt(portstats[i]["opendaylight-port-statistics:flow-capable-node-connector-statistics"]["collision-count"]);
                     newObj.Ports.push(inner_port);
                 }
             }
            parsed_port_stats.push(newObj);
        }
        return parsed_port_stats;
     } 
     else if(current === 'host'){
         var switch_ = obj.nodes.node;
         var dpid = obj.nodes.node[0].id;
         var parsed_hosts = [];
         if(switch_[0]["node-connector"]){
             var ports = switch_[0]["node-connector"];
             for(var i = 0; i < ports.length; i++){
             if(ports[i]["address-tracker:addresses"]){   

                 for(var j = 0; j < ports[i]["address-tracker:addresses"].length; j++){
                     var host_data = ports[i]["address-tracker:addresses"][j];
                     //console.log(host_data);
                     var host = {};
                     host.MAC_Address = [];
                     host.MAC_Address.push(host_data["mac"]);
                     host.IP_Address = [];
                     host.IP_Address.push(host_data["ip"]);
                     host.VLAN_ID = [];
                     host.VLAN_ID.push("0");
                     //host.Attached_To = [];
                     host.Last_Seen = [host_data["last-seen"]];
                     //var attach = {};
                     //attach.DPID = dpid;
                     //attach.PortNum = parseInt(ports[i]["flow-node-inventory:port-number"]); //Not correct attachment point. Use topology to find direct links instead
                     //host.Attached_To.push(attach);
                     parsed_hosts.push(host);    
                }

             }

            }
       }
        //console.log(parsed_hosts);
        return parsed_hosts;
     }
     else if(current === 'switchports' || current === 'alterflow'){ //First we need to know all switches on the network
         var nodes = obj.nodes.node; 
         var sw_array = [];
         for(var i = 0; i < nodes.length; i++){
            sw_array.push(nodes[i].id);
         }
         return sw_array;
     }
     else if(current === 'host_attachments'){ //First we need to know all switches on the network
         var links = obj.topology[0].link;
         var parsed_hosts = [];
         //Hosts are disallowed
         for(var i = 0; i < links.length; i++){
             var host = {};
             host.Attached_To = [];
             host.MAC_Address = [];
             var attach = {};
             if(links[i].source["source-node"].substring(0,4) === "host"){
                 attach.DPID = links[i].destination["dest-node"];
                 var dstport = links[i].destination["dest-tp"].split(":");
                 attach.PortNum = parseInt(dstport[dstport.length-1]);
                 host.Attached_To.push(attach);
                 var mac = links[i].source["source-node"].substring(5, links[i].source["source-node"].length);
                 host.MAC_Address.push(mac);
                 parsed_hosts.push(host);
             }
             else if(links[i].destination["dest-node"].substring(0,4) === "host"){
                 attach.DPID =  links[i].source["source-node"];
                 var srcport = links[i].source["source-tp"].split(":");
                 attach.PortNum = parseInt(srcport[srcport.length-1]);
                 host.Attached_To.push(attach);
                 var mac = links[i].destination["dest-node"].substring(5, links[i].destination["dest-node"].length);
                 host.MAC_Address.push(mac);
                 parsed_hosts.push(host);
             }
         }
        return parsed_hosts;
     }    
     else{
     return obj;
     }
    },
}