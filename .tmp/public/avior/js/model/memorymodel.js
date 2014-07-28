define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold how much controller memory is being used */
	var MemoryModel = Backbone.Model.extend({
		/* Check for controller specific URL */
		urlRoot: Util.missingCtlrErr,
		defaults: {
			TotalMemory: 0,
			FreeMemory: 0
		},
	});
	return MemoryModel;
});

