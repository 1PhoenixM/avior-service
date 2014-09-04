//Routes.js
//This sets up routes in the GUI.
//Issue: this router file is loaded in avior.js

define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
], function($, _, Backbone, Marionette){
	
    
    /* Structure used to navigate through views */
	var PluginRouter = Marionette.AppRouter.extend({
		

	});
	return PluginRouter;
}); 