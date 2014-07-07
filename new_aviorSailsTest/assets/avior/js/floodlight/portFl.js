define([
	"model/portStatistics"
], function(PortStatistics){
	/* Floodlight specific URL for ports on a switch */
	PortStatistics.prototype.urlRoot = function() {return "/switchports/find/" + this.dpid + "";};
	PortStatistics.prototype.initialize = function(dpid) {this.dpid = dpid;};
	return PortStatistics;
});