define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"text!template/activetpl.html"
], function($, _, Backbone, Marionette, activeTpl){
	var ActiveView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(activeTpl),
		
		initialize: function(){
			this.collapsed = true;
			this.model.fetch();
            //console.log(this.model.toJSON());
			var self = this;
			// Update the model when changes occur
			this.listenTo(this.model, "sync", this.render);
			// $('.controllerHeading').click(function() {self.clickable();});
		},
		/* This event most likely deprecated
		events: {
			"click #loadstat": "refresh",
		}, */
		// Render the model
	    render: function() {
            //console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON())); //.trigger('create')
			return this;
	    },
		refresh: function(){this.model.fetch();},
		
		//only call fetch when the view is visible
		
		/*clickable: function() {
			if (this.collapsed){
				this.collapsed = false;
				var self = this;
				this.interval = setInterval(function(){self.model.fetch()}, 4000);
			}
			else{
				this.collapsed = true;
				clearInterval(this.interval);
			}
		},*/
	});
	return ActiveView;
});
