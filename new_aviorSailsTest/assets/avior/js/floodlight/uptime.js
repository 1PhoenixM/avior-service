define([
	"model/uptimemodel"
], function(Uptime){
	/* Floodlight specific URL for controller's uptime */
	Uptime.prototype.urlRoot = "/uptime";
	return Uptime;
});

