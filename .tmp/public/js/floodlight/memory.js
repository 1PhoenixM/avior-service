define([
	"model/memorymodel"
], function(Memory){
	/* Floodlight specific URL for controller's memory */
	Memory.prototype.urlRoot = "/wm/core/memory/json";
	return Memory;
});

