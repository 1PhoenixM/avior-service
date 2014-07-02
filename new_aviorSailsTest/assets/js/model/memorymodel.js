define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold how much controller memory is being used */
	var MemoryModel = Backbone.Model.extend({
		/* Check for controller specific URL */
		urlRoot: Util.missingCtlrErr,
		defaults: {
			total: 0,
			free: 0
		},
	});
	return MemoryModel;
});

