 define([
	"backbone",
	"util",
	"model/testModel",
], function(Backbone,Util,Tst){
	/* Structure to hold flow models */
	var TestCollection = Backbone.Collection.extend({
		model: Tst,
		url: Util.missingCtlrErr,
	});
	return TestCollection;
});