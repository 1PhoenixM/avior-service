define([
	"collection/switchCollection"
], function(SwitchCollection){
	/* Floodlight specific URL for switch features */
	SwitchCollection.prototype.url = function(){return "/wm/core/controller/switches/json";}; 
	return SwitchCollection;
});