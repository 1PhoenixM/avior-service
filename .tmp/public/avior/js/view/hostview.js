define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/hostCollectionFl",
	"text!template/hosts.html",
    "text!template/content.html"
], function($, _, Backbone, Marionette, HostCollection, hostTableTpl, contentTpl){
	var HostView = Backbone.View.extend({
	    tagName: "div",
        
        //el: $('#content'),
	    
		template: _.template(hostTableTpl),
        template1: _.template(contentTpl),
		
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
            
            /*this.$el.append(this.template1()).trigger('create');
			this.$('#leftPanel').empty();
            
			//If on main page, load fullscreen. If on any other page, load to right side only.
			if(document.title === "Avior - Hosts"){
			this.$('#leftPanel').html(this.template({hosts: this.collection.models})).trigger('create');
			return this;
			}
			else{
			this.$('#rightPanel').html(this.template({hosts: this.collection.models})).trigger('create');
			return this;
			}*/
            
            this.$el.html(this.template({hosts: this.collection.models})).trigger('create');
			return this;
        
	    },
		refresh: function(){this.collection.fetch();},
		
		
	});
	return HostView;
});

