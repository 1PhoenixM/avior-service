app.get('/core/ports', function(req,res){
	app.controller.response = res;
	app.controller.getPortStats(); // empty id defaults to 'all' switches
});

app.post('/controller', function(req,res){
    //var ContollerType = CONTROLLERS[req.body.type];
    //app.controller = new ControllerType();
    app.controller = CONTROLLERS[req.body.type];
    if (app.controller) {
        app.controller.hostname = req.body.hostname;
        res.send("Controller set");
        //app.controller.response = res;
        //app.controller.response.send({"type":"Floodlight", "hostname":"localhost", "port":8080});
    }
});

//Routes:
//OpenFlow, FL, ODL
GET /controller/uptime
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
        
