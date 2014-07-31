define([
	"model/controllermodel"
], function(Controller){
	//* Floodlight specific URL for flows on a switch */
	Controller.prototype.urlRoot = function() {return "/main/fetchController";};
    return Controller;
});