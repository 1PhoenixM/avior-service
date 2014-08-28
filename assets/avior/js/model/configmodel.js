define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold the controller's status */
	var Config = Backbone.Model.extend({
		url: '',
        defaults: {
			  controller_main: "topology_view",
              host_main: "topology_view",
              switch_main: "topology_view",
              topology_main: "host_view",
              flow_main: "switch_view"
		},
	});
	
	return Config;
});