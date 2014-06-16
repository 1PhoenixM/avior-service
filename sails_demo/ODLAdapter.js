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
	//incomplete
};

/* Creates a function that, when called, will make a REST API call */
var restCall = function(apiMethod,apiPath){
	//var self = this;
	return function(options){
		if (options.args){
			for (arg in options.args){
				apiPath = apiPath.replace('/:[A-Za-z]+:/', options.args[arg]); //look for args of form :container:
			}
		}
		opts = {method:apiMethod,hostname:this.hostname,port:8080,path:apiPath,auth:'admin:admin'}; //TODO: ODL auth protection
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
		if (obj instanceof String || obj.constructor === Number) { return obj; } //TODO: Other possible types? This finds and returns the data, not an object
		for (field in obj) {
			if (TO_OFP[field]) {
				normalizedField = TO_OFP[field];
                console.log(normalizedField);
			} else {
				normalizedField = field;
			}
			normalizedObj[normalizedField] = this.normalize(obj[field]); //Nested structs? Probably handled recursively
		}
		return normalizedObj;
	},
       
    //TODO: organize args
    getFlowStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/flow'),
            
    getFlowStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/flow/node/:nodeType:/:nodeId:'),
            
    getPortStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/port'),
            
    getPortStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/port/node/:nodeType:/:nodeId:'),
            
    getTableStats: restCall('GET', '/controller/nb/v2/statistics/:containerName:/table'), 
            
    getTableStatsByNode: restCall('GET', '/controller/nb/v2/statistics/:containerName:/table/node/:nodeType:/:nodeId:'), 
    
    getTopology:restCall('GET', '/controller/nb/v2/topology/:containerName:'), 
        
    addTopologyLinks: restCall('PUT', '/controller/nb/v2/topology/:containerName:/userLink/:name:'), 
        
    deleteTopologyLinks: restCall('DELETE', '/controller/nb/v2/topology/:containerName:/userLink/:name:'), 
        
    getTopologyLinks: restCall('GET', '/controller/nb/v2/topology/:containerName:/userLinks'), 
        
    getHost: restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
        
    addHost: restCall('PUT', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
            
    deleteHost: restCall('DELETE', '/controller/nb/v2/hosttracker/:containerName:/address/:networkAddress:'), 
            
    getHosts: restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/hosts/active'), 
   
    getInactiveHosts:restCall('GET', '/controller/nb/v2/hosttracker/:containerName:/hosts/inactive'),
       
    getFlows: restCall('GET', '/controller/nb/v2/flowprogrammer/:containerName:'), 
        
    getFlowsByNode: restCall('GET', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:'), 
            
    getFlow: restCall('GET', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'), 
     
    addFlow: restCall('PUT', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'), 
            
    deleteFlow: restCall('DELETE', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'),
            
    toggleFlow: restCall('POST', '/controller/nb/v2/flowprogrammer/:containerName:/node/:nodeType:/:nodeId:/staticFlow/:name:'),
            
    getStaticRoute: restCall('GET', '/controller/nb/v2/staticroute/:containerName:/route/:route:'), 
            
    addStaticRoute: restCall('PUT', '/controller/nb/v2/staticroute/:containerName:/route/:route:'), 
         
    deleteStaticRoute: restCall('DELETE', '/controller/nb/v2/staticroute/:containerName:/route/:route:'), 
            
    getStaticRoutes: restCall('GET', '/controller/nb/v2/staticroute/:containerName:/routes'), 
    
    getSubnet: restCall('GET', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
            
    addSubnet: restCall('PUT', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
            
    deleteSubnet: restCall('DELETE', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
                    
    modSubnet: restCall('POST', '/controller/nb/v2/subnetservice/:containerName:/subnet/:subnetName:'), 
                    
    getSubnets: restCall('GET', '/controller/nb/v2/subnetservice/:containerName:/subnets'),
                    
    getNodeConnectors: restCall('GET', '/controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:'),
                    
    getNodeProperty: restCall('GET', '/controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:/property/:propertyName:'),
    
    deleteNodeProperty: restCall('DELETE', '/controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:/property/:propertyName:'),
                    
    addNodeProperties: restCall('PUT', ' /controller/nb/v2/switchmanager/:containerName:/node/:nodeType:/:nodeId:/property/:propertyName:/:propertyValue:'), 
                    
    deleteNodeConnectorProperty: restCall('DELETE', '/controller/nb/v2/switchmanager/:containerName:/nodeconnector/:nodeType:/:nodeId:/:nodeConnectorType:/:nodeConnectorId:/property/:propertyName:'), 
                    
    addNodeConnectorProperty: restCall('PUT', '/controller/nb/v2/switchmanager/:containerName:/nodeconnector/:nodeType:/:nodeId:/:nodeConnectorType:/:nodeConnectorId:/property/:propertyName:/:propertyValue:'), 
                    
    getNodes: restCall('GET', '/controller/nb/v2/switchmanager/:containerName:/nodes'), 
                    
    saveNodes: restCall('POST', '/controller/nb/v2/switchmanager/:containerName:/save'), 
                    
    addUser: restCall('POST', '/controller/nb/v2/usermanager/users'),
                  
    deleteUser: restCall('DELETE', '/controller/nb/v2/usermanager/users/:userName:'), 
    
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
                  
    addMgmtConnectionWithoutNodeType: restCall('PUT', '/controller/nb/v2/connectionmanager/node/:nodeId:/address/:ipAddress:/port/:port:'),
                    
    disconnectConnection: restCall('DELETE', '/controller/nb/v2/connectionmanager/node/:nodeType:/:nodeId:'),
        
    addMgmtConnectionWithKnownNodeType: restCall('PUT', '/controller/nb/v2/connectionmanager/node/:nodeType:/:nodeId:/address/:ipAddress:/port/:port:'), 
                    
    getNodeCluster: restCall('GET', '/controller/nb/v2/connectionmanager/nodes'),
       
    createBridge: restCall('POST', '/controller/nb/v2/networkconfig/bridgedomain/bridge/:nodeType:/:nodeId:/:bridgeName:'), 
                    
    deleteBridge: restCall('DELETE', '/controller/nb/v2/networkconfig/bridgedomain/bridge/:nodeType:/:nodeId:/:bridgeName:'), 
                    
    addPortToBridge: restCall('POST', '/controller/nb/v2/networkconfig/bridgedomain/port/:nodeType:/:nodeId:/:bridgeName:/:portName:'), 
                    
    deletePortFromBridge: restCall('DELETE', '/controller/nb/v2/networkconfig/bridgedomain/port/:nodeType:/:nodeId:/:bridgeName:/:portName:'), 
                    
    addPortAndVlanToBridge: restCall('POST', '/controller/nb/v2/networkconfig/bridgedomain/port/:nodeType:/:nodeId:/:bridgeName:/:portName:/:vlan:'), 
    
    //Left to add: 
    //Neutron: https://jenkins.opendaylight.org/controller/job/controller-merge/lastSuccessfulBuild/artifact/opendaylight/northbound/networkconfiguration/neutron/target/site/wsdocs/index.html
	// etc.
}