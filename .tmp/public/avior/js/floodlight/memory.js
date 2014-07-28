define([
	"model/memorymodel"
], function(Memory){
	/* Floodlight specific URL for controller's memory */
	Memory.prototype.urlRoot = "/memory/find";
     
    Memory.prototype.parse = function(response){
		    var innerObj = response[0];
   			return innerObj;
    }; 
	return Memory;
});

