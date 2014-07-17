define([
	"model/modulesmodel"
], function(Modules){
	/* Floodlight specific URL for modules loaded by controller */
	Modules.prototype.urlRoot = "/modules";
	
	/* Floodlight specific parse method */
	Modules.prototype.parse = function(resp){
		var newResp = new Array;
		/* For each element in the JSON, push a new entry to newResp */
		for (x in resp){
			newResp.push(x);
		}
		/* Return parsed elements */
		return newResp;
	};
	
	return Modules;
});

