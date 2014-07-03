define([
	"model/statusmodel"
], function(Status){
	/* Floodlight specific URL for controller's status */
	Status.prototype.urlRoot = "/health";
	return Status;
});
