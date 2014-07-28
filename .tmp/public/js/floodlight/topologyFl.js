define([
	"collection/topologyCollection"
], function(TopologyCollection){
	/* Floodlight specific URL for topology */
	TopologyCollection.prototype.url = "/wm/topology/links/json"; 
	return TopologyCollection;
}); 