define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold the controller's status */
	var Controller = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		defaults: {
			sdncontroller: 'Not set at localhost:1337.',
            icon: ''
		},
	});
	
	return Controller;
});