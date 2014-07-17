define([
	"model/flowMod"
], function(FlowMod){
	/* Floodlight specific URL for pushing and deleting flows */
	FlowMod.prototype.urlRoot = function () {
		if (this.DPID === "one"){
			this.unset(this.DPID);
			return "/alterflow/";
		}
		else if (this.DPID === "listAll"){
			this.unset(this.DPID);
			return "/flow/find/";
		}
		else
			return "/clearflows/" + this.DPID + "" ; //clear flows by default. risky?
	};
	 
	FlowMod.prototype.initialize = function(DPID) {this.DPID = DPID;};
    
    
    //overriding the pre-existing destroy method
    //to send data along with the delete request
    //and also to ignore whether or not the model
    //being deleted is new
    FlowMod.prototype.destroy =  function(options) {
    	
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
    
	return FlowMod;
});