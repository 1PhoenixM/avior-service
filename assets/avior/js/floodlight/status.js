define([
	"model/statusmodel"
], function(Status){
	/* Floodlight specific URL for controller's status */
	Status.prototype.urlRoot = "/health/find";
    
    Status.prototype.parse = function(response){
		    var innerObj = response[0];
   			return innerObj;
    }; 
	return Status;
});
