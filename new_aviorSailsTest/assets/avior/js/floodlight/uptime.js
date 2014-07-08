define([
	"model/uptimemodel"
], function(Uptime){
	Uptime.prototype.urlRoot = "/uptime/find";
    
    Uptime.prototype.parse = function(response){
		    var innerObj = response[0];
   			return innerObj;
    }; 
	return Uptime;
});