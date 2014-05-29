var express = require('express');
var app = express.createServer(); //express(); // should be the latter for Express 3+
var http = require('http');
var OFP = require('./ofp.js'); 
var normalizer = "";

app.use(express.bodyParser()); // TODO bodyParser has security flaw? maybe use a different middleware here
 
//controller object?
var toClient = function (ctlr) {
	return function (res) {
		var responseString = '';
		res.setEncoding('utf-8');
 
		res.on('data', function(data) {
			responseString += data;
		});
 
		res.on('end', function() {
			var responseObject = JSON.parse(responseString);
			var normalizedObject = ctlr.normalize(responseObject);
			console.log(normalizedObject);
			ctlr.response.send(normalizedObject);
		});
	}
}
//TODO: iterate on multiple switches
//TODO: consider readable column names as properties
//ADAPTERS
var FLAdapter = {
//	hostname: 'localhost',
	normalize: function (obj) {
        if(normalizer === "PortStats"){
            var Port = new OFP.PortStats();
            var aPort = obj["00:00:00:00:00:00:00:02"][0];
            Port.port_no = aPort.portNumber;
            Port.rx_packets = aPort.receivePackets;
            Port.tx_packets = aPort.transmitPackets;
            Port.rx_bytes = aPort.receiveBytes;
            Port.tx_bytes = aPort.transmitBytes;
            Port.rx_dropped = aPort.receiveDropped;
            Port.tx_dropped = aPort.transmitDropped;
            Port.rx_errors = aPort.receiveErrors;
            Port.tx_errors = aPort.transmitErrors;
            Port.rx_frame_err = aPort.receiveFrameErrors;
            Port.rx_over_err = aPort.receiveOverrunErrors;
            Port.rx_crc_err = aPort.receiveCRCErrors;
            Port.collisions = aPort.collisions;
            return Port;
        }
        else if(normalizer === "QueueStats"){

        }
        else if(normalizer === "FlowStats"){

        }
        else if(normalizer === "AggregateStats"){
            var Aggregate = new OFP.AggregateStats();
            var anAggregateStats = obj["00:00:00:00:00:00:00:02"][0];
            Aggregate.packet_count = anAggregateStats.packetCount;
            Aggregate.byte_count = anAggregateStats.byteCount;
            Aggregate.flow_count = anAggregateStats.flowCount;
            return Aggregate;
        }
        else{
            return {};
        }
	},
	getPortStats: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/port/json'}, toClient(self));
        req.end();
        normalizer = "PortStats";
	},
    getQueueStats: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/queue/json'}, toClient(self));
        req.end();
        normalizer = "QueueStats";
	},
    getFlowStats: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/flow/json'}, toClient(self));
        req.end();
        normalizer = "FlowStats";
	},
    getAggregateStats: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/aggregate/json'}, toClient(self));
        req.end();
        normalizer = "AggregateStats";
	},
    getDescStats: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/desc/json'}, toClient(self));
        req.end();
        normalizer = "DescStats";
	},
    getTableStats: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/table/json'}, toClient(self));
        req.end();
        normalizer = "TableStats";
	},
    getFeatures: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/features/json'}, toClient(self));
        req.end();
        normalizer = "Features";
	},
    getSwitches: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/controller/switches/json'}, toClient(self));
        req.end();
        normalizer = "Switches";
	},
    getSummary: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/controller/summary/json '}, toClient(self));
        req.end();
        normalizer = "Summary";
	},
    getCounters: function(id) {
		var self = this;
		if (!counter) { counter = 'all'; }
        if (id) { id = ''+id+'/'; }
        if (!id) { id = '' }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/counter/'+id+''+counter+'/json '}, toClient(self));
        req.end();
        normalizer = "Counters";
	},
    getMemory: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/memory/json'}, toClient(self));
        req.end();
        normalizer = "Memory";
	},
    getHealth: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/health/json'}, toClient(self));
        req.end();
        normalizer = "Health";
	},
    getUptime: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/system/uptime/json'}, toClient(self));
        req.end();
        normalizer = "Uptime";
	},
    getTopologyLinks: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/topology/links/json'}, toClient(self));
        req.end();
        normalizer = "TopologyLinks";
	},
    getTopologyClusters: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/topology/switchclusters/json'}, toClient(self));
        req.end();
        normalizer = "TopologyClusters";
	},
    getTopologyExternalLinks: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/topology/external-links/json'}, toClient(self));
        req.end();
        normalizer = "TopologyExternalLinks";
	},
    getHosts: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/device/'}, toClient(self));
        req.end();
        normalizer = "Hosts";
	},
    postFlow: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/staticflowentrypusher/json'}, toClient(self));
        req.end();
        normalizer = "PostFlow";
	},
    delFlow: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/staticflowentrypusher/json'}, toClient(self));
        req.end();
        normalizer = "DelFlow";
	},
    getFlows: function(id) {
		var self = this;
        if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/staticflowentrypusher/list/'+id+'/json'}, toClient(self));
        req.end();
        normalizer = "ListFlows";
	},
    clearFlows: function(id) {
		var self = this;
        if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/staticflowentrypusher/clear/'+id+'/json'}, toClient(self));
        req.end();
        normalizer = "ClearFlows";
	},
    ////////////////////////////////////////////////////////////////////PLACEHOLDER FOR VIRTUAL NETWORK CALLS
    getFirewallStatus: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/module/status/json'}, toClient(self));
        req.end();
        normalizer = "FirewallStatus";
	},
    enableFirewall: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/module/enable/json'}, toClient(self));
        req.end();
        normalizer = "EnableFirewall";
	},
    disableFirewall: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/module/disable/json'}, toClient(self));
        req.end();
        normalizer = "DisableFirewall";
	},
    getFirewallStorageRules: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/module/storageRules/json'}, toClient(self));
        req.end();
        normalizer = "FirewallStorageRules";
	},
    getFirewallSubnetMask: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/module/subnet-mask/json'}, toClient(self));
        req.end();
        normalizer = "FirewallSubnetMask";
	},
    getFirewallRules: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/rules/json'}, toClient(self));
        req.end();
        normalizer = "FirewallRules";
	},
    postFirewallRule: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/rules/json'}, toClient(self));
        req.end();
        normalizer = "PostFirewallRule";
	},
    deleteFirewallRule: function(id) {
		var self = this;
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/firewall/rules/json'}, toClient(self));
        req.end();
        normalizer = "DelFirewallRule";
	}
}

var ODLAdapter = {
//    hostname: 'localhost',
	normalize: function (obj) {
        var aPort = obj["portStatistics"][0]["portStatistic"][0];
        console.log(aPort);
        Port.port_no = obj["portStatistics"][0]["portStatistic"][0]["nodeConnector"].id;
        Port.rx_packets = aPort.receivePackets;
        Port.tx_packets = aPort.transmitPackets;
        Port.rx_bytes = aPort.receiveBytes;
        Port.tx_bytes = aPort.transmitBytes;
        Port.rx_dropped = aPort.receiveDrops;
        Port.tx_dropped = aPort.transmitDrops;
        Port.rx_errors = aPort.receiveErrors;
        Port.tx_errors = aPort.transmitErrors;
        Port.rx_frame_err = aPort.receiveFrameError;
        Port.rx_over_err = aPort.receiveOverRunError;
        Port.rx_crc_err = aPort.receiveCrcError;
        Port.collisions = aPort.collisionCount;
		return Port;
	},
	getPortStats: function(id) {
		var self = this;
		http.get({hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/default/port',auth:'admin:admin'}, toClient(self));
	}
}

/*
function ODLAdapter(options) {
    this.hostname = options.hostname ? options.hostname : "localhost";
    this.port = options.port ? options.port : "8080";
    this.username = username;
    this.passwd = passwd;
}
ODLAdapter.prototype.normalize = function (obj) {
    var aPort = obj["portStatistics"][0]["portStatistic"][0];
    console.log(aPort);
    Port.port_no = obj["portStatistics"][0]["portStatistic"][0]["nodeConnector"].id;
    Port.rx_packets = aPort.receivePackets;
    Port.tx_packets = aPort.transmitPackets;
    Port.rx_bytes = aPort.receiveBytes;
    Port.tx_bytes = aPort.transmitBytes;
    Port.rx_dropped = aPort.receiveDrops;
    Port.tx_dropped = aPort.transmitDrops;
    Port.rx_errors = aPort.receiveErrors;
    Port.tx_errors = aPort.transmitErrors;
    Port.rx_frame_err = aPort.receiveFrameError;
    Port.rx_over_err = aPort.receiveOverRunError;
    Port.rx_crc_err = aPort.receiveCrcError;
    Port.collisions = aPort.collisionCount;
	return Port;
};
ODLAdapter.prototype.getPortStats = function(id) {
	var self = this;
	http.get({hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/default/port',auth:'admin:admin'}, toClient(self));
}
*/

var CONTROLLERS = {
    Floodlight: FLAdapter,
    OpenDaylight: ODLAdapter
};

//app.controller = ODLAdapter;

//COURIER 
app.get('/core/ports', function(req,res){
	app.controller.response = res;
	app.controller.getPortStats(); // empty id defaults to 'all' switches
});

app.get('/core/aggregate', function(req,res){
	app.controller.response = res;
	app.controller.getAggregateStats(); // empty id defaults to 'all' switches
});

app.post('/controller', function(req,res){
    //var ControllerType = CONTROLLERS[req.body.type];
    //app.controller = new ControllerType();
    app.controller = CONTROLLERS[req.body.type];
    if (app.controller) {
        app.controller.hostname = req.body.hostname;
        res.send("Controller set");
        //app.controller.response = res;
        //app.controller.response.send({"type":"Floodlight", "hostname":"localhost", "port":8080});
    }
});

//type and ip of controller is provided

//SERVER
app.listen(process.env.PORT || 3412);
//run on 8080