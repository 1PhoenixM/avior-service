define([
	"backbone",
	"util",
], function(Backbone, Util){
	
	/* Structure to hold switch features */
	var Features = Backbone.Model.extend({
		
		comparator: function(model){
    		return(model.get("PortNum"));
  		}
		
	});
	
	return Features;
}); 