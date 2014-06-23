//TODO: iterate on multiple switches. using #2 as a tester. what if multiple flows or matches or actions?
//TODO: consider readable column names as properties
//TODO: what to do with attributes that are not openflow, but floodlight? i.e. masklens. or odl/fl exclusive?
//TODO: Are APIs completely covered? v1?
//TODO: ClearFlows is a get, change firewall status is a get...
//Accessing structs: reset normalize, then call this.normalize i.e. for flow and match nested structs. This allows
//for more reuse.
//ADAPTERS
var http = require('http');
//var OFP = require('./ofp.js'); //v1.0.0
var toClient = require('./toClient.js');
 
/* NOTE Only fields that differ are included below */
var TO_OFP = {
	/* PortStats */
	portNumber: "port_no",
	receivePackets: "rx_packets",
	transmitPackets: "tx_packets",
	receiveBytes: "rx_bytes",
	transmitBytes: "tx_bytes",
	receiveDropped: "rx_dropped",
	transmitDropped: "tx_dropped",
	receiveErrors: "rx_errors",
	transmitErrors: "tx_errors",
	receiveFrameErrors: "rx_frame_err",
	receiveOverrunErrors: "rx_over_err",
	receiveCRCErrors: "rx_crc_err",
	/* FlowStats */
	tableId: "table_id",
	// TODO how to handle match fields
	durationSeconds: "duration_sec",
	durationNanoseconds: "duration_nsec",
	idleTimeout: "idle_timeout",
	hardTimeout: "hard_timeout",
    packetCount: "packet_count",
    byteCount: "byte_count",
    /* Match (1.0.0) */
    inputPort: "in_port",
    dataLayerSource: "dl_src",
    dataLayerDestination: "dl_dst",
    dataLayerVirtualLan: "dl_vlan",
    dataLayerVirtualLanPriorityCodePoint: "dl_vlan_pcp",
    dataLayerType: "dl_type",
    networkTypeOfService: "nw_tos",
    networkProtocol: "nw_proto",
    networkSource: "nw_src",
    networkDestination: "nw_dst",
    transportSource: "tp_src",
    transportDestination: "tp_dst",
    /* Aggregate Stats */
    //Packet and byte counts are assigned up in FlowStats
    flowCount: "flow_count",
    /* Desc Stats */
    manufacturerDescription: "mfr_desc",
    hardwareDescription: "hw_desc",
    softwareDescription: "sw_desc",
    serialNumber: "serial_num",
    datapathDescription: "dp_desc",
    /* Table Stats */
    maximumEntries: "max_entries",
    activeCount: "active_count",
    lookupCount: "lookup_count", 
    matchedCount: "matched_count", 
    /* Features */
    datapathId: "datapath_id",
    buffers: "n_buffers",
    tables: "n_tables",
    hardwareAddress: "hw_addr",
    currentFeatures: "curr",
    advertisedFeatures: "advertised",
    supportedFeatures: "supported",
    peerFeatures: "peer",
    /* Switch only */
    description: "desc",
    inetAddress: "inet_address",  
    connectedSince: "connected_since",
    /* Switch Desc */
    manufacturer: "mfr_desc",
    hardware: "hw_desc", 
    software: "sw_desc", 
    serialNum: "serial_num", 
    datapath: "dp_desc", 
    /* Switch Attrs */
    supportsOfppFlood: "supports_ofpp_flood", 
    supportsNxRole: "supports_nx_role",
    FastWildcards: "fast_wildcards", 
    supportsOfppTable: "supports_ofpp_table",
    //Not OF
    //"# Switches": "n_switches", 
    //"# hosts": "n_hosts", 
    //"# quarantine ports": "n_quarantine_ports", 
    //"# inter-switch links": "n_inter_switch_links", 
    systemUptimeMsec: "system_uptime_msec",
    //harole: "role",
    //networkDestinationMaskLen: nw_dst_ml,
    //networkSourceMaskLen: nw_src_ml,
    ipv4: "IPAddress",
    mac: "MACAddress", 
    attachmentPoint: "ConnectedToSwitch", 
    port: "PortNum",
    "LastConnected",
	//incomplete
};

/* Creates a function that, when called, will make a REST API call */
var restCall = function(apiMethod,apiPath){
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

module.exports = {
//	hostname: 'localhost',
  //http://tobyho.com/2011/01/28/checking-types-in-javascript/
    //TODO: Why is a number printed with the JSON?
	normalize: function (obj) {
		var normalizedField;
		var normalizedObj = {};
        if(!obj){ return 'null'; }
        else if (obj.constructor === String || obj.constructor === Number || obj.constructor === Array) { return obj; } //TODO: Other possible types? This finds and returns the data, not an object. null is a possible type in error field!
		for (field in obj) {
			if (TO_OFP[field]) {
				normalizedField = TO_OFP[field];
                //console.log(normalizedField);
			} else {
				normalizedField = field;
			}
			normalizedObj[normalizedField] = this.normalize(obj[field]); //Nested structs? Probably handled recursively
		}
		return normalizedObj;
	},
 
    //arg is 'all' or a dpid
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
    
    getHosts: restCall('GET','/wm/device/'),
    
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
}