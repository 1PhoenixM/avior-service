define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/hostCollectionFl",
	"floodlight/switch",
	"floodlight/topologyFl",
	"view/topologyView",
	"view/controllerview",
	"view/hostview",
	"view/switchDetail",
	"text!template/controller.html",
], function($, _, Backbone, Marionette, Host, Switch, Topo, TopologyView, ControllerView, HostView, SwitchDetail, ControllerTpl){
FrontPage = Backbone.Marionette.Layout.extend({
  template: _.template(ControllerTpl),
   
 
  
  render: function() {
			
			$('#content').empty();
			$('#content').append(this.template).trigger('create');
			return this;
	},
	
			
	
	regions: {
	//content: "#content",
	leftPanel: "#leftPanel",
    rightPanel: "#rightPanel", //connects to the right-side div
 	 },
 	 
 	
 	topologyShow: function() { 
 		
        	// Clears out any previous intervals
			clearInterval(this.interval);
		
			var self = this;
			var syncCount = 0;
			
			if (this.hostCollection === undefined){
				//console.log("no host collection");
				this.hostview = new HostView({collection: new Host});
				this.hostview.delegateEvents(this.hostview.events);
				this.hostCollection = this.hostview.collection;
			}
			
			if (window.innerWidth > 1024){
				if (this.switchCollection === undefined){
					console.log("no switch collection");
					var switchDetail = new SwitchDetail({model: new Switch});
					switchDetail.delegateEvents(switchDetail.events);
																			
					switchDetail.listenTo(switchDetail.features, "sync",  function () {
						syncCount += 1;
					});
					switchDetail.listenTo(switchDetail.switchStats, "sync",  function () {
						syncCount += 1;
					});
					switchDetail.listenTo(switchDetail.description, "sync",  function () {
						syncCount += 1;
						self.switchCollection = switchDetail.collection;
						layout.rightPanel.show(new TopologyView(self.switchCollection, self.hostCollection));
					});
				}
				
				else if(this.switchCollection.models.length > 0 && this.hostCollection.models.length > 0 && this.topology === undefined){
					this.topology = new TopologyView(self.switchCollection, self.hostCollection);
					this.topology.render;
					
				}
				 
				else if (this.topology != undefined){
					this.topology.render();
				}
					
					
				
				else{
					//create graph nodes based on switch and host data
					this.hostview.listenTo(this.hostview.collection, "sync", function () {
						this.topology = new TopologyView(self.switchCollection, self.hostCollection);
						this.topology.render;
					});
				}
			}
		
 	
 	},
 	
 	 
});



return FrontPage;

});