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
    "model/description",
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
], function($, _, Backbone, Marionette, Features, SwitchStats, SwitchSummary, SwitchCollection, Description, PortCollection, PortFL, Port, PortStatistics, Desc, FlowMod, FlowEditor, FlowCollection, swtchContainer, header, descrip, portFrame, portRow, flowFrame, flowRow, flowCount, contentTpl){
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
			this.description = new Description("");
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
				var dp = item.get("DPID");	
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
						var dp = item.get("DPID");
                        for (var key in this.description.attributes){
                            if(this.description.get(key).DPID === dp){
                                var theSwitch = key;
                            }
                        } //Ideally this should work with /switchdesc/find/00:00:00:00:00:00:00:00.
						item.set("description", this.description.get(theSwitch));
						item.set("features", self.features.get(dp));
						item.set("switchStatistics", self.switchStats.get(dp));
						item.set("id", item.get("DPID"));
  						//self.renderSwitch(item, switchList);
  						//console.log((item));
					}, this);
					
			//console.log(JSON.stringify(description.get("00:00:00:00:00:00:00:03")));
		},
		
		//display the DPID list
		renderSwitch: function(item,container){
			var switchSum = new SwitchSummary({
				model: item
			});
			container.append(switchSum.render().el);
		},
		
		
		//attach switch description info to page
		displayDesc: function(DPID, oneSwitch){
				var self = this;
                var x = document.getElementById("my" + DPID);
            
                for (var key in this.description.attributes){
                    if(this.description.get(key).DPID === DPID){
                        var theSwitch = key;
                    }
                } //Ideally this should work with /switchdesc/find/00:00:00:00:00:00:00:00.
            
                var desc = this.description.get(theSwitch); //for one switch
                this.manufacturer = desc["Manufacturer"];
                desc["DPID"] = DPID;
                desc["Connected_Since"] = oneSwitch.get("Connected_Since");
                //console.log(JSON.stringify(desc));
                $(x).append(this.template3(desc)).trigger('create');
		},
		
		//attach port info to page
		displayPorts: function(DPID, oneSwitch){
			var self = this;
			var x = document.getElementById("my" + DPID);
			var y = document.getElementById("container" + DPID);
			$(y).append(this.template4(oneSwitch.toJSON())).trigger('create');
			
            //for(i=0;i<this.features.length;i++){
            
            var Ports = new PortCollection();
			var portArray = oneSwitch.get("Ports");
			//console.log("PORT ARRAY");
			//console.log(JSON.stringify(oneSwitch.get("features")));
			var portStatArray = new PortStatistics(DPID); 
            //console.log("Port Stat Array");
            //console.log(portStatArray);
            
			//get port statistics, append as a submodel to port model
			//and append port model to port collection
			var optical = false;
			//console.log(this.manufacturer);
			_.forEach(this.opticalVendors, function(item) {
                if (item === oneSwitch.get("description").Manufacturer)
					optical = true;
        		}, this);
			
			
			//console.log(JSON.stringify(oneSwitch.get("features")));
			
			
			if (optical === false){
			
			portStatArray.fetch().complete(function () {
				var numPorts = 0;
                
				_.forEach(portArray, function(item) {
					//console.log("PORT STAT ARRAY");
				    console.log(JSON.stringify(portStatArray));
					var p = new Port(item);
                    
					p.set("PortStatistics", portStatArray.get("Ports")[numPorts]);
					     //console.log(JSON.stringify(oneSwitch));
					     //console.log(JSON.stringify(p));
        			Ports.add(p);
        			numPorts += 1;
        		}, this);
     					
     					
        		_.forEach(Ports.models, function(item) {
        			    // console.log(JSON.stringify(item));
        			var z = document.getElementById("portTable" + DPID);
					$(z).append(self.template5(item.toJSON())).trigger('create');
        		}, this);
        		oneSwitch.set("portModel", Ports);
        		//console.log(JSON.stringify(item));
        		//console.log(JSON.stringify(oneSwitch));
        		//console.log(JSON.stringify(oneSwitch.get("features").ports));
        	});
        	
        	}
        	
        	else{
        		//console.log(JSON.stringify(oneSwitch));
        		console.log(JSON.stringify(oneSwitch.get("Ports")));
				_.forEach(oneSwitch.get("Ports"), function(item) {
					//console.log(item);
					item["PortStatistics"] = null;
        			var z = document.getElementById("portTable" + DPID);
					$(z).append(self.template5(item)).trigger('create');
        		}, this);   		
        	
        	}
            
		},
		
		//attach flow info to page
		displayFlows: function(DPID, oneSwitch){
            var self = this;
			var flows = new FlowCollection(DPID);
			var flowDPID = DPID;
			
			flows.fetch().complete(function () {
					//move outside of flows.fetch?
					//match flows listed to flows from FL rest api flow call
					//flows that match to be typed as static
					//flows that do not match to be typed as dynamic
					//static flows listed at the top or bottom of flow table grouped together
					var sf = new FlowMod("listAll");
                    
					sf.fetch().complete(function () {
    	  				//console.log(sf.attributes[flowDPID]);
                        for (var i=0;i<sf.length;i++){
                            if(sf[i].DPID === flowDPID){    
                                var Flows = sf[i].Flows;
                            }
                        }
    	  				if (Flows != undefined){
    	  					var stringed = JSON.stringify(Flows);
    	  					if (stringed == "{}"){
    	  						console.log("empty object");
    	  						console.log(stringed);
    	  					}
    	  					else{
    	  						console.log("object has flows");
    	  						console.log(stringed);
    	  						for(var key in Flows){
    	  							console.log("FLOW NAME: " + key);
    	  							console.log(sf.attributes[0][Flows][key]);
    	  						}	
    	  					}
    	  				}
    	  				
    	 			});
					
					//console.log(JSON.stringify(sf));
					
        			var x = document.getElementById("my" + DPID);    	
					$(x).append(self.template8(oneSwitch.toJSON())).trigger('create');
        			var z = document.getElementById("flowCount" + DPID);
				_.forEach(flows.models, function(item) {
					if (item != null){
						$(z).remove();
						oneSwitch.set("flowLength", flows.length);
						
						if (document.getElementById("flowTable" + DPID) === null) {
							var x = document.getElementById("my" + DPID);    	
							$(x).append(self.template6(oneSwitch.toJSON())).trigger('create');
						}

						var y = document.getElementById("flowTable" + DPID);
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