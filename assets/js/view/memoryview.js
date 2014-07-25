define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"text!template/memorytpl.html"
], function($, _, Backbone, Marionette, memTpl){
	var MemoryView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(memTpl),
		
		initialize: function(){
			var self = this;
			this.model.fetch();
			this.collapsed = true;
			// Update the model when changes occur
			this.listenTo(this.model, "sync", this.render);
			// $('#controllerHeading').click(function() {self.clickable();});
		},
		/* This event most likely deprecated
		events: {
			"click #loadstat": "refresh",
		}, */
		// Render the model
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
	    },
		refresh: function(){this.model.fetch();},
		
		//only call fetch when the view is visible
		/*
		clickable: function() {
			if (this.collapsed){
				this.collapsed = false;
				var self = this;
				this.interval = setInterval(function(){self.model.fetch()}, 2000);
			}
			else{
				this.collapsed = true;
				clearInterval(this.interval);
			}
		}, */
	});
	return MemoryView;
});

