 define([
	"backbone",
	"underscore",
	"util",
	"collection/flowCollection",
], function(Backbone,_,Util,FlowCollection){
		/* Avior 2.0 URL for flows on a switch */
		FlowCollection.prototype.url = function() {return "/flowstats/find/" + this.DPID + "";};
		FlowCollection.prototype.initialize = function(DPID) { 
			this.DPID = DPID; 
		};
		
		FlowCollection.prototype.parse = function(response){
		    var innerArray = response[this.DPID];
   			return innerArray;
            // for uptime, do something like this
            // get and return response[0]
		}; 
	return FlowCollection;
});