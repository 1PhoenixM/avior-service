define([
	"model/flow"
], function(Flow){
	//* Floodlight specific URL for flows on a switch */
	Flow.prototype.urlRoot = function() {return "/flowstats/find/" + this.DPID + "";};
	return Flow;
});