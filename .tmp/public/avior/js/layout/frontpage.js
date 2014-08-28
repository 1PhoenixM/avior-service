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
    "floodlight/controllerFl",
	"floodlight/memory",
	"floodlight/modules",
	"floodlight/status",
	"floodlight/uptime",
	"floodlight/hostCollectionFl",
	"floodlight/topologyFl",
	"view/memoryview",
	"view/modulesview",
	"view/statusview",
	"view/uptimeview",
	"view/flowEditor",
    "view/activeview",
	"text!template/controller.html",
], function($, _, Backbone, Marionette, Host, Switch, Topo, TopologyView, ControllerView, HostView, SwitchDetail, Controller, Memory, Modules, Status, Uptime, Host, Topo, MemoryView, ModulesView, StatusView, UptimeView, FlowEditor, ActiveView, ControllerTpl){
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
    
    
    controllerShow: function() {
            
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			$('#rightPanel').append(this.template).trigger('create');
								
		 	// Create views for controller aspects
            
			this.statusview = new StatusView({model: new Status});
			this.uptimeview = new UptimeView({model: new Uptime});
            this.activeview = new ActiveView({model: new Controller});	
			this.memoryview = new MemoryView({model: new Memory});
			this.modulesview = new ModulesView({model: new Modules});
			this.controllerview = new ControllerView({model: new Topo, collection: new TopologyCollection});
			this.hostview = new HostView({model: new Host});	
            
            
			// Delegate events for controller views
            
			this.statusview.delegateEvents(this.statusview.events);
			this.uptimeview.delegateEvents(this.uptimeview.events);
            this.activeview.delegateEvents(this.activeview.events);
			this.memoryview.delegateEvents(this.memoryview.events);
			this.modulesview.delegateEvents(this.modulesview.events);
			this.controllerview.delegateEvents(this.controllerview.events);
			this.hostview.delegateEvents(this.hostview.events);
			
				
			// Link controller aspects to id tags
            
			$('#uptimeview').append(this.uptimeview.render().el);
            $('#activeview').append(this.activeview.render().el);
			$('#statusview').append(this.statusview.render().el);
			$('#memoryview').append(this.memoryview.render().el);
			$('#modulesview').append(this.modulesview.render().el);
			//$('#hostview').append(this.hostview.render().el);
	
			//moved toggle button stuff back to firewallEditor.js.
			//the third parameter here indicates whether or not the buttonUpdating function in firewallEditor should be called. check initialize
			new FirewallEditor(this.switchCollection, false, true);
			
			var self = this;

			//only call fetch when the view is visible
			this.interval = setInterval(function(){
					
                    self.uptimeview.model.fetch();
                    self.activeview.model.fetch();
					self.statusview.model.fetch();
					self.memoryview.model.fetch();
					self.controllerview.model.fetch();
					//self.hostview.model.fetch();
				}, 2000);	
				
        
    },
    
    hostShow: function() {
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			// Create view for hosts
			this.hostview = new HostView({collection: new Host});
			
			// Delegate events for host view
			this.hostview.delegateEvents(this.hostview.events);
			
			this.hostCollection = this.hostview.collection;
			
			
			// Link host to id tag
			$('#rightPanel').append(this.hostview.render().el).trigger('create');
            layout.rightPanel.show(this.hostview = new HostView({collection: new Host}));
        
    },
    
    switchShow: function() {
			
			// Clears out any previous intervals
			var syncCount = 0;
			clearInterval(this.interval);
			
			var switchDetail = new SwitchDetail({model: new Switch});
            layout.rightPanel.show(new SwitchDetail({model: new Switch}));
			switchDetail.delegateEvents(switchDetail.events);
			this.switchCollection = switchDetail.collection;
			switchDetail.listenTo(switchDetail.features, "sync", syncComplete);
			switchDetail.listenTo(switchDetail.switchStats, "sync", syncComplete);
			switchDetail.listenTo(switchDetail.description, "sync", syncComplete);
			
			function syncComplete() {
  				syncCount += 1;
  				
  				if (syncCount == 3)
					switchDetail.render();
			}
        
        
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
    
    staticFlowShow: function() {
   
            //content.empty in flowEd view is clearing out whole space.
			// Clears out any previous intervals
			clearInterval(this.interval);
		
			if (this.switchCollection === undefined){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				switchDetail.listenTo(switchDetail.switchStats, "sync", function () {new FlowEditor(switchDetail.collection, true);});
			}
			else
				layout.rightPanel.show(new FlowEditor(this.switchCollection, true));				
        
    },
    

 	 
});



return FrontPage;

});