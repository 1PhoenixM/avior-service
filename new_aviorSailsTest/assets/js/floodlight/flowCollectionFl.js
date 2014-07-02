 define([
	"backbone",
	"underscore",
	"util",
	"collection/flowCollection",
], function(Backbone,_,Util,FlowCollection){
		/* Floodlight specific URL for flows on a switch */
		FlowCollection.prototype.url = function() {return "/wm/core/switch/" + this.dpid + "/flow/json";};
		FlowCollection.prototype.initialize = function(dpid) { 
			this.dpid = dpid; 
		};
		
		FlowCollection.prototype.parse = function(response){
		    var innerArray = response[this.dpid];
   			return innerArray;
		}; 
	return FlowCollection;
});
