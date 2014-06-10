//COURIER 
var FLAdapter = require('./FLAdapter.js');
var ODLAdapter = require('./ODLAdapter.js');
var express = require('express');
var app = require('./server.js');

var CONTROLLERS = {
    Floodlight: FLAdapter,
    OpenDaylight: ODLAdapter
};

app.use(express.bodyParser()); // TODO bodyParser has security flaw? maybe use a different middleware here
//express.json() 

/*app.get('/core/features/:id', function(req,res){
        app.controller.response = res;
        app.controller.getFeatures({args:[req.param.id]});
});

app.post('/flow', function(req,res){
        app.controller.response = res;
        app.controller.postFlow({data:req.body});
}*/

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
//There are types of tasks: OpenFlow-only, FL-only, ODL-only, and common.
//Venn Diagram for controllers

//Could we include an immutable "Hello" route that gives back all supported routes?
//What data is sent in the route url itself, and what in the POST req?
//core is for routes that are not plugins?
//odl: make distinction between node connector routes and mgmt connection routes

/*GET /controller/uptime
GET /controller/status
GET /controller/memory
GET /controller/modules

//consolidate these into controller call?

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

//////////////Floodlight:

Switches, all or by id:
        PortStats /core/ports
        QueueStats /core/queues
        Flows /core/flows
        Aggregate /core/aggregate
        Desc /core/desc
        TableStats /core/table
        Features /core/features

Switches /core/switches
        
#of switches, hosts and links /core/summary
        
Counters, all or by switch /core/counters
        
Memory /core/memory (consolidate?)
        
Health /core/health (consolidate?)
        
Uptime /core/uptime (consolidate?)
        
Links (deprecated) /core/topology/links
        
Clusters (deprecated) /core/topology/clusters
        
External links /core/topology/external
        
Topo Links (see above)
         
Devices (Hosts) /core/hosts
        
List flows per switch or all /core/flows (?) 

Clear flows per switch or all /core/flows/clear
        
Post/Del flow /core/flows/:id
        
Virtual Network (not yet supported) 
        
Post firewall status /core/firewall/status
        
Get firewall status /core/firewall/status
        
Get/post/del Rules /core/firewall/rules/:id

//////////////////OpenDaylight:

Get flow stats, all or by node /core/flows

Get port stats, all or by node /core/ports

Get table stats, all or by node /core/table

Get topology /core/topology

Get/Add/Delete topology links /core/topology/links/:id

Get/Add/Delete a host /core/hosts/:id

Get all hosts /core/hosts

Get inactive hosts /core/hosts/inactive

Get flows, all or by node /core/flows

Get/Add/Delete/Toggle Flows /core/flows/:id

Get/Add/Delete Static Routes /core/staticroutes/:id

Get all static routes /core/staticroutes

Get/Add/Delete/Modify subnet /core/subnets/:id

Get all subnets /core/subnets

Get node connectors /core/connectors

Get/add/delete node properties /core/connectors/properties

Add/delete node connector properties /core/connectors/properties

Get nodes /core/nodes

Save nodes /core/nodes/save

add/delete users /core/users/:id

get/add/delete containers /core/containers/:id

get/add/delete flowspec /core/flows/specs/:id

get all flowspecs /core/flows/specs

add/remove nodeconnectors /core/connectors/:id

get containers /core/containers

add a management connection with or without known node type /core/connection/:id

disconnect connection /core/connection/:id

get node clusters /core/connection/clusters

add/delete bridge /core/bridges/:id

add/delete port from bridge /core/bridges/ports/:id

add port + vlan to bridge /core/bridges/ports/:id/vlan/:vlan

/////////////Neutron/OpenStack supports: 

    Floating IPs /core/neutron/floatingips
    Networks /core/neutron/networks
    Ports /core/neutron/ports
    Routers /core/neutron/routers
    Security Groups /core/neutron/security/groups
    Security Rules /core/neutron/security/rules
    Subnets /core/neutron/subnets

///////////Plexxi capabilities through Affinity API Metadata Service (not core):
    Create an affinity group /affinity/groups/:name
    
    Fetch an affinity group by name /affinity/groups/:name
    
    Add an affinity element to an affinity group (mac, ip or host) /affinity/groups/:name/element/:type/:name
    
    Delete element (mac, ip or host)  /affinity/groups/:name/element/:type/:name
    
    Add affinity link from one group to another /affinity/groups/link/:name/:name2
    
    Create affinity elements (TBD) /affinity/element/:id
    
    List all affinities /affinity/affinities
    
    List stats for affinities (TBD) /affinity/stats
    
    */