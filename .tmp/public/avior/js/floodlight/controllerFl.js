define([
	"model/controllermodel"
], function(Controller){
	Controller.prototype.urlRoot = "/main/fetchController";
    
    Controller.prototype.parse = function(response){
		    var cap = response.sdncontroller.charAt(0).toUpperCase();
            var end = response.sdncontroller.substring(1, response.sdncontroller.length);
            response.sdncontroller = cap.concat(end);
   			return response;
    }; 
    return Controller;
});