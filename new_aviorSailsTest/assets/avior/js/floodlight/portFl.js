define([
	"model/portStatistics"
], function(PortStatistics){
	/* Floodlight specific URL for ports on a switch */
	PortStatistics.prototype.urlRoot = function() {return "/wm/core/switch/" + this.dpid + "/port/json";};
	PortStatistics.prototype.initialize = function(dpid) {this.dpid = dpid;};
	return PortStatistics;
});