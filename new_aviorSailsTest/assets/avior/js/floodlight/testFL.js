define([
	"collection/testCollection"
], function(TstCollection){
	//* Floodlight specific URL for test stuff on a switch */
	TstCollection.prototype.url = function() {return "/wm/device/";};
	return TstCollection;
});