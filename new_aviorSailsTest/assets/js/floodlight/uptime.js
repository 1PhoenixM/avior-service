define([
	"model/uptimemodel"
], function(Uptime){
	/* Floodlight specific URL for controller's uptime */
	Uptime.prototype.urlRoot = "/wm/core/system/uptime/json";
	return Uptime;
});

