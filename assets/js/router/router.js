define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"collection/topologyCollection",
	"floodlight/firewallModFl",
	"floodlight/switch",
	"view/switchDetail",
	"floodlight/memory",
	"floodlight/modules",
	"floodlight/status",
	"floodlight/uptime",
	"floodlight/hostCollectionFl",
	"floodlight/testFL",
	"floodlight/topologyFl",
	"layout/frontpage",
	"view/memoryview",
	"view/modulesview",
	"view/statusview",
	"view/uptimeview",
	"view/flowEditor",
	"view/firewallEditor",
	"view/hostview",
	"view/topologyView",
	"view/testView",
	"view/controllerview",
	"text!template/login.html",
	"text!template/controller.html",
	"text!template/content.html",
], function($, _, Backbone, Marionette, TopologyCollection, FirewallMod, Switch, SwitchDetail, Memory, Modules, Status, Uptime, Host, Test, Topo, FrontPage, MemoryView, ModulesView, StatusView, UptimeView, FlowEditor, FirewallEditor, HostView, TopologyView, TestView, ControllerView, loginTpl, controllerTpl, contentTpl){
	/* Structure used to navigate through views */
	var Router = Marionette.AppRouter.extend({
		template: _.template(controllerTpl),
		template2: _.template(loginTpl),
		template3: _.template(contentTpl),
		
		routes: {
			"home": "home",
			"controllers": "controllerRoute",
			"hosts": "hostRoute",
			"switches": "switchRoute",
			"staticflowmanager": "staticFlowRoute",
			"firewall": "firewallRoute",
			"topology": "topologyRoute",
			"ADVAlanche": "ADVAlancheRoute",
			"qos": "qosRoute",
			"vfilter": "vfilterRoute",
			"loadbalancer": "loadbalancerRoute",
		},
		
		/*initialize: function(collec, display, state) {
			this.toggleCount = 0;
			console.log(window.innerHeight);
			console.log(window.outerHeight);
			this.nameList = new Object;
			this.textFields = new Array;
			this.j = 0;
			this.collection = collec;
			// body...
			if (display)
				this.render();
		}

		render: function() {
			$('#content').empty();
			this.$el.html(this.template3({coll: this.collection.toJSON()})).trigger('create');
			// body...
		}*/

		//Where does home actally get uses within the site? It's seems as if home is a literal copy of controllerRoute. I dont think home is currently being used.
		 home: function() {
		 	$('#content').empty();
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			//This rerenders the page each time if we can set this to only render once then we might have solved the problem of the button resetting
			//This doesn't seem to do anything at all, so I commented it out for the moment.-M.I.
			//$('#content').append(this.template).trigger('create');
			
		 	// Create views for controller aspects
			this.statusview = new StatusView({model: new Status});
			this.uptimeview = new UptimeView({model: new Uptime});
			this.memoryview = new MemoryView({model: new Memory});
			this.modulesview = new ModulesView({model: new Modules});
			
		
			// Delegate events for controller views
			this.statusview.delegateEvents(this.statusview.events);
			this.uptimeview.delegateEvents(this.uptimeview.events);
			this.memoryview.delegateEvents(this.memoryview.events);
			this.modulesview.delegateEvents(this.modulesview.events);
				
			// Link controller aspects to id tags
			$('#uptimeview').append(this.uptimeview.render().el);
			$('#statusview').append(this.statusview.render().el);
			$('#memoryview').append(this.memoryview.render().el);
			$('#modulesview').append(this.modulesview.render().el);
			
			var self = this;
	
			//only call fetch when the view is visible
			this.interval = setInterval(function(){
					self.uptimeview.model.fetch();
					self.statusview.model.fetch();
					self.memoryview.model.fetch();
				}, 2000);
        },
        
        controllerRoute: function() {
        	
			$('#content').empty();
			$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
			
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			$('#content').empty();
			//This rerenders the page each time if we can set this to only render once then we might have solved the problem of the button resetting
			/*Is it possible that we could do the same as there is in firewallEditor.js and 
			have an Initialize & Render function combo and then set the page to be called in
			controllerRoute but not rerendered*/
			//this.initalize(this.controllerRoute, false, firewallStatus);
			
			$('#content').append(this.template3).trigger('create');
			$('#leftPanel').append(this.template).trigger('create');
								
		 	// Create views for controller aspects
			this.statusview = new StatusView({model: new Status});
			this.uptimeview = new UptimeView({model: new Uptime});
			this.memoryview = new MemoryView({model: new Memory});
			this.modulesview = new ModulesView({model: new Modules});
			this.controllerview = new ControllerView({model: new Topo, collection: new TopologyCollection});
			this.hostview = new HostView({model: new Host});
					
			// Delegate events for controller views
			this.statusview.delegateEvents(this.statusview.events);
			this.uptimeview.delegateEvents(this.uptimeview.events);
			this.memoryview.delegateEvents(this.memoryview.events);
			this.modulesview.delegateEvents(this.modulesview.events);
			this.controllerview.delegateEvents(this.controllerview.events);
			this.hostview.delegateEvents(this.hostview.events);
			
				
			// Link controller aspects to id tags
			$('#uptimeview').append(this.uptimeview.render().el);
			$('#statusview').append(this.statusview.render().el);
			$('#memoryview').append(this.memoryview.render().el);
			$('#modulesview').append(this.modulesview.render().el);
			//$('#hostview').append(this.hostview.render().el);
	
			//moved toggle button stuff back to firewallEditor.js.
			//the third parameter here indicates whether or not the buttonUpdating function in firewallEditor should be called. check initialize
			new FirewallEditor(this.switchCollection, false, true);
		
			document.title = 'Avior - Controllers';
			//refactor titleChange to a function that takes in the new title as parameter
	
			layout = new FrontPage();
			layout.topologyShow();
			
	
			var self = this;

			//only call fetch when the view is visible
			this.interval = setInterval(function(){
					self.uptimeview.model.fetch();
					self.statusview.model.fetch();
					self.memoryview.model.fetch();
					self.controllerview.model.fetch();
					//self.hostview.model.fetch();
				}, 2000);	
				
        }, 
        
        hostRoute: function() {
			$('#content').empty();
			$('#leftPanel').empty();
			$('#rightPanel').empty();
			$('#content').append('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			// Create view for hosts
			this.hostview = new HostView({collection: new Host});
			
			// Delegate events for host view
			this.hostview.delegateEvents(this.hostview.events);
			
			this.hostCollection = this.hostview.collection;
			
			document.title = 'Avior - Hosts';
			
			layout = new FrontPage();
			layout.topologyShow();
			
			
			// Link host to id tag
			$('#content').empty();
			$('#content').append(this.template3).trigger('create');
			$('#leftPanel').append(this.hostview.render().el).trigger('create');
			
        },
		
		switchRoute: function() {
			
			$('#content').empty();
			$('#leftPanel').empty();
			$('#rightPanel').empty();
			$('#content').append('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
			
			// Clears out any previous intervals
			var syncCount = 0;
			clearInterval(this.interval);
			
			var switchDetail = new SwitchDetail({model: new Switch});
			switchDetail.delegateEvents(switchDetail.events);
			this.switchCollection = switchDetail.collection;
			switchDetail.listenTo(switchDetail.features, "sync", syncComplete);
			switchDetail.listenTo(switchDetail.switchStats, "sync", syncComplete);
			switchDetail.listenTo(switchDetail.description, "sync", syncComplete);
			
			document.title = 'Avior - Switches';
			
					
			$('#content').append(this.template3).trigger('create');
				
			layout = new FrontPage();
			layout.topologyShow();
	
			function syncComplete() {
  				syncCount += 1;
  				
  				if (syncCount == 3)
					switchDetail.render();
			}
			
		},
		
		staticFlowRoute: function() {
			$('#content').empty();
			$('#leftPanel').empty();
			$('#rightPanel').empty();
			$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');

			// Clears out any previous intervals
			clearInterval(this.interval);
			
			document.title = 'Avior - Static Flow Manager';
			

			if (this.switchCollection === undefined){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				switchDetail.listenTo(switchDetail.switchStats, "sync", function () {new FlowEditor(switchDetail.collection, true);});
			}
			else
				new FlowEditor(this.switchCollection, true);
				$('#content').append(this.template3).trigger('create');
				layout = new FrontPage();
				layout.topologyShow();
        },
        
        firewallRoute: function() {
        	$('#content').empty();
        	$('#leftPanel').empty();
			$('#rightPanel').empty();
			$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');

			// Clears out any previous intervals
			clearInterval(this.interval);
			
			document.title = 'Avior - Firewall';
			
			if (this.switchCollection === undefined){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				switchDetail.listenTo(switchDetail.switchStats, "sync", function () {new FirewallEditor(switchDetail.collection, true);});
			}
			else
				new FirewallEditor(this.switchCollection, true, false);
			$('#content').append(this.template3).trigger('create');
			layout = new FrontPage();
			layout.topologyShow();
			
				
        },
        
        topologyRoute: function () {
        	
        	$('#content').empty();
        	$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
        	
        	var syncCount = 0;
        	
        	// Clears out any previous intervals
			clearInterval(this.interval);
			
			document.title = 'Avior - Network Topology';
			$('#content').empty();
			
			var self = this;
			if (this.hostCollection === undefined){
				//console.log("no host collection");
				this.hostview = new HostView({collection: new Host});
				this.hostview.delegateEvents(this.hostview.events);
				this.hostCollection = this.hostview.collection;
			}
			
			if (this.switchCollection === undefined){
				//console.log("no switch collection");
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
																		
				switchDetail.listenTo(switchDetail.features, "sync", syncComplete);
				switchDetail.listenTo(switchDetail.switchStats, "sync", syncComplete);
				switchDetail.listenTo(switchDetail.description, "sync", syncComplete);
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
			
			function syncComplete() {
				//console.log("sync complete");
  					syncCount += 1;
  				
  					if (syncCount == 3)
  						renderSwitches();
			}
			
			function renderSwitches() {
					//console.log("renderSwitches");
  					self.switchCollection = switchDetail.collection;
					//create graph nodes based on switch and host data
					self.topology = new TopologyView(self.switchCollection, self.hostCollection);										
					self.topology.render();
					
						
			}
        },
        
        ADVAlancheRoute: function () {
        	//$('#content').empty();
        	// Clears out any previous intervals
			//clearInterval(this.interval);
			//console.log("advalanche.cs.marist.edu");
			//$('#content').append("ADVAlanche Coming Soon!");
        },

         qosRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			document.title = 'Avior - QoS';
			
			//this.testView = new TestView({model: new Test});
			
			$('#content').append("QoS Coming Soon!");
        },
        
         vfilterRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			document.title = 'Avior - Virtual Network Filter';
			
			$('#content').append("Virtual Network Filter Coming Soon!");
        },
        
         loadbalancerRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			document.title = 'Avior - Load Balancer';
			
			$('#content').append("Load Balancer Coming Soon!");
        },
        
        liveUpdate: function(switchDetail) {
        	console.log(switchDetail.collection);
        	//live update when view is visible
			var self = this;
			_.forEach(switchDetail.collection.models, function(item) {
				console.log("hello");
				var dp = item.get("dpid");
				this.interval = setInterval(function(){switchDetail.displayFlow(dp, item);}, 2000);
			}, this);
        },

	});
	return Router;
}); 