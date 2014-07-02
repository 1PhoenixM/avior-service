define([
	"model/flow"
], function(Flow){
	//* Floodlight specific URL for flows on a switch */
	Flow.prototype.urlRoot = function() {return "/wm/core/switch/" + this.dpid + "/flow/json";};
	return Flow;
});