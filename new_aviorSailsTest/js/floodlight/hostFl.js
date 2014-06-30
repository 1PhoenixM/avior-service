define([
	"model/host"
], function(Host){
	//get list of flows connected to controller
	Host.prototype.urlRoot = function() {return "/wm/device/";};
	return Host;
});