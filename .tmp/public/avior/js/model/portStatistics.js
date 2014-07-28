define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	/* Structure to hold port statistics */
	var PortStatistics = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		comparator: function(model){
    		return(model.get("PortNum"));
  		}
	});
	return PortStatistics;
}); 