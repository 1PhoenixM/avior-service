define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"view/switch",
	"collection/switchCollection",
	"text!template/switches.html",
	"text!template/switchHeading.html",
], function($, _, Backbone, Marionette, SwitchView, SwitchCollection, swtchsTpl, header){
	var SwitchesView = Backbone.View.extend({
		el: $('body'),
			
		template1: _.template(swtchsTpl),
		template2: _.template(header),
			
		// construct a new collection with switch info from server
		// and render this collection upon sync with server 
		/*initialize: function(item){
			var self = this;
			this.collection = new SwitchCollection();
			this.collection.fetch();	
			this.listenTo(this.collection, "sync", this.render);
		},*/
		
		events: {
			"click button": "refresh",
		},
		
		// render the heading and table template, 
		// then render each model in this.collection
		render: function() {
			this.$el.html(this.template2(this.model.toJSON()));
			this.$el.append(this.template1);
			
			var self = this;

			_.forEach(this.collection.models, function(item) {
  				self.renderSwitch(item);
			}, this);

			//logs what models are inside this.collection
			_.forEach(this.collection.models, function(item) {
  				console.log(JSON.stringify(item));
			}, this);
			
			
			return this;
		},
		
		//renders a models view and appends it to the table element
		renderSwitch: function(item){
			var switchView = new SwitchView({
				model: item
			});
			$('#switchTable').append(switchView.render().el);
		},
		
		//updates this.collection with the latest switch info from server
		refresh: function(evt){console.log(evt.currentTarget.id); this.collection.fetch();}
	});
	return SwitchesView;
});