define([
	"underscore",
	"backbone",
	"util"
], function(_,Backbone,Util){
	/* Structure to hold modules loaded by the controller */
	var ModulesModel = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		
		/* Defaults don't seem to be necessary
		defaults: {
			modules: [],
			moduleText: ''
		},
		*/
		initialize: function(obj) {
			/* if API call successful, load custom parse */
			if (obj) { 
				var temp = this.parse(obj); 
				this.model.modules = temp;
			}
			//else console.log('failure');
		},
		
		/* Check for controller-specific custom parse */
		parse: Util.missingCtlrErr,
		
	});
	return ModulesModel;
});

