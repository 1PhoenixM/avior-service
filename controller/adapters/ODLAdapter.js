var http = require('http');
var unparsed = "";
var parsed = "";

var restURI = {
    host: 'localhost',    
    port: '8080',
    path: '/',
    auth: 'admin:admin'
}

var ODLRestCalls = [
'/controller/nb/v2/topology/{containerName}',
'/controller/nb/v2/topology/{containerName}/userLinks',
'/controller/nb/v2/topology/{containerName}/userLink/{name}',
'/controller/nb/v2/hosttracker/{containerName}/address/{networkAddress}',
'/controller/nb/v2/hosttracker/{containerName}/hosts/active',    
'/controller/nb/v2/hosttracker/{containerName}/hosts/inactive',  
'/controller/nb/v2/flowprogrammer/{containerName}',
'/controller/nb/v2/flowprogrammer/{containerName}/node/{nodeType}/{nodeId}',
'/controller/nb/v2/flowprogrammer/{containerName}/node/{nodeType}/{nodeId}/staticFlow/{name}',
'/controller/nb/v2/staticroute/{containerName}/routes',
'/controller/nb/v2/staticroute/{containerName}/route/{route}',
'/controller/nb/v2/statistics/{containerName}/flow',
'/controller/nb/v2/statistics/{containerName}/port',
'/controller/nb/v2/statistics/{containerName}/table',
'/controller/nb/v2/statistics/{containerName}/flow/node/{nodeType}/{nodeId}',
'/controller/nb/v2/statistics/{containerName}/port/node/{nodeType}/{nodeId}',
'/controller/nb/v2/statistics/{containerName}/table/node/{nodeType}/{nodeId}',
'/controller/nb/v2/subnetservice/{containerName}/subnets',
'/controller/nb/v2/subnetservice/{containerName}/subnet/{subnetName}',
'/controller/nb/v2/switchmanager/{containerName}/nodes',
'/controller/nb/v2/switchmanager/{containerName}/save',
'/controller/nb/v2/switchmanager/{containerName}/node/{nodeType}/{nodeId}',
'/controller/nb/v2/switchmanager/{containerName}/node/{nodeType}/{nodeId}/property/{propertyName}',
'/controller/nb/v2/switchmanager/{containerName}/node/{nodeType}/{nodeId}/property/{propertyName}/{propertyValue}',
'/controller/nb/v2/switchmanager/{containerName}/nodeconnector/{nodeType}/{nodeId}/{nodeConnectorType}/{nodeConnectorId}/property/{propertyName}',
'/controller/nb/v2/switchmanager/{containerName}/nodeconnector/{nodeType}/{nodeId}/{nodeConnectorType}/{nodeConnectorId}/property/{propertyName}/{propertyValue}',
'/controller/nb/v2/usermanager/users',
'/controller/nb/v2/usermanager/users/{userName}',
'/controller/nb/v2/containermanager/containers',
'/controller/nb/v2/containermanager/container/{container}',
'/controller/nb/v2/containermanager/container/{container}/flowspecs',
'/controller/nb/v2/containermanager/container/{container}/nodeconnector',  
'/controller/nb/v2/containermanager/container/{container}/flowspec/{flowspec}',
'/controller/nb/v2/connectionmanager/nodes',
'/controller/nb/v2/connectionmanager/node/{nodeType}/{nodeId}',
'/controller/nb/v2/connectionmanager/node/{nodeId}/address/{ipAddress}/port/{port}',
'/controller/nb/v2/connectionmanager/node/{nodeType}/{nodeId}/address/{ipAddress}/port/{port}',
'/controller/nb/v2/networkconfig/bridgedomain/bridge/{nodeType}/{nodeId}/{bridgeName}',
'/controller/nb/v2/networkconfig/bridgedomain/port/{nodeType}/{nodeId}/{bridgeName}/{portName}',
'/controller/nb/v2/networkconfig/bridgedomain/port/{nodeType}/{nodeId}/{bridgeName}/{portName}/{vlan}',
'/controller/nb/v2/neutron/floatingips',
'/controller/nb/v2/neutron/floatingips/{floatingipUUID}',
'/controller/nb/v2/neutron/networks',
'/controller/nb/v2/neutron/networks/{netUUID}',
'/controller/nb/v2/neutron/ports',
'/controller/nb/v2/neutron/ports/{portUUID}',
'/controller/nb/v2/neutron/routers',
'/controller/nb/v2/neutron/routers/{routerUUID}',
'/controller/nb/v2/neutron/routers/{routerUUID}/add_router_interface',
'/controller/nb/v2/neutron/routers/{routerUUID}/remove_router_interface',
'/controller/nb/v2/neutron/subnets',
'/controller/nb/v2/neutron/subnets/{subnetUUID}'
];


//this info should be sent from another file. 
restURI.path = ODLRestCalls[33];

var request = http.get(restURI, function(res){
    res.on('data', function(chunk){
    unparsed += chunk;
    });
    
    res.on('end', function(){
    var parsed = JSON.parse(unparsed);    
  
    if (restURI.path === ODLRestCalls[33]){
        var switch_dpid = parsed.node[0].id; //for however many dpid's in a for loop, see API stuff for example
        var switch_type = parsed.node[0].type;
        module.exports = switch_dpid;
    }
    else{
        console.log('Unsupported call or controller not connected');
    }	
    //console.log(switch_dpid);
    //console.log(switch_type);
    });
    
    
    res.on('error', function(e){
    console.log("There was an error: " + e.message);
    });
}) 
