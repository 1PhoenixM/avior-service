////////////////////////////TODO: ModifySubnet is a POST request? Should it be PUT? a lot of put/post stuff
var http = require('http');
var OFP = require('./ofp.js'); //v1.0.0
var toClient = require('./controller.js');
var normalizer = '';

module.exports = {
//    hostname: 'localhost',
	normalize: function (obj) {
        if(normalizer === "PortStats"){
            var Port = new OFP.PortStats();
            var aPort = obj["portStatistics"][0]["portStatistic"][0];
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
        }
        else if(normalizer === "FlowStats"){
            var Flow = new OFP.FlowStats();
            var aFlow = obj["flowStatistics"][2]["flowStatistic"][0];
            Flow.table_id = aFlow.tableId;
                normalizer = "Match";
                Flow.match = this.normalize(aFlow.flow.match.matchField[0]); 
            Flow.duration_sec = aFlow.durationSeconds;
            Flow.duration_nsec = aFlow.durationNanoseconds;
            Flow.priority = aFlow.flow.priority;
            Flow.idle_timeout = aFlow.flow.idleTimeout;
            Flow.hard_timeout = aFlow.flow.hardTimeout;
            Flow.cookie = aFlow.flow.id;
            Flow.packet_count = aFlow.packetCount;
            Flow.byte_count = aFlow.byteCount;
                normalizer = "Action";
                Flow.actions = this.normalize(aFlow.flow.actions[0]); 
            return Flow;
        }
        else if(normalizer === "Match"){
            var Match = new OFP.Match();
            return Match;
        }
        else if(normalizer === "Action"){
            var Action = new OFP.Action(null);
            return Action;
        }
        else{
            return {};
        }
	},
    
              
    getFlowStats: function(containerName) {
		var self = this;
        if (!containerName) { containerName = 'default'; }
        normalizer = "FlowStats";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/'+containerName+'/flow',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getFlowStatsByNode: function(containerName, nodeType, nodeId) {
		var self = this;
        if (!containerName) { containerName = 'default'; }
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/'+containerName+'/flow/node/'+nodeType+'/'+nodeId+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getPortStats: function(containerName) {
		var self = this;
        if (!containerName) { containerName = 'default'; }
        normalizer = "PortStats";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/'+containerName+'/port',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getPortStatsByNode: function(containerName, nodeType, nodeId) {
		var self = this;
        if (!containerName) { containerName = 'default'; }
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/'+containerName+'/port/node/'+nodeType+'/'+nodeId+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getTableStats: function(containerName) {
		var self = this;
        if (!containerName) { containerName = 'default'; }
        normalizer = "TableStats";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/'+containerName+'/table',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getTableStatsByNode: function(containerName, nodeType, nodeId) {
		var self = this;
        if (!containerName) { containerName = 'default'; }
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/statistics/'+containerName+'/table/node/'+nodeType+'/'+nodeId+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
    
          
    getTopology: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/topology/'+containerName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	}, 
        
    addTopologyLinks: function(containerName, name) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/topology/'+containerName+'/userLink/'+name+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
        
    deleteTopologyLinks: function(containerName, name) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/topology/'+containerName+'/userLink/'+name+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
        
    getTopologyLinks: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/topology/'+containerName+'/userLinks',auth:'admin:admin'}, toClient(self));
        req.end();
	},
        
    getHost: function(containerName, networkAddress) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/hosttracker/'+containerName+'/address/'+networkAddress+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
        
    addHost: function(containerName, networkAddress) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/hosttracker/'+containerName+'/address/'+networkAddress+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    deleteHost: function(containerName, networkAddress) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/hosttracker/'+containerName+'/address/'+networkAddress+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getHosts: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/hosttracker/'+containerName+'/hosts/active',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getInactiveHosts: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/hosttracker/'+containerName+'/hosts/inactive',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getFlows: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/flowprogrammer/'+containerName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getFlowsByNode: function(containerName, nodeType, nodeId) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/flowprogrammer/'+containerName+'/node/'+nodeType+'/'+nodeId+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getFlow: function(containerName, nodeType, nodeId, name) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/flowprogrammer/'+containerName+'/node/'+nodeType+'/'+nodeId+'/staticFlow/'+name+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
        
    addFlow: function(containerName, nodeType, nodeId, name) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/flowprogrammer/'+containerName+'/node/'+nodeType+'/'+nodeId+'/staticFlow/'+name+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    deleteFlow: function(containerName, nodeType, nodeId, name) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/flowprogrammer/'+containerName+'/node/'+nodeType+'/'+nodeId+'/staticFlow/'+name+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    toggleFlow: function(containerName, nodeType, nodeId, name) {
		var self = this;
        normalizer = "";
		req = http.request({method:'POST',hostname:this.hostname,port:8080,path:'/controller/nb/v2/flowprogrammer/'+containerName+'/node/'+nodeType+'/'+nodeId+'/staticFlow/'+name+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getStaticRoute: function(containerName, route) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/staticroute/'+containerName+'/route/'+route+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    addStaticRoute: function(containerName, route) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/staticroute/'+containerName+'/route/'+route+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
            
    deleteStaticRoute: function(containerName, route) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/staticroute/'+containerName+'/route/'+route+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    getStaticRoutes: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/staticroute/'+containerName+'/routes',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
    getSubnet: function(containerName, subnetName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/subnetservice/'+containerName+'/subnet/'+subnetName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    addSubnet: function(containerName, subnetName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/subnetservice/'+containerName+'/subnet/'+subnetName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
            
    deleteSubnet: function(containerName, subnetName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/subnetservice/'+containerName+'/subnet/'+subnetName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    modSubnet: function(containerName, subnetName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'POST',hostname:this.hostname,port:8080,path:'/controller/nb/v2/subnetservice/'+containerName+'/subnet/'+subnetName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    getSubnets: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/subnetservice/'+containerName+'/subnets',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    getNodeConnectors: function(containerName, nodeType, nodeId) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/switchmanager/'+containerName+'/node/'+nodeType+'/'+nodeId+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    getNodeProperty: function(containerName, nodeType, nodeId, propertyName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/switchmanager/'+containerName+'/node/'+nodeType+'/'+nodeId+'/property/'+propertyName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
                    
    deleteNodeProperty: function(containerName, nodeType, nodeId, propertyName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/switchmanager/'+containerName+'/node/'+nodeType+'/'+nodeId+'/property/'+propertyName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    addNodeProperties: function(containerName, nodeType, nodeId, propertyName, propertyValue) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:' /controller/nb/v2/switchmanager/'+containerName+'/node/'+nodeType+'/'+nodeId+'/property/'+propertyName+'/'+propertyValue+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    deleteNodeConnectorProperty: function(containerName, nodeType, nodeId, nodeConnectorType, nodeConnectorId, propertyName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/switchmanager/'+containerName+'/nodeconnector/'+nodeType+'/'+nodeId+'/'+nodeConnectorType+'/'+nodeConnectorId+'/property/'+propertyName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    addNodeConnectorProperty: function(containerName, nodeType, nodeId, nodeConnectorType, nodeConnectorId, propertyName, propertyValue) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/switchmanager/'+containerName+'/nodeconnector/'+nodeType+'/'+nodeId+'/'+nodeConnectorType+'/'+nodeConnectorId+'/property/'+propertyName+'/'+propertyValue+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    getNodes: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/switchmanager/'+containerName+'/nodes',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    saveNodes: function(containerName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'POST',hostname:this.hostname,port:8080,path:'/controller/nb/v2/switchmanager/'+containerName+'/save',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    addUser: function() {
		var self = this;
        normalizer = "";
		req = http.request({method:'POST',hostname:this.hostname,port:8080,path:'/controller/nb/v2/usermanager/users',auth:'admin:admin'}, toClient(self));
        req.end();
	},
        
                    
    deleteUser: function(userName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/usermanager/users/'+userName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
    getContainer: function(container) {
		var self = this;
        normalizer = "Container";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    createContainer: function(container) {
		var self = this;
        normalizer = "CreateContainer";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    deleteContainer: function(container) {
		var self = this;
        normalizer = "DeleteContainer";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
    getFlowSpec: function(container, flowspec) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'/flowspec/'+flowspec+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
        
    addFlowSpec: function(container, flowspec) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'/flowspec/'+flowspec+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    deleteFlowSpec: function(container, flowspec) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'/flowspec/'+flowspec+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    getFlowSpecs: function(container) {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'/flowspecs',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
    addNodeConnectors: function(container) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'/nodeconnector',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    removeNodeConnectors: function(container) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/container/'+container+'/nodeconnector',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
    getContainers: function() {
		var self = this;
        normalizer = "Containers";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/containermanager/containers',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
                    
    addMgmtConnectionWithoutNodeType: function(nodeId, ipAddress, port) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/connectionmanager/node/'+nodeId+'/address/'+ipAddress+'/port/'+port+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    disconnectConnection: function(nodeType, nodeId) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/connectionmanager/node/'+nodeType+'/'+nodeId+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    addMgmtConnectionWithKnownNodeType: function(nodeType, nodeId, ipAddress, port) {
		var self = this;
        normalizer = "";
		req = http.request({method:'PUT',hostname:this.hostname,port:8080,path:'/controller/nb/v2/connectionmanager/node/'+nodeType+'/'+nodeId+'/address/'+ipAddress+'/port/'+port+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    getNodeCluster: function() {
		var self = this;
        normalizer = "";
		req = http.request({method:'GET',hostname:this.hostname,port:8080,path:'/controller/nb/v2/connectionmanager/nodes',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    createBridge: function(nodeType, nodeId, bridgeName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'POST',hostname:this.hostname,port:8080,path:'/controller/nb/v2/networkconfig/bridgedomain/bridge/'+nodeType+'/'+nodeId+'/'+bridgeName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    deleteBridge: function(nodeType, nodeId, bridgeName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/networkconfig/bridgedomain/bridge/'+nodeType+'/'+nodeId+'/'+bridgeName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    addPortToBridge: function(nodeType, nodeId, bridgeName, portName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'POST',hostname:this.hostname,port:8080,path:'/controller/nb/v2/networkconfig/bridgedomain/port/'+nodeType+'/'+nodeId+'/'+bridgeName+'/'+portName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    deletePortFromBridge: function(nodeType, nodeId, bridgeName, portName) {
		var self = this;
        normalizer = "";
		req = http.request({method:'DELETE',hostname:this.hostname,port:8080,path:'/controller/nb/v2/networkconfig/bridgedomain/port/'+nodeType+'/'+nodeId+'/'+bridgeName+'/'+portName+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
                    
    addPortAndVlanToBridge: function(nodeType, nodeId, bridgeName, portName, vlan) {
		var self = this;
        normalizer = "";
		req = http.request({method:'POST',hostname:this.hostname,port:8080,path:'/controller/nb/v2/networkconfig/bridgedomain/port/'+nodeType+'/'+nodeId+'/'+bridgeName+'/'+portName+'/'+vlan+'',auth:'admin:admin'}, toClient(self));
        req.end();
	},
    
    //Left to add: 
    //Neutron: https://jenkins.opendaylight.org/controller/job/controller-merge/lastSuccessfulBuild/artifact/opendaylight/northbound/networkconfiguration/neutron/target/site/wsdocs/index.html
    
}