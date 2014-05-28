var express = require('express');
var app = express.createServer(); //express(); // should be the latter for Express 3+
var http = require('http');
var OFP = require('../ofp.js'); 
var Port = new OFP.PortStats();

app.use(express.bodyParser());
 
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
//ADAPTERS
var FLAdapter = {
	hostname: 'localhost',
	normalize: function (obj) {
        var aPort = obj["00:00:00:00:00:00:00:02"][0];
        console.log(aPort);
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
	},
	getPortStats: function(id) {
		var self = this;
		if (!id) { id = 'all'; }
		req = http.request({hostname:this.hostname,port:8080,path:'/wm/core/switch/'+id+'/port/json'}, toClient(self));
        req.end();
	}
}

var ODLAdapter = {
    hostname: 'localhost',
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

app.controller = FLAdapter;

//COURIER 
app.get('/core/ports', function(req,res){
	app.controller.response = res;
	app.controller.getPortStats(); // empty id defaults to 'all' switches
});
 
app.post('/controller', function(req,res){
	app.controller.response = res;
    app.controller.response.send({"type":"Floodlight", "hostname":"localhost", "port":8080});
});

//type and ip of controller is provided

//SERVER
app.listen(process.env.PORT || 3412);