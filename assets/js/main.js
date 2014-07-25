/*
 * loader.js - Configures dynamic module loader and starts Avior
 */
require.config({
	paths: {
		jquery: "lib/jquery.min",
		jquerymob: "lib/jquery.mobile.min",
		responsiveTables: "lib/responsive-tables",
		underscore: "lib/lodash.min",
		backbone: "lib/backbone.min",
		marionette: "lib/backbone.marionette.min",
		template: "../../tpl",
		openflow: "openflow/ofp",
                jqm: "junaid.js/jqm-docs",
	},
    shim: {
        "backbone" : {
            deps: ["jquery", "jquerymob", "responsiveTables", "underscore"],
            exports: "Backbone"
        },
        "marionette": {
        	deps: ["jquery", "jquerymob", "responsiveTables", "underscore", "backbone"],
        	exports: "Marionette"
        }
    },
});

require([
	"avior",
        "jqm",
], function(Avior){
	Avior.initialize();
});

