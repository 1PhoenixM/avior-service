define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"collection/topologyCollection",
	"floodlight/firewallModFl",
	"text!template/firewallEditor.html",
	"text!template/actionSelect.html",
	"text!template/controller.html",
	"view/topologyView",
], function($, _, Backbone, Marionette, TopologyCollection, FirewallMod, firewallEditor, actionSelect, controllerTpl, TopologyView){
	var ControllerView = Backbone.Marionette.CompositeView.extend({
		el: $('#content'),
		 itemView: TopologyView,
		 collectionView: TopologyCollection,
		  tagName: "div",
		 itemViewContainer: "div",
		//template: controllerTpl,
		
		template: _.template(controllerTpl),


		initialize: function(){
			this.render();
		},

		events: {
			"click #leftMenuIcon": "resize",
			"click #rightMenuIcon": "resize",
		},
		
		appendHtml: function(collectionView, itemView){
			if(window.innerWidth < 1440){
			collectionView.$("#topologyView").append(itemView.tagname);
			}
		},

		render: function() {
			//$('#container2').remove();
			//$('#content').empty();
			//this.$el.html(this.template(this.model.toJSON())).trigger('create');
			//return this;
		},

		resize: function(){
		
                var winHeight = window.innerHeight;
                document.getElementById("leftMenu").style.height = winHeight + "px";
                document.getElementById("rightMenu").style.height = winHeight + "px";
                document.getElementById("content").style.height = winHeight + "px";
		},
	
	});
	return ControllerView;
});