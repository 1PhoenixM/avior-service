define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/hostCollectionFl",
	"text!template/hosts.html"
], function($, _, Backbone, Marionette, HostCollection, hostTableTpl){
	var HostView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(hostTableTpl),
		
		initialize: function(){
			var self = this;
			this.collection = new HostCollection();
			this.collection.fetch();
			this.collapsed = true;
			// Update the collection when changes occur
			this.listenTo(this.collection, "sync", this.render);
			$('#displayhosts').click(function() {self.clickable();});
		},
		
		// Button to refresh hosts
		events: {
			"click #refreshhosts": "refresh",
		},
		
		refresh: function(){this.model.fetch();},
		
		// Render the collection
	    render: function() {
			this.$el.html(this.template({hosts: this.collection.models})).trigger('create');
			return this;
	    },
		refresh: function(){this.collection.fetch();},
		
		
	});
	return HostView;
});

