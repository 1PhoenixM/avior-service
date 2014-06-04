//COURIER 
var FLAdapter = require('./FLAdapter.js');
var ODLAdapter = require('./ODLAdapter.js');
var express = require('express');
var app = require('./server.js');

var CONTROLLERS = {
    Floodlight: FLAdapter,
    OpenDaylight: ODLAdapter
};

//Test routes
app.get('/core/ports', function(req,res){
	app.controller.response = res;
	app.controller.getPortStats(); //empty id defaults to all switches for floodlight, empty container defaults to default container for opendaylight
});

app.get('/core/aggregate', function(req,res){
	app.controller.response = res;
	app.controller.getAggregateStats(); 
});

app.get('/core/flows', function(req,res){
	app.controller.response = res;
    app.controller.getFlowStats(); 
});

app.get('/core/desc', function(req,res){
	app.controller.response = res;
    app.controller.getDescStats(); 
});

app.get('/core/table', function(req,res){
	app.controller.response = res;
    app.controller.getTableStats(); 
});

app.get('/core/features', function(req,res){
	app.controller.response = res;
    app.controller.getFeatures(); 
});

app.get('/core/switches', function(req,res){
	app.controller.response = res;
    app.controller.getSwitches(); 
});

app.get('/core/controller/summary', function(req,res){
	app.controller.response = res;
    app.controller.getSummary(); 
});

app.post('/flow', function(req,res){
    app.controller.postFlow(req.body);
    res.send("\nFlow sent\n");
});

//Main routes
app.get('/controller/list', function(req,res){
	app.controller.response = res;
});

app.get('/controller/:id', function(req,res){
	app.controller.response = res;
});

//app.post('/controller', function(req,res){
	//app.controller.response = res;
//});

app.del('/controller/:id', function(req,res){
	app.controller.response = res;
});

app.get('/core/switch/summary/:dpid', function(req,res){
	app.controller.response = res;
});

app.get('/core/switch/detail/:dpid', function(req,res){
	app.controller.response = res;
});

app.get('/flows', function(req,res){
	app.controller.response = res;
});

app.get('/flows/static', function(req,res){
	app.controller.response = res;
});

app.post('/flow/mod', function(req,res){
	app.controller.response = res;
});

app.del('/flow/mod/:name', function(req,res){
	app.controller.response = res;
});

app.get('/firewall/status', function(req,res){
	app.controller.response = res;
});

app.post('/firewall/status', function(req,res){
	app.controller.response = res;
});

app.get('/firewall/rules', function(req,res){
	app.controller.response = res;
});

app.post('/firewall/rule', function(req,res){
	app.controller.response = res;
});

app.put('/firewall/rule/:id', function(req,res){
	app.controller.response = res;
});

app.del('/firewall/rule/:id', function(req,res){
	app.controller.response = res;
});

app.post('/controller', function(req,res){
    app.controller = CONTROLLERS[req.body.type];
    if (app.controller) {
        app.controller.hostname = req.body.hostname;
        res.send("\nController set\n");
    }
});

//Routes:
//OpenFlow, FL, ODL
/*GET /controller/uptime
GET /controller/status
GET /controller/memory
GET /controller/modules

GET /topology
GET /hosts
GET /host/:id/stats

GET /switches
GET /switch/:id/stats

GET /flows
GET /flows/:id 
POST /flow/mod/:id
DEL /flow/mod/:id 

GET
/controller/list
Retrieve list of all controllers
GET
/controller/:id
Retrieve previously added controller
POST
/controller
Add a controller, returns :id
DELETE
/controller/:id
Remove a controller


GET
/core/switch/summary/:dpid
Retrieve switch description
GET
/core/switch/detail/:dpid
Retrieve switch features & stats



GET
/flows
Retrieve a list of all flows
GET
/flows/static
Retrieve a list of static flows only
(is this possible?)
POST
/flow/mod
Add a static flow
DELETE
/flow/mod/:name
Remove a static flow

GET
/firewall/status
Retrieve firewall up/down status
POST
/firewall/status
Set firewall up/down status
GET
/firewall/rules
Retrieve list of all rules
POST
/firewall/rule
Add a new rule
PUT/PATCH
/firewall/rule/:id
Update an existing rule
DELETE
/firewall/rule/:id
Remove an existing rule

Floodlight:

Switches, all or by id:
        PortStats
        QueueStats
        Flows
        Aggregate
        Desc
        TableStats
        Features

Switches
        
#of switches, hosts and links
        
Counters, all or by switch 
        
Memory
        
Health
        
Uptime
        
Links (deprecated)
        
Clusters (deprecated)
        
External links
        
Topo Links
        
Devices (Hosts)
        
List flows per switch or all 

Clear flows per switch or all 
        
Post/Del flow 
        
Virtual Network (not yet supported)
        
Post firewall status 
        
Get firewall status 
        
Get/post/del Rules

OpenDaylight:

Get flow stats, all or by node

Get port stats, all or by node

Get table stats, all or by node

Get topology

Get/Add/Delete topology links

Get/Add/Delete a host

Get all hosts

Get inactive hosts

Get flows, all or by node

Get/Add/Delete/Toggle Flows

Get/Add/Delete Static Routes

Get all static routes

Get/Add/Delete/Modify subnet

Get all subnets

Get node connectors

Get/add/delete node properties

Add/delete node connector properties

Get nodes

Save nodes

add/delete users

get/add/delete containers

get/add/delete flowspec

get all flowspecs

add/remove nodeconnectors

get containers

add a management connection with or without known node type

disconnect connection

get node clusters

add/delete bridge

add/delete port from bridge

add port + vlan to bridge

/////////////Neutron/OpenStack supports: 

    Floating IPs
    Networks
    Ports
    Routers
    Security Groups
    Security Rules
    Subnets

///////////Plexxi capabilities through Affinity API Metadata Service:
    Create an affinity group
    
    Fetch an affinity group by name
    
    Add an affinity element to an affinity group (mac, ip or host)
    
    Delete element (mac, ip or host)
    
    Add affinity link from one group to another
    
    Create affinity elements (TBD)
    
    List all affinities
    
    List stats for affinities (TBD)
    
    */