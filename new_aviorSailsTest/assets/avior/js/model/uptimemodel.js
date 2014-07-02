define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller's uptime */
	var UptimeModel = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		defaults: {
			systemUptimeMsec: 'unknown'
		},
	});
	return UptimeModel;
});

