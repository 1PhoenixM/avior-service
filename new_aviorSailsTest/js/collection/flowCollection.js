 define([
	"backbone",
	"util",
	"model/flow",
], function(Backbone,Util,Flow){
	/* Structure to hold flow models */
	var FlowCollection = Backbone.Collection.extend({
		model: Flow,
		url: Util.missingCtlrErr,
	});
	return FlowCollection;
});