var toClient = require('../../toClient.js');
var http = require('http');

// Function calls the REST API depending on the call that is chosen from the find, create, and destroy switch case clauses below.
var restCall = function(apiMethod,apiPath){
        var self = this;
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
                opts = {method:apiMethod,hostname:host,port:8181,path:apiPath};
                //console.log("["+options.call+"]"+apiMethod+" http://"+host+":8080"+apiPath);
                req = http.request(opts, toClient(this,options.call,options,cb));
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                        console.log("DATA: " + options);
                        console.log("Got here");
                }
                apiPath = rawPath;
                req.end();
        }
};

 
module.exports = {
    
    TO_OFP : {
        //call : 'switch'
        Actions: 'Actions',
        Buffers : 'Buffers',
        Capabilities: 'Capabilities',
        Connected_Since: 'Connected_Since',
        DPID: 'DPID',
        Table : 'Tables',
        Datapath : 'Datapath',
        //call : 'switch'->'port'
        Ports: 'Ports',
        PortNumber: 'PortNumber',
        PortNum: 'PortNum',
        PortName: 'PortName',
        PortState: 'PortState',
        CurrentFeatures: 'CurrentFeatures',
        AdvertisedFeatures: 'AdvertisedFeatures',
        SupportedFeatures: 'SupportedFeatures',
        PeerFeatures: 'PeerFeatures',
        Config: 'Config',
        HardwareAddress: 'HardwareAddress',
        PortStats : 'PortStatistics',
        rx_packets : 'RXPackets',
        tx_packets : 'TXPackets',
        rx_bytes : 'RXBytes',
        tx_bytes : 'TXBytes',
        rx_dropped : 'RXDrops',
        tx_dropped : 'TXDrops',
        rx_errors : 'RXErrors',
        tx_errors : 'TXErrors',
        rx_frame_err : 'RXFrameErr',
        rx_over_err : 'RXOverrunErr',
        rx_crc_err : 'RxCrcErr',
        collisions : 'Collisions',

        //call : 'switchdesc'
        Manufacturer: 'Manufacturer',
        Software: 'Software',
        Hardware: 'Hardware',
        SerialNum: 'SerialNum',

        //call : 'host'
        MAC_Address : 'MAC_Address',
        IP_Address : 'IP_Address',
        VLAN_ID : 'VLAN_ID',
        Attached_To : 'Attached_To',

        //call : 'topology'
        SourceDPID : 'SourceDPID',
        SourcePortNum : 'SourcePortNum',
        DestinationDPID : 'DestinationDPID',
        DestinationPortNum : 'DestinationPortNum',

        //call : 'flowstats'
        Flows : 'Flows',
        DurationSeconds: 'DurationSeconds',
        DurationNanoSeconds: 'DurationNanoSeconds',
        PacketCount: 'PacketCount',
        ByteCount: 'ByteCount',
        Match: 'Match',
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
        Priority: 'Priority',
        IdleTimeout: 'IdleTimeout',
        HardTimeout: 'HardTimeout',
        Cookie: 'Cookie',
        TableID: 'TableID',
        //Actions: "Actions",
        Type: "Type",
        DataLayerAddress : 'DataLayerAddress',
        NetworkAddress : 'NetworkAddress',
        TransportPort : 'TransportPort',
        Value : 'value',
        
    },

    
    postData: {},
    
    dpid: '',
    
	identity: 'mul',
    
     drop: function() {
        
        
    },

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

        find: function (conn, coll, options, cb) { // Holds all of the REST calls that return data
            //console.log("find "+coll);
            switch (coll){   
                //core
                case 'switch':
//                case 'switchfeatures':
                        return this.getSwitches({args:['all'],call:coll},cb);
                        break;
/*                case 'port':
                    return this.getSwitchPorts({args:[options.dpid], call:coll, sw_arr:options.sw_arr,dpid:options.dpid},cb);
                    break;*/
//                case 'flow': return this.getFlows({args:['all'],call:coll},cb);
//                        break;
                case 'switchports':
                    return this.getSwitchPorts({args:[this.dpid ? this.dpid : options.dpid, 'all'], call:coll}, cb);
                /*case 'switchports': 
                    if(options.sw_arr){
                        return this.getSwitchPorts({args:[options.dpid],call:coll,sw_arr:options.sw_arr,dpid:options.dpid},cb);
                    }
                    else{
                        return this.getSwitchPorts({args:[this.dpid ? this.dpid : options.dpid],call:coll},cb);
                    }
                    break;*/
                case 'portstat':
                    portArr=[]
                    if(options.portArr) portArr=options.portArr;
                    else if(options.sw_arr) {
                        for(var i=0; i<options.sw_arr.length; i++){
                            for(var j=0; j<options.sw_arr[i].portArr.length; j++){
                                if(options.sw_arr[i].portArr[j].portstat){}
                                else{
                                    portArr=options.sw_arr[i].portArr;
                                }
                            }
                        }
                    }
                    for(var i=0;i<portArr.length;i++){
                        if(portArr[i].portstat){}
                        else{
                            if(options.sw_arr)
                                return this.getPortStats({call:coll,args:[options.dpid,portArr[i].port_no],sw_arr:options.sw_arr},cb);
                            else
                                return this.getPortStats({call:coll,args:[options.dpid,portArr[i].port_no],portArr:options.portArr},cb);
                        }
                    }
                break;
//                case 'tablestats': return this.getTableStats({args:['all'],call:coll},cb);
//                        break;
                case 'topology': return this.getTopologyLinks({call:coll},cb);
                        break;
                case 'host': return this.getHosts({call:coll},cb);
                        break;
                case 'switchfeatures': return this.getSwitchFeatures({args:['all'],call:coll},cb);
                        break;
                case 'flowstats': 
                        return this.getFlowStats({args:[this.dpid],call:coll},cb);
                        break;
                case 'switchdesc': return this.getSwitchDesc({args:['all'],call:coll},cb);
                        break;
//                case 'queue': return this.getQueueStats({args:['all'],call:coll},cb);
//                        break;
                case 'aggregate': return this.getAggregateStats({args:['all'],call:coll},cb);
                        break;
                case 'uptime': return this.getUptime({call:coll},cb);
                        break;
                case 'memory': return this.getMemory({call:coll},cb);
                        break;
                case 'health': return this.getHealth({call:coll},cb);
                        break;
                case 'topologyclusters':return this.getTopologyClusters({call:coll},cb);
                        break;
                case 'topologyexternallinks':return this.getTopologyExternalLinks({call:coll},cb);
                        break;
//                case 'clearflows':return this.clearFlows({args:['all'],call:coll},cb);
//                         break;
//                case 'modules':return this.getModules({args:[],call:coll},cb);
//                         break;
                case 'alterflow':
                        //return this.getFlows({call:coll},cb);
                        break;
		        default: return this.pluginFind(conn, coll, options, cb);
                        break;
                }    
            
        },
    
        pluginFind: function(conn, coll, options, cb){
            return cb(); //if no plugins, default behavior
        },
    
        create: function (conn, coll, options, cb) { //The Rest Call that will be called if a flow is being created
            console.log("POSTED DATA: " + JSON.stringify(options.data) + '\n')
            switch (coll){
                case 'alterflow': // fall-through!
                case 'flow':
                        data=options.data;
                        flowData={};
                        if (data['src-mac']) flowData['dl_src']=data['src-mac']
                        if (data['dst_mac']) flowData['dl_dst']=data['dst-mac']
                        if (data['ether-type']) flowData['dl_type']=data['ether-type']
                        if (data['vlan-id']) flowData['dl_vlan']=data['vlan-id']
                        if (data['vlan-priority']) flowData['dl_vlan_pcp']=data['vlan-priority']
                        if (data['dst-ip']) flowData['nw_dst']=data['dst-ip']
                        if (data['src-ip']) flowData['nw_src']=data['src-ip']
                        if (data['protocol']) flowData['nw_proto']=data['protocol']
                        if (data['tos-bits']) flowData['nw_tos']=data['tos-bits']
                        if (data['src-port']) flowData['tp_src']=data['src-port']
                        if (data['dst-port']) flowData['tp_dst']=data['dst-port']
                        if (data['ingress-port']) flowData['in_port']=data['ingress-port']
                        instructions=[];
                        actions=[];
                        if (data['actions']) {//for multi-actions
                            instruction={};
                            //for(var i=0; i<data['actions'].length;i++){
                            //act=data['actions'][i].toString()
                            act=data['actions'].toString()
                            action={};
                            if (act.match("^"+'output')) action={'action':'OUTPUT','value':act.replace('output=','')}
                            else if (act.startsWith('enqueue')) action={'action':'SET_QUEUE','value':act.replace('enqueue=','')}
                            else if (act.startsWith('strip-vlan')) action={'action':'STRIP_VLAN'}
                            else if (act.startsWith('set-vlan-vid')) action={'action':'SET_VLAN_VID','value':act.replace('set-vlan-vid=','')}
                            else if (act.startsWith('set-vlan-priority')) action={'action':'SET_VLAN_PCP','value':act.replace('set-vlan-priority=','')}
                            else if (act.startsWith('set-src-mac')) action={'action':'SET_DL_SRC','value':act.replace('set-src-mac=','')}
                            else if (act.startsWith('set-dst-mac')) action={'action':'SET_DL_DST','value':act.replace('set-dst-mac=','')}
                            else if (act.startsWith('set-tos-bits')) action={'action':'SET_NW_TOS','value':act.replace('set-tos-bits=','')}
                            else if (act.startsWith('set-src-ip')) action={'action':'SET_NW_SRC','value':act.replace('set-src-ip=','')}
                            else if (act.startsWith('set-dst-ip')) action={'action':'SET_NW_DST','value':act.replace('set-dst-ip=','')}
                            else if (act.startsWith('set-src-port')) action={'action':'SET_TP_SRC','value':act.replace('set-src-port=','')}
                            else if (act.startsWith('set-dst-port')) action={'action':'SET_TP_DST','value':act.replace('set-dst-port=','')}
                            actions.push(action);
                            instruction.instruction='APPLY_ACTIONS';
                            instruction.actions=actions;
                            //}
                            //mul can support instruction apply, write, meter, goto-table
                            instructions.push(instruction)
                        }
                        
                        flowData['instructions']=instructions;
                        resp = options.response;
                        if(sails.controllers.main.hostname){
                                  var host = sails.controllers.main.hostname;
                                }
                        var opts = {method:'POST',hostname:host,port:8080,path:'/1.0/flowtable/'+options.data.switch.toString()+'/flow', headers:{'Content_Type':'application/json','Content-Length':JSON.stringify(flowData).length}};
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
            return cb(); //if no plugins, default behavior
        },
    
        update: function (conn, coll, options, cb) {
            return this.pluginUpdate(conn, coll, options, cb);    
        },
    
        pluginUpdate: function(conn, coll, options, cb){
            return cb(); //if no plugins, default behavior
        },
    
        destroy: function (conn, coll, options, cb) {// Rest Call that will be called if there is a delete flow
             console.log("DELETED DATA: ");
                switch(coll){
                case 'alterflow':
                case 'flow':
                var flowData = options.data;
            if(sails.controllers.main.hostname){
              var host = sails.controllers.main.hostname;
            }
            var res = res;
            var options = {
                hostname:host, 
                port:8080, 
                path:'/1.0/flowtable/:arg:/flow/:arg:',
                method:'DELETE'};

            var req = http.request(options, function(res) {
              console.log('\n' + 'STATUS: ' + res.statusCode + '\n');
              console.log('HEADERS: ' + JSON.stringify(res.headers) + '\n');
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                console.log('BODY: ' + chunk + '\n');
              });
            });

            req.on('error', function(e) {
              console.log('problem with request: ' + e.message + '\n');
            });

            var realData; //temporary fix until find out what front-end parsing is doing
            for(realData in flowData){
                break;
            }

            console.log(realData);
            req.write(realData);
            req.end(); 
            break;
                default:  return this.pluginDestroy(conn, coll, options, cb);
                }
        },
    
    
        pluginDestroy: function(conn, coll, options, cb){
            return cb(); //if no plugins, default behavior
        },
    
        normalize: function (obj) {// This is taking in the returned input from the controller and returning it in a manner that aviors interface will understand wel enough to output to the front end.
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
			         for (fromField in this.TO_OFP) {
				        if (obj[fromField] || obj[fromField] === 0 || obj[fromField] === "") { //added so that "0" responses are not discarded
		 	        	       toField = this.TO_OFP[fromField];
	                           normalizedObj[toField] = this.normalize(obj[fromField]); //Nested structs? Probably handled recursively
				        }
			         }
                }
                return normalizedObj;
        },
    
        //dpidParse: function (current, obj) { //This function will fix a parsing issue that occurs when the DPID is given to us as a property name. Since to display the information we need to have the name of the property. To fix this this function take the DPID and sets it as the property and set DPID as the property name. Giving us a static property name no matter what the DPID
    mulParse: function(current, obj, options, cb){
        switch(current){
        case 'switch':
//        case 'switchfeatures':
            swArr=[];
            obj=obj.switches;
            for(var i=0; i<obj.length; i++){
                newObj={};
                newObj.Actions = {};
                newObj.Buffers = obj[i].n_buffers;
                newObj.Capabilities = 0;
                newObj.Connected_Since=0
                newObj.Table=obj[i].n_tables;
                newObj.Datapath=0;
                newObj.DPID = obj[i].dpid;
                Ports = [];
                for(var j=0; j<obj[i].ports.length; j++){
                    port = obj[i].ports[j];
                    portObj={}
                    portObj.DPID = obj[i].dpid;
                    portObj.PortNum = port.port_no;
                    portObj.PortName = port.name;
                    portObj.PortState = port.state;
                    portObj.CurrentFeatures = port.curr;
                    portObj.AdvertisedFeatures = port.advertised;
                    portObj.SupportedFeatures = port.supported;
                    portObj.PeerFeatures = port.peer;
                    portObj.Config = port.config;
                    portObj.HardwareAddress = port.hw_addr;
                    Ports.push(portObj);
                }
                newObj.Ports = Ports;
                swArr.push(newObj);
            }
            return swArr;
        break;
        case 'switchports':
            //console.log(obj);
            obj=obj.port_stats;
            port_arr=[]
            for(var i=0; i<obj.length; i++){
                newObj={};
                newObj.PortNum=obj[i].port_no.toString();
                newObj.rx_over_err=obj[i].rx_over_err;//.toString();
                newObj.tx_dropped=obj[i].tx_dropped;//.toString();
                newObj.rx_packets=obj[i].rx_packets.toString();
                newObj.rx_frame_err=obj[i].rx_frame_err;//.toString();
                newObj.rx_bytes=obj[i].rx_bytes.toString();
                newObj.tx_errors=obj[i].tx_errors;//.toString();
                newObj.rx_crc_err=obj[i].rx_crc_err;//.toString();
                newObj.collisions='0';//obj[i].collisions.toString();
                newObj.rx_errors=obj[i].rx_errors.toString();
                newObj.tx_bytes=obj[i].tx_bytes.toString();
                newObj.rx_dropped=obj[i].rx_dropped;//.toString();
                newObj.tx_packets=obj[i].tx_packets.toString();
                port_arr.push(newObj);
            }
            newObj={};
            newObj.DPID=options.args[0];
            newObj.Ports=port_arr;
            return newObj;
        break;
        case 'switchfeatures':
        case 'aggregate':
            return []
        break;
        /*case 'aggregate':
            arr=[];
            obj=obj.switches;
            for(var i=0;i<obj.length;i++){
                newObj={};
                newObj.dpid=obj[i].dpid;
                newObj.PacketCount=0;
                newObj.ByteCount=0;
                newObj.flows=parseInt(obj[i].flows,10);
                arr.push(newObj);
            }
            return arr;
        break;*/
        case 'switchdesc':
            arr=[];
            obj=obj.switches;
            for(var i=0; i<obj.length; i++){
                newObj={};
                newObj.DPID=obj[i].dpid;
                newObj.Manufacturer="connected to mul";
                newObj.Hardware = "switch";
                newObj.Software=obj[i].of_version;
                newObj.SerialNum = obj[i].alias_id.toString();
                arr.push(newObj);
            }
            return arr;
        break;
        case 'host':  
            obj=obj.hosts;
            arr=[];
            for(var i=0; i<obj.length; i++){
                newObj={};
                newObj.MAC_Address = [];
                newObj.MAC_Address.push(obj[i].dl_src);
                newObj.IP_Address = [];
                newObj.IP_Address.push(obj[i].nw_src);
                newObj.VLAN_ID = obj[i].network_id + obj[i].tenant_id;
                newObj.Attached_To = [];
                attachedObj={};
                attachedObj.DPID = obj[i].switch_dpid;
                attachedObj.PortNum = obj[i].port;
                newObj.Attached_To.push(attachedObj);
                arr.push(newObj);
            }
            return arr;
        break;
        case 'topology':
            arr=[];
            for(var i=0; i<obj.length; i++){
                for(var j=0; j<obj[i].neighbors.length; j++){
                    if(obj[i].neighbors[j].status === 'switch'){
                        newObj={};
                        newObj.SourceDPID = obj[i].dpid;
                        newObj.SourcePortNum = obj[i].neighbors[j].port;
                        newObj.DestinationDPID = obj[i].neighbors[j].neigh_dpid;
                        newObj.DestinationPortNum = obj[i].neighbors[j].neigh_port;
                        arr.push(newObj);
                    }
                }
            }
            return arr;
            break;
        case 'flowstats':
            arr = [];
            dpid=options.args[0];
            obj=obj.flows;
            for(var i=0; i<obj.length; i++){
                newObj = {};
                flow=obj[i];
                newObj.DurationSeconds=0;
                newObj.DurationNanoSeconds=0;
                newObj.PacketCount = flow.stat.pkt_count;
                newObj.ByteCount = flow.stat.byte_count;
                ///match
                match={};
                //match.Wildcards=0;
                //match.DataLayerDestination= flow.dl_dst ? flow.dl_dst : 0;
                //match.DataLayerSource=flow.dl_src ? flow.dl_src : 0;
                //match.DataLayerType=flow.dl_type ? flow.dl_type : 0;
                //match.DataLayerVLAN=flow.dl_vlan ? flow.dl_vlan : 0;
                //match.DataLayerVLAN_PCP=flow.dl_vlan_pcp ? flow.dl_vlan_pcp : 0;
                match.InputPort=flow.in_port ? flow.in_port : 0;
                //match.NetworkDestination = flow.nw_dst ? flow.nw_dst : 0;
                //match.NetworkDestinationMaskLen = 0;
                //match.NetworkProtocol = flow.nw_proto ? flow.nw_proto : 0;
                //match.NetworkSource = flow.nw_src ? flow.nw_src : 0;
                //match.NetworkSourceMaskLen = 0;
                //match.NetworkTOS = flow.nw_tos ? flow.nw_tos : 0;
                //match.TransportDestination = flow.tp_dst ? flow.tp_dst : 0;
                //match.TransportSource = flow.tp_src ? flow.tp_src : 0;
                newObj.Match=match;
                ///actions
                actions=[];
                if(flow.instructions){
                    for(var j=0; j<flow.instructions.length;j++){
                        if(flow.instructions[j].instruction==='APPLY_ACTIONS' || flow.instructions[j].instruction=='WRITE_ACTIONS'){
                            for(var k=0; k<flow.instructions[j].actions.length; k++){
                                actionObj={};
                                actionObj.Type=flow.instructions[j].actions[k].action;
                                switch(actionObj.Type){
                                    case 'OUTPUT': actionObj.PortNum = flow.instructions[j].actions[k].value; break;
                                    case 'STRIP_VLAN':
                                    case 'POP_VLAN':
                                         actionObj.Type = 'STRIP_VLAN'
                                    break;
                                    case 'SET_VLAN_VID': 
                                        actionObj.Type='SET_VLAN_ID';
                                        actionObj.DataLayerVLAN = flow.instructions[j].actions[k].value; break;
                                    case 'SET_VLAN_PCP': actionObj.DataLayerVLAN_PCP = flow.instructions[j].actions[k].value; break;
                                    case 'SET_DL_SRC': actionObj.DataLayerAddress = flow.instructions[j].actions[k].value; break;
                                    case 'SET_DL_DST': actionObj.DataLayerAddress = flow.instructions[j].actions[k].value; break;
                                    case 'SET_NW_TOS': actionObj.NetworkTOS = flow.instructions[j].actions[k].value; break;
                                    case 'SET_NW_SRC': actionObj.NetworkAddress = flow.instructions[j].actions[k].value; break;
                                    case 'SET_NW_DST': actionObj.NetworkAddress = flow.instructions[j].actions[k].value; break;
                                    case 'SET_TP_SRC': actionObj.TransportPort = flow.instructions[j].actions[k].value; break;
                                    case 'SET_TP_DST': actionObj.TransportPort = flow.instructions[j].actions[k].value; break;
                                    default: 
                                        actionObj.Value = flow.instructions[j].actions[k].value; 
                                    break;
                                }
                                //   actionObj.PortNum=flow.instructions[j].actions[k].value;
                                actions.push(actionObj);
                            }
                        }
                    }
                }
                newObj.Actions=actions;
                newObj.Priority = parseInt(flow.priority);
                newObj.IdleTimeout = 0;
                newObj.HardTimeout = 0;
                newObj.Cookie = 0;//flow.flow_id;
                newObj.TableID = flow.table_id;
                arr.push(newObj);
            }
            newObj={};
            newObj.DPID=options.args[0];
            newObj.Flows=arr;
            return [newObj];
            break;
        default: return this.pluginParse(current,obj); break;
        }       
    },
    
    pluginParse: function(current, obj){
        return obj; //If no plugins, default behavior
    },
  
    getSwitchDesc: restCall('GET','/1.0/topology/switch/all'),    
    getSwitchFeatures: restCall('GET','/1.0/topology/switch/all'),   
    getSwitchPorts: restCall('GET','/1.0/stats/switch/:arg:/port/:arg:'), 
    getPortStats: restCall('GET','/1.0/stats/switch/:arg:/port/:arg:'),
	////getQueueStats: restCall('GET', '/wm/core/switch/:arg:/queue/json'), 
	getFlowStats: restCall('GET','/1.0/flowtable/:arg:/flow/stats'), 
	getAggregateStats: restCall('GET','/1.0/topology/switch'), 
	////getTableStats: restCall('GET','/wm/core/switch/:arg:/table/json'),
	////getCounters: restCall('GET','/wm/core/counter/:arg:/:arg:/json'),
    getTopologyClusters: restCall('GET','/1.0/topology'),
    getFlows: restCall('GET','/1.0/flowtable/:arg:/flow'),
    getSwitches: restCall('GET','/1.0/topology/switch/all'), 
    ////getSummary: restCall('GET','/wm/core/controller/summary/json'),
    getHosts: restCall('GET','/1.0/fabric/host'), 
    getTopologyLinks: restCall('GET','/1.0/topology'),    
    getUptime: restCall('GET','/1.0/dashboard'), 
    getMemory: restCall('GET','/1.0/dashboard'), 
    getHealth: restCall('GET','/1.0/dashboard'), 
    getTopologyExternalLinks: restCall('GET','/1.0/topology'),
    ////clearFlows: restCall('GET','/wm/staticflowentrypusher/clear/:arg:/json'),
    postFlow: restCall('POST','/1.0/flowtable/:arg:/flow'),
    delFlow: restCall('DELETE','/1.0/flowtable/:arg:/flow/:arg:'),
    ////getModules: restCall('GET','/wm/core/module/loaded/json'),

}
