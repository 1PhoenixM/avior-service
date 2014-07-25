 define([
	"backbone",
	"underscore",
	"util",
	"collection/hostCollection",
], function(Backbone,_,Util,HostCollection){
	/* Floodlight specific URL for devices on a network */
	HostCollection.prototype.url = function() {return "/host/find";};
		
	return HostCollection;
});
