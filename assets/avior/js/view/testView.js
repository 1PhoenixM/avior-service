define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/testFL",
	"text!template/testtpl.html"
], function($, _, Backbone, TestCollection, testTpl){
	var TestView = Backbone.View.extend({
	    el: $('#content'),
	    
		template: _.template(testTpl),
		
		initialize: function(){
			this.collection = new TestCollection();
			this.collection.fetch();
			// Update the collection when changes occur
			this.listenTo(this.collection, "sync", this.render);
		},
		
		// Render the collection
	    render: function() {
	    	$('#content').empty();
			this.$el.html(this.template({tsts: this.collection.models})).trigger('create');
			return this;
	    },
	});
	return TestView;
});