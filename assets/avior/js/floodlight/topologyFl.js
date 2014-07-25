define([
	"collection/topologyCollection"
], function(TopologyCollection){
	/* Floodlight specific URL for topology */
	TopologyCollection.prototype.url = "/topology/find"; 
	return TopologyCollection;
}); 