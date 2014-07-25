define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/topologyFl",
	"model/topology",
	"text!template/topology.html",
	"text!template/content.html"
], function($, _, Backbone, Marionette, TopologyCollection, Topology, topologyTpl, contentTpl){
	var TopologyView = Backbone.Marionette.ItemView.extend({
		el: $('#content'),
		
		template: _.template(topologyTpl),
		template2: _.template(contentTpl),
		
		events: {
			"click #showLabels": "toggleLabels",
			"click #doneButton": "scaleOut",
			"click #colorChange": "colorChange",
			"change #nodeList": "nodeSelect",
		},
		
		// accepts an array of switch dpids and hosts
		// connected to the controller
		initialize: function(s, h) {
			console.log("init");
			this.shiftAmountx = 0;
			this.shiftAmounty = 0;
			this.toggleCount = 0;
			this.switches = s;
			this.hosts = h;
			//this.mini = m;
			hostcolor = "grey";
      		switchcolor = "blue";
			_.forEach(s.models, function(item) {
				//item.set("id", item.dpid);
			}, this);
			_.forEach(this.hosts.models, function(item) {
				var mac = item.get("mac")[0];
				//console.log("HOST IDS");
				//console.log(mac);
				item.set("id", mac);
				//console.log("ITEMS AFTER SETTING HOST ID");
				//console.log(JSON.stringify(item));
				
					if (item.attributes.ipv4.length === 0) {
						item.set("ipv4", "ip not found");
					}
					this.switches.push(item);
			}, this);
		},
		
		//render the legend and network topology using d3.js
		render: function() {
			//console.log("render");
			var self = this;
			this.switchLinks;
		
			//$('#content').empty();
			//$('#rightPanel').empty();
			
			//Loads left/right div template
			this.$el.append(this.template2({coll: this.switches.toJSON()})).trigger('create');
			
			//If on main page, load fullscreen. If on any other page, load to right side only.
			if(document.title === "Avior - Network Topology"){
			this.$el.append(this.template({coll: this.switches.toJSON()})).trigger('create');
			}
			else{
			this.$('#rightPanel').append(this.template({coll: this.switches.toJSON()})).trigger('create');
			}
		
			this.showLegend();
			
			var topology = new TopologyCollection({model: Topology});
			
			topology.fetch().complete(function () {
				this.switchLinks = topology;
				//console.log("LINKS");
				//console.log(topology);
				self.showTopo(topology);
        	}, this);
			//console.log(JSON.stringify(this.switches));
			_.forEach(this.switches.models, function(item) {
				//console.log(item.id);
			}, this);
        	return this;
		},
		
		// Create and display the network graph
		showTopo: function(switchLinks) {
			var self = this;
		
			var height = 900;
			var width = 500;
			
			this.force = d3.layout.force()
    			.size([width, height])
    			.charge(-700)
    			.linkDistance(60)
    			.on("tick", tick);

			var drag = this.force.drag()
    			.on("dragstart", dragstart);
    			
			this.svg = d3.select(".inner").append("svg")
    			.attr("width", width)
    			.attr("height", height)
    			.attr("class", "mainSVG")
    			.attr("pointer-events", "all")
    			.append("g")
    			.call(d3.behavior.zoom().on("zoom", rescale))
    			.append("g");
    		
            function rescale() {}
    		
    		// On window resize, relocate legend and expand 
    		// or contract screen scroll amount
			$(window).bind('resize', function () { 
				height = 900;
				width = 500;
				
				
    			$(".mainSVG").attr("height", height);
    			$(".mainSVG").attr("width", width);
    			
    			d3.select("#legendDiv").style("float", function() {
    														if (window.innerWidth > 350){
    															$(function() { $(".leftLegend").hide(); $(".rightLegend").show(); }); 
    															return "right"; 
    														}
    														else{
    															$(function() { $(".rightLegend").hide(); $(".leftLegend").show(); });
    															return "left";
    														}
    													});
    													
    			self.force.size([width+45, height/1.5]).start();
    			
    			if (self.dynamicWindowSize > window.innerWidth)
            		d3.select(".inner").style("width", self.dynamicWindowSize + "px");
            	else 
            		d3.select(".inner").style("width",  window.innerWidth-45 + "px");
            	
            	if (self.dynamicWindowSize > window.innerHeight)
            		d3.select(".inner").style("height", self.dynamicWindowSize + "px");
            	else
            		d3.select(".inner").style("height", window.innerHeight + "px");
            		
			});

			var link = this.svg.selectAll(".link"),
    		node = this.svg.selectAll(".node");
			
			var edges = [];
				
			// Create source and target links based on dpid instead of index
			_.forEach(switchLinks.models, function(e) { 
    			console.log(e);
    			console.log(JSON.stringify(e));
    			// Get the source and target nodes
    			if (e.attributes['src-switch'] !== e.attributes['dst-switch']){
    			//console.log(JSON.stringify(e));
    			var sourceNode = self.switches.filter(function(n) {
    												  	return n.attributes.dpid === e.attributes['src-switch']; 
    												  })[0],
        		targetNode = self.switches.filter(function(n) {
    											  		return n.attributes.dpid === e.attributes['dst-switch']; 
    											 })[0];
	
    			// Add the edge to the array
   		 		edges.push({source: sourceNode, target: targetNode});
   		 		}
   		 		
			}, this);
			
			// Create source and target links based on dpid instead of index
			// WHEN WORKING ON MINI UNCOMMENT IF STATEMENT!!
			// THIS IS BECAUSE MININET RETURNS HOSTS THAT DO NOT HAVE AN IP 
			// ADDRESS WHICH THEN ALSO DO NOT HAVE ATTACHMENT POINTS
			_.forEach(this.hosts.models, function(e) {
				//console.log(e);
				//console.log(JSON.stringify(e));
    			// Get the source and target nodes
    			// UNCOMMENT THIS IF STATEMENT WHEN USING MININET!!
    			//if (e.attributes.ipv4.length > 0 && e.attributes.ipv4 !== "ip not found") {
    				var sourceNode = self.switches.filter(function(n) {
    														if (e.attributes.attachmentPoint[0] != undefined)
    															return e.attributes.attachmentPoint[0].switchDPID ===  n.attributes.dpid; 
    												  	  })[0],
        			targetNode = self.switches.filter(function(n) { 
        													if (e.attributes.attachmentPoint[0] != undefined)
    											  				return n.attributes.dpid === e.attributes.attachmentPoint[0].switchDPID; 
    											  	 	  })[0];

    			// Add the edge to the array
    			console.log(sourceNode);
    			console.log(targetNode);
    			console.log(e);
    			console.log("-----------------");
    			if (targetNode != undefined){
    				targetNode = e;
   		 		edges.push({source: sourceNode, target: targetNode});
   		 		}
   		 		
   		 		//}
			}, this);
			
			console.log("EDGES");
			console.log(edges);
			//console.log("after edges");
			var graphCenter = [];
			graphCenter.push(width-45);
			graphCenter.push(height / 1.5);
  			//console.log("before force");
  			
  			this.force
      			.nodes(this.switches.models)
      			.links(edges)
      			.size(graphCenter) 
      			.on("end", end)
      			.start();
   

   
			//console.log("after force");
  			link = link.data(edges)
    				   .enter().append("line")
      				   .attr("class", "link");
			//console.log("after links");
   			node = node.data(this.switches.models)
   					   .enter().append("g")
   					   .attr("class", "node")
   					   .attr("id", function(d) { if (d.attributes.dpid === undefined) return d.attributes['mac'][0]; else return d.attributes.dpid; })
      				   .call(drag);
      		//console.log("after nodes");
      		node.append("circle")
      				   .attr("r", 12)
      				   .style("fill", function(d) { if (d.attributes.dpid === undefined) return ""+hostcolor+""; else return ""+switchcolor+""; });


			var self = this;
			
			// At the end of the layout simulation, move nodes laying
			// outside of the svg element inside of it and set the size of
			// the scrollable window based on the graph size
			function end() {
				self.shiftAmountx = 0;
				self.shiftAmounty = 0;
				var pxList = [];
				var pyList = [];
    			Array.min = function( array ){
        			return Math.min.apply( Math, array );
    			};
    			
    			Array.max = function( array ){
        			return Math.max.apply( Math, array );
    			};
    			
    			function sortNumber(a,b) {
    				return a - b;
				}

				//console.log("force ended");
				var outOfBoundsx = [];
				var outOfBoundsy = [];
				
				_.forEach(self.switches.models, function(item) {
					pxList.push(Math.round(item.px));
					pyList.push(Math.round(item.py));
  					if (item.px < 0)
  						outOfBoundsx.push(item.px);
  					if (item.py < 0)
  						outOfBoundsy.push(item.py);
				}, this);
				
				if (outOfBoundsx.length > 0){
					self.shiftAmountx = (Array.min(outOfBoundsx) * -1) + 15;
            	}
            	
            	if (outOfBoundsy.length > 0){
					self.shiftAmounty = (Array.min(outOfBoundsy) * -1) + 15;
            	}
            	
            	self.svg.attr("transform",
            			"translate(" + self.shiftAmountx + "," + self.shiftAmounty + ")");
            	
            	// dynamically set inner window size base on network graph size
            	var xHigh1 = pxList[pxList.length - 1];
            	var xHigh2 = pxList[pxList.length - 2];
            	var xLow1 = pxList[0];
            	var xLow2 = pxList[1];
            	
            	var yHigh1 = pyList[pxList.length - 1];
            	var yHigh2 = pyList[pxList.length - 2];
            	var yLow1 = pyList[0];
            	var yLow2 = pyList[1];
            	
            	var dynamicHeightx = Math.max( Math.abs(xHigh1 - xHigh2), Math.abs(xLow1 - xLow2) );
            	var dynamicWidth1x = Math.max( Math.abs(xLow2 - xHigh1), Math.abs(xLow2 - xHigh2) );
            	var dynamicWidth2x = Math.max( Math.abs(xLow1 - xHigh1), Math.abs(xLow1 - xHigh2) );
            	var dynamicWidthx = Math.max( dynamicWidth1x, dynamicWidth2x );
            	
            	var dynamicHeighty = Math.max( Math.abs(yHigh1 - yHigh2), Math.abs(yLow1 - yLow2) );
            	var dynamicWidth1y = Math.max( Math.abs(yLow2 - yHigh1), Math.abs(yLow2 - yHigh2) );
            	var dynamicWidth2y = Math.max( Math.abs(yLow1 - yHigh1), Math.abs(yLow1 - yHigh2) );
            	var dynamicWidthy = Math.max( dynamicWidth1y, dynamicWidth2y );
            	
            	var dynamicWidth = Math.max( dynamicWidthx, dynamicWidthy );
            	var dynamicHeight = Math.max( dynamicHeightx, dynamicHeighty ); 
            	self.dynamicWindowSize = Math.max( dynamicWidth, dynamicHeight ) * 3;
  				
  				if (self.dynamicWindowSize > window.innerWidth)
            		d3.select(".inner").style("width", self.dynamicWindowSize + "px");
            		
            	if (self.dynamicWindowSize > window.innerHeight)
            		d3.select(".inner").style("height", self.dynamicWindowSize + "px");
            	
				self.force.on("end", null);
			}
			
			// Runs the force layout simulation one step
			function tick() {
  				link.attr("x1", function(d) { return d.source.x; })
      				.attr("y1", function(d) { return d.source.y; })
      				.attr("x2", function(d) { return d.target.x; })
      				.attr("y2", function(d) { return d.target.y; });
      			
      		    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			}	
			
			// Allows for a sticky force directed graph
			function dragstart(d) {
  				d.fixed = true;
  				d3.select(this).classed("fixed", true);
			}									                    		      	                  		          	                  	  		
        		
		},
		
		// On clicking the show label button, display 
		// or remove labels next to each node in the graph
		toggleLabels: function (e) {
			var node = this.svg.selectAll(".node");
			if (this.toggleCount % 2 === 0) {
				node.append("text")
    				.attr("x", 12)
    				.attr("dy", ".35em")
    				.attr("id", "nodeLabels")
    				.text(function(d) {if (d.attributes.id === undefined || d.attributes.id.length < 23) 
    										if(d.attributes['ipv4'] === "ip not found") 
    											return d.attributes['ipv4'] + "/" + d.attributes['mac'][0]; 
    										else return d.attributes['ipv4'][0] + "/" + d.attributes['mac'][0]; 
    									else return d.attributes.id; });
				this.toggleCount++;	
			}
			else {
				var labels = this.svg.selectAll("#nodeLabels");
				labels.remove();	
				this.toggleCount++;
			}
		},
		
		// Create a new svg element and append a rectangle,
		// group element, circles and text to represent the
		// graph legend
		showLegend: function() {
			$('#legendDiv').empty();
			legendSvg = d3.selectAll("#legendDiv").append("svg")
    			.attr("width", 115)
    			.attr("height", 65);
    		
    		d3.select("#legendDiv").style("float", function() {
    														if (window.innerWidth > 350){
    															$(function() { $(".rightLegend").show(); }); 
    															return "right"; 
    														}
    														else{
    															$(function() { $(".leftLegend").show(); });
    															return "left";
    														}
    													});
			
			var border = legendSvg.append("rect")
      						.attr("class", "border")
      						.attr("x", 3)
  							.attr("y", 0)
  							.attr("height", 61)
  							.attr("width", 100)
  							.style("fill", "white") ;

      		var legend = legendSvg.append("g")
  							 .attr("class", "legend")
  							 .attr("x", 45)
  							 .attr("y", 25)
  							 .attr("height", 100)
   							 .attr("width", 100);
  
  			legend.selectAll('circle')
      			  .data([0,1])
      			  .enter()
      			  .append("circle")
      			  .attr("cx", 20)
     	 		  .attr("cy", function(d, i){ return (i *  30) + 15;})
      			  .attr("r", 8)
      			  .style("fill", function(d) { 
         							if (d === 0) return ""+hostcolor+""; else return ""+switchcolor+"";
      							  });	
      
   			legend.selectAll('text')
   				  .data([0,1])
   				  .enter()
   				  .append("text")
  				  .attr("x", 39)
  				  .attr("y", function(d, i){ return (i *  30) + 19})
  				  .text(function(d) { if (d === 0) return "hosts"; else return "switches"; });
		},
		
		// On selecting a node to view locally, highlight the selected
		// node, hide nodes and links not connected to the selected node,
		// zoom in on the selected node, alter graph force attributes and
		// display the done button 
		nodeSelect: function (e) {
			var height = 900;
			var width = 500;
			var nodeID = $(e.currentTarget).val();
			//console.log(nodeID);
			var nodeData = this.switches.get(nodeID);
			//console.log(nodeData);
			this.x = nodeData.px;
			this.y = nodeData.py;
			var self = this;
			
			var allNodes = this.svg.selectAll("g");
			allNodes.style("stroke", "#fff")
				    .style("stroke-width", 1.5);
				    
			this.node = this.svg.selectAll("g").filter(function(d, i) { return i===nodeData.index; });
			this.node.style("stroke", "black")
				.style("stroke-width", 2.5);
			var nodesToHide = [];
			var linksToHide = this.svg.selectAll(".link").filter(function(d, i) { if (d.source.px === self.x) nodesToHide.push(d.target.px); if (d.target.px === self.x) nodesToHide.push(d.source.px); return d.source.px === self.x || d.target.px === self.x || d.source.py === self.y || d.target.py === self.y; });
			
			nodesToHide.push(self.x);
			var hiddenNode = this.svg.selectAll(".node")
							     .style("opacity", function(d,i) {
							     						 var found = false;
							     						 _.forEach(nodesToHide, function(item) {
							     						 	if (d.px === item)
							     						 		found = true;
        												 }, this);
        												 if (!found)
        												 	return 0;
							     				    });
							     				    
			var hiddenLink = this.svg.selectAll(".link")
							         .style("opacity", function(d,i) {
							     							if (d.source.px === self.x || d.target.px === self.x)
        												 		return 1;
        												 	else
        												 		return 0;
							     				    });

			var trans = [];
			trans.push(((width/2)-(self.x*1.5)) - 18);
			trans.push(((height/2)-(self.y*1.5)) - ((height/2) * .55));
			
			this.svg.attr("transform",
            		"translate(" + trans + ")"
            			+ " scale(" + 1.5 + ")");
            			
            this.force.size([width+45, height/1.5])
    				  .charge(-400)
    			      .linkDistance(40)
    			      .start();
            
			$(function() { $("#doneDiv").show(); });
		},
		
		// On clicking done in local topology view, return to intial
		// layout of graph and hide the done button
		scaleOut: function () {
			var height = 900;
			var width = 500;
			var allNodes = this.svg.selectAll(".node")
								   .style("opacity", 1);
								   
			var allLinks = this.svg.selectAll(".link")
								   .style("opacity", 1);
			
            this.node.style("stroke", "#fff")
				.style("stroke-width", 1.5);
				
			var trans = [];
			trans.push(0);
			trans.push(0);
			
			this.svg.attr("transform",
            		"translate(" + this.shiftAmountx + "," + this.shiftAmounty + ")");
            		
            this.force.size([width+45, height/1.5])
    				  .charge(-700)
    			      .linkDistance(60)
    			      .start();
            		
            $(function() { $("#doneDiv").hide(); });
		},
		
		colorChange: function () {	
			hostcolor = document.getElementById('hostColor').value;
      		switchcolor = document.getElementById('switchColor').value;
      		if(hostcolor.search(" ") !== -1 || switchcolor.search(" ") !== -1){
      		hostcolor = hostcolor.replace(" ",""+""); 
      		switchcolor = switchcolor.replace(" ",""+""); 
      		}
      		if(hostcolor === switchcolor){ 
      		//alert('Making switches and hosts the same color can make the topology harder to view.');
      		}
      		
			$(".inner").empty();
	
			var self = this;
			this.switchLinks;
		
			this.showLegend();
			
			var topology = new TopologyCollection({model: Topology});
			
			topology.fetch().complete(function () {
				this.switchLinks = topology;
				self.showTopo(topology);
        	}, this);
			_.forEach(this.switches.models, function(item) {
				//console.log(item.id);
			}, this);
        	return this;
        	
			//this.render();
			//this.showTopo(topology);
			//this.showLegend();
		},
		
		flowManage: function () {
		 var topology = this;
    		if (topology.state.shiftNodeDrag){
      		topology.dragLine.attr('d', 'M' + d.x + ',' + d.y + 'L' + d3.mouse(topology.svgG.node())[0] + ',' + d3.mouse(this.svgG.node())[1]);
    		} 
    		else{
      		d.x += d3.event.dx;
      		d.y +=  d3.event.dy;
      		topology.updateGraph();
		//use d3 for dragging flows between nodes http://bl.ocks.org/cjrd/6863459
			}
		},
			
	});
	return TopologyView;
}); 