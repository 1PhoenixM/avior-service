define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	//"floodlight/optiocalPortsFl",
	"floodlight/featuresFl",
	"floodlight/switchStatisticsFl",
	"view/switchSummary", // should rename this, maybe SwitchSummary?
	"collection/switchCollection",
	"floodlight/descriptionFl",
	"collection/portCollection",
	"floodlight/portFl",
	"model/port",
	"model/portStatistics",
	"floodlight/flowModFl",
	"view/flowEditor",
	"floodlight/flowCollectionFl",
	"text!template/switchContainer.html",
	"text!template/switchHeading.html",
	"text!template/description.html",
	"text!template/portTable.html",
	"text!template/portRow.html",
	"text!template/flowTable.html",
	"text!template/flowEntry.html",
	"text!template/flowCount.html",
	"text!template/content.html",
], function($, _, Backbone, Marionette, Features, SwitchStats, SwitchSummary, SwitchCollection, Description, PortCollection, PortFL, Port, PortStatistics, FlowMod, FlowEditor, FlowCollection, swtchContainer, header, descrip, portFrame, portRow, flowFrame, flowRow, flowCount, contentTpl){
	var SwitchesSumView = Backbone.View.extend({
		itemView: SwitchSummary,
		
		el: $('#content'),
			
		template1: _.template(swtchContainer),
		template2: _.template(header),
		template3: _.template(descrip),
		template4: _.template(portFrame),
		template5: _.template(portRow),
		template6: _.template(flowFrame),
		template7: _.template(flowRow),
		template8: _.template(flowCount),
		template9: _.template(contentTpl),
		currentDPID: '',
			
		// construct a new collection with switch info from server
		// and render this collection upon sync with server 	
		initialize: function(item){
			//localStorage.loggedIn = false;
			//console.log(Backbone.history.length);
			//console.log( $( "#content" ).data( "loggedIn" ));
			//console.log("HELLO");
			var self = this;
			this.syncCount = 0;
			this.opticalVendors = ["ADVA Optical Networking"];
			this.collapsed = true;
			this.subnets = new Array;
			this.collection = new SwitchCollection();
			this.collection.fetch();
			this.description = new Description();
			this.description.fetch();
			this.features = new Features();
			this.features.fetch();
			this.switchStats = new SwitchStats();
			this.switchStats.fetch();	
			this.listenTo(this.features, "sync", this.syncComplete);
			this.listenTo(this.description, "sync", this.syncComplete);
			this.listenTo(this.switchStats, "sync", this.syncComplete);
			//this.switchList = $('<div/>').html(this.template1).contents();
		},
		
		events: {
			"click #loadswtch": "refresh",
			//"click #flowMod": "modFlows",
			"click #removeFlo": "deleteFlow",
		},
		
		syncComplete: function() {
			//console.log("HELLO");
			this.syncCount += 1;
			
			if (this.syncCount === 3)
				this.setCollection();
		},
		
		//render the heading and table template, 
		//then render each model in this.collection
		render: function() {
		    //console.log("in render");
		    // hack to turn template HTML into object without yet adding it to document
		    var switchList = $('<div/>').html(this.template1).contents();
			var self = this;

			_.forEach(self.collection.models, function(item) {
  				self.renderSwitch(item, switchList);
			}, this);
			
			switchCount = this.collection.length;
			
			//Loads to leftPanel
			this.$el.html(this.template9(switchCount)).trigger('create');
			this.$('#leftPanel').html(this.template2(switchCount)).trigger('create');
			switchList.appendTo(this.$('#leftPanel')).trigger('create');
			
			//switch details appending...move to specific 
			//functions for description, ports, flows
			_.forEach(self.collection.models, function(item) {
				//console.log("ITEM");
				//console.log(item);
				var dp = item.get("dpid");	
				this.displayDesc(dp, item);
				this.displayPorts(dp, item);
    	 		this.displayFlows(dp, item);		
			}, this);		
			return this;
		},
		
		//set the attribute of this.collection
		setCollection: function () {
			//console.log("HELLO");
			var self = this;
			_.forEach(this.collection.models, function(item) {
						//console.log(self.features);
						var dp = item.get("dpid");
						item.set("description", self.description.get(dp));
						item.set("features", self.features.get(dp));
						item.set("switchStatistics", self.switchStats.get(dp));
						item.set("id", item.get("dpid"));
  						//self.renderSwitch(item, switchList);
  						//console.log((item));
					}, this);
					
			//console.log(JSON.stringify(description.get("00:00:00:00:00:00:00:03")));
		},
		
		//display the dpid list
		renderSwitch: function(item,container){
			var switchSum = new SwitchSummary({
				model: item
			});
			container.append(switchSum.render().el);
		},
		
		
		//attach switch description info to page
		displayDesc: function(dpid, oneSwitch){
			var x = document.getElementById("my" + dpid);
			var desc = this.description.get(dpid);
			this.manufacturer = desc[0]["manufacturerDescription"];
			desc[0]["dpid"] = dpid;
			desc[0]["connectedSince"] = oneSwitch.get("connectedSince");
			//console.log(JSON.stringify(desc));	
			$(x).append(this.template3(desc[0])).trigger('create');
		},
		
		//attach port info to page
		displayPorts: function(dpid, oneSwitch){
			var self = this;
			var x = document.getElementById("my" + dpid);
			var y = document.getElementById("container" + dpid);
			$(y).append(this.template4(oneSwitch.toJSON())).trigger('create');
			var ports = new PortCollection();
			var portArray = oneSwitch.get("features").ports;
			//console.log("PORT ARRAY");
			//console.log(JSON.stringify(oneSwitch.get("features")));
			var portStatArray = new PortStatistics(dpid);
					
			
			//get port statistics, append as a submodel to port model
			//and append port model to port collection
			var optical = false;
			//console.log(this.manufacturer);
			_.forEach(this.opticalVendors, function(item) {
				if (item === self.manufacturer)
					optical = true;
        		}, this);
			
			
			//console.log(JSON.stringify(oneSwitch.get("features")));
			
			
			if (optical === false){
			
			portStatArray.fetch().complete(function () {
				var numPorts = 0;
				_.forEach(portArray, function(item) {
					//console.log("PORT STAT ARRAY");
					     //console.log(JSON.stringify(portStatArray));
					var p = new Port(item);
					p.set("portStatistics", portStatArray.get(dpid)[numPorts]);
					     //console.log(JSON.stringify(oneSwitch));
					     //console.log(JSON.stringify(p));
        			ports.add(p);
        			numPorts += 1;
        		}, this);
     					
     					
        		_.forEach(ports.models, function(item) {
        			     console.log(JSON.stringify(item));
        			var z = document.getElementById("portTable" + dpid);
					$(z).append(self.template5(item.toJSON())).trigger('create');
        		}, this);
        		oneSwitch.set("portModel", ports);
        		//console.log(JSON.stringify(item));
        		//console.log(JSON.stringify(oneSwitch));
        		//console.log(JSON.stringify(oneSwitch.get("features").ports));
        	});
        	
        	}
        	
        	else{
        		//console.log(JSON.stringify(oneSwitch));
        		console.log(JSON.stringify(oneSwitch.get("features").ports));
				_.forEach(oneSwitch.get("features").ports, function(item) {
					//console.log(item);
					item["portStatistics"] = null;
        			var z = document.getElementById("portTable" + dpid);
					$(z).append(self.template5(item)).trigger('create');
        		}, this);   		
        	
        	}
		},
		
		//attach flow info to page
		displayFlows: function(dpid, oneSwitch){
			var self = this;
			var flows = new FlowCollection(dpid);
			var flowDpid = dpid;
			
			flows.fetch().complete(function () {
					//move outside of flows.fetch?
					//match flows listed to flows from FL rest api flow call
					//flows that match to be typed as static
					//flows that do not match to be typed as dynamic
					//static flows listed at the top or bottom of flow table grouped together
					var sf = new FlowMod("listAll");
					sf.fetch().complete(function () {
    	  				console.log(sf.attributes[flowDpid]);
    	  				if (sf.attributes[flowDpid] != undefined){
    	  					var stringed = JSON.stringify(sf.attributes[flowDpid]);
    	  					if (stringed == "{}"){
    	  						console.log("empty object");
    	  						console.log(stringed);
    	  					}
    	  					else{
    	  						console.log("object has flows");
    	  						console.log(stringed);
    	  						for(var key in sf.attributes[flowDpid]){
    	  							console.log("FLOW NAME: " + key);
    	  							console.log(sf.attributes[flowDpid][key]);
    	  						}	
    	  					}
    	  				}
    	  				
    	 			});
					
					//console.log(JSON.stringify(sf));
					
        			var x = document.getElementById("my" + dpid);    	
					$(x).append(self.template8(oneSwitch.toJSON())).trigger('create');
        			var z = document.getElementById("flowCount" + dpid);
				_.forEach(flows.models, function(item) {
					if (item != null){
						$(z).remove();
						oneSwitch.set("flowLength", flows.length);
						
						if (document.getElementById("flowTable" + dpid) === null) {
							var x = document.getElementById("my" + dpid);    	
							$(x).append(self.template6(oneSwitch.toJSON())).trigger('create');
						}

						var y = document.getElementById("flowTable" + dpid);
						$(y).append(self.template7(item.toJSON())).trigger('create');
					}
				}, this);
			});
		},
		
		//updates this.collection, features and switchStats
		//with the latest switch info from server
		refresh: function(){
			this.features.fetch();
			this.collection.fetch();
			this.switchStats.fetch();
		},
		
		modFlows: function () {
			//$('#content').empty();
			new FlowEditor(this.collection, true);
		},
		
		deleteFlow: function(e) {
			var v = e;
			//console.log(v);
			//console.log("delete a flow!");
			//$('#container').remove();
			this.flowEditor = new FlowEditor(this.collection, false);
			this.flowEditor.deleteFlow("red");
		},
		
	});
	return SwitchesSumView;
});
