//initialize, load validated plugins to system
//add a new route to courier system for it
//UI normalization? what will the new route show? what will the plugin look like?
controllerData = require('../controller/controller');

//if(controllerData){
 //module.exports = controllerData;   
//}

//better to require entire modules and access objects with dot operator.

console.log(controllerData.datapath_id);

console.log("Request from Authorizer for Capability.");
console.log("Sending request to controller object for data.");
//Controller takes over here.
console.log("Received controller info.");
console.log("Providing capability to Courier.");
//Courier takes over here.

//Capabilities: more specific tasks to be found on routes.
//As of 5/19/14, here's what Avior can do.

//Controller capabilities:
    /*GET uptime
    GET status
    GET memory allocation
    GET Java modules //FL
    GET / change Firewall status (security risk*)
    

//Host:
    GET number of hosts
    GET IPs of hosts
    GET MAC addresses of hosts
    GET DPID of attached switch
    GET port of attachement point
    GET last seen date
    refresh host list 
            
    
    
//Switch:
    GET number of switches
    GET DPID on switches
    GET Manufacturer
            GET Hardware
            GET Software version Number
            GET serial Number
            GET connected since date
//PortStats is one capability    
GET number of ports 
    GET port status
    GET port name
    GET port Number
            GET tx packets
            GET rx bytes
            GET tx bytes
    GET number of dropped packets
    GET number of errors
    GET number of flows
    GET name of flows (soon)
            GET flow priorities
            GET input ports 
            GET actions
            GET packets
            GET bytes
            GET age 
            GET timeout
    go to /staticflowmanager
    refresh switch list

//Topology:
            GET topology
            show labels
            local view
            change color of nodes

//Static Flow Manager:
            POST a flow
            DELETE a flow

//Firewall:
            GET rules (soon)
            POST rules
            DELETE rules
            
//Future capabilities / possible plugins
            Plexxi interface
            ???*/