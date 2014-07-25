define([
	"model/portStatistics"
], function(PortStatistics){
	/* URL for ports on a switch */
	PortStatistics.prototype.urlRoot = function() {return "/switchports/find/" + this.DPID + "";};
	PortStatistics.prototype.initialize = function(DPID) {this.DPID = DPID;};
	return PortStatistics;
});