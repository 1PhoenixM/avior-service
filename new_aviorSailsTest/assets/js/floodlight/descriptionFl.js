define([
	"model/description"
], function(Description){
	/* Floodlight specific URL for switch description */
	Description.prototype.url = "/switchdesc/find"; 
	
	return Description;
});