define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold the controller's status */
	var StatusModel = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		defaults: {
			Health: 'unknown'
		},
	});
	
	return StatusModel;
});

