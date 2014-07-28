define([
	"collection/switchCollection"
], function(SwitchCollection){
	/* Floodlight specific URL for switch features */
	SwitchCollection.prototype.url = function(){return "/switch/find";}; 
	return SwitchCollection;
});