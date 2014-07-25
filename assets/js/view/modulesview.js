define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"text!template/modulestpl.html"
], function($, _, Backbone, Marionette, modTpl){
	var ModulesView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(modTpl),
		
		initialize: function(){
			var self = this;
			this.model.fetch();
			// Update when changes occur to the model
			this.listenTo(this.model, "sync", this.render);
		},
		
		// This is most likely deprecated
		events: {
			"click #loadmod": "refresh",
		},
		// Render the model
	    render: function() {
			this.$el.html(this.template({mods: this.model.toJSON()}));
			return this;
	    },
		refresh: function(){this.model.fetch();}
	});
	return ModulesView;
});

