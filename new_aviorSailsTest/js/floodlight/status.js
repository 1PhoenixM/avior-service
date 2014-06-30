define([
	"model/statusmodel"
], function(Status){
	/* Floodlight specific URL for controller's status */
	Status.prototype.urlRoot = "/wm/core/health/json";
	return Status;
});
