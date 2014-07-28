define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/featuresFl",
	"floodlight/switchStatisticsFl",
	"text!template/switch.html"
], function($, _, Backbone, Marionette, Features, SwitchStats, switchTpl){
	var SwitchSumView = Backbone.Marionette.ItemView.extend({
		//tagName: "li",
		
		template: _.template(switchTpl),
		
		initialize: function(options){
			//console.log(this.el);
    		//console.log(JSON.stringify(options.features));
    		//console.log(JSON.stringify(options.stats));
    		//this.$el.attr("collapsibleDpid");
    		//this.$el.attr("data-role", "collapsible");
  		},
		
		//render the switch model using the template
		render: function() {
			//$(this.el).attr('id', 'pleaseWork');
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
				
	});
	return SwitchSumView;
});
