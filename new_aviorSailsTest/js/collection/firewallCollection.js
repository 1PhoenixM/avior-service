 define([
	"backbone",
	"util",
	"model/firewallMod",
], function(Backbone,Util,FirewallMod){
	/* Structure to hold firewall models */
	var FirewallCollection = Backbone.Collection.extend({
		model: FirewallMod,
		url: Util.missingCtlrErr,
	});
	return FirewallCollection;
});