define([
	"model/firewallMod"
], function(FirewallMod){
	/* Floodlight specific URL for pushing and deleting firewall rules */
	FirewallMod.prototype.urlRoot = function () {
		if (this.op != undefined){
			console.log("if");
			return "/wm/firewall/module/" + this.op + "/json";
		}
		else {
			console.log("else");
			this.unset(this.op);
			return "/wm/firewall/rules/json";
		}
	};
	 
	FirewallMod.prototype.initialize = function(op) {this.op = op;};
    
    
    //overriding the pre-existing destroy method
    //to send data along with the delete request
    //and also to ignore whether or not the model
    //being deleted is new
    FirewallMod.prototype.destroy =  function(options) {
    	
    	//properly formats data for back-end to parse
    	if ( options.data ) {
            options.data = JSON.stringify(options.data);
        }
        
     	var model = this;
      	var success = options.success;

      	var destroy = function() {
        	model.trigger('destroy', model, model.collection, options);
      	};

      	options.success = function(resp) {
        	model.trigger('sync', model, resp, options);
      	};

      	var xhr = this.sync('delete', this, options);
      
      	return xhr;
    };
    
	return FirewallMod;
});