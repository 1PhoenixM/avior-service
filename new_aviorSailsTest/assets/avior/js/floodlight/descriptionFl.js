define([
	"model/description"
], function(Description){
	/* Floodlight specific URL for switch description */
	Description.prototype.url = "/wm/core/switch/all/desc/json"; 
	
	return Description;
});