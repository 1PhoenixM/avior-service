define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/firewallModFl",
	"text!template/firewallEditor.html",
	"text!template/actionSelect.html",
	"text!template/controller.html",
], function($, _, Backbone, Marionette, FirewallMod, firewallEditor, actionSelect, controllerTpl){
	var FirewallEdView = Backbone.View.extend({
		el: $('#content'),
		
		template1: _.template(firewallEditor),
		template2: _.template(actionSelect),
		template3: _.template(controllerTpl),
	
		initialize: function(collec, display, buttonUpdate){
			this.toggleCount = 0;
			console.log(window.innerHeight);
			console.log(window.outerHeight);
			this.nameList = new Object;
			this.textFields = new Array;
			this.j = 0;
			this.collection = collec;
			//console.log(this.collection);
			if (display)
				this.render();
			//this.listStaticFlows();
			if (buttonUpdate)
				this.buttonUpdating();
			},
		
		events: {
			"click #getRules": "pushRule",
			"click #removeRule": "deleteRule",
			"click #removeAllRules": "deleteRules",
			"click #enableRules": "enableRules",
			"click #disableRules": "disableRules",
			"click #refreshRules": "refreshRules",
			"click #clearRule": "clearRule",
			"change input": "validate",
			"change select": "validate",
			"change #dpid": "showActions",	
			"change #firewallToggle": "decideRules",
		},
		
		render: function() {
			//$('#container2').remove();
			$('#content').empty();
			this.$el.html(this.template1({coll: this.collection.toJSON()})).trigger('create');
		},
		
		
		validate: function(e){
			
			switch (e.currentTarget.id)
			{
				case "ruleName":
					this.name = $(e.currentTarget).val();
					//this.textFields[this.j] = e.currentTarget.id;
					//this.j += 1;
					break;
				case "port": 
					this.ingressport = $(e.currentTarget).val();
					//this.textFields[this.j] = (e.currentTarget.id);
					//this.j += 1;
					break;
				case "action": 
					this.action = $(e.currentTarget).val();
					//this.textFields[this.j] = (e.currentTarget.id);
					//this.j += 1;
					break;
				case "priority": 
					this.priority = $(e.currentTarget).val();
					//this.textFields[this.j] = (e.currentTarget.id);
					//this.j += 1;
					break;
				case "src-mac": 
					this.srcmac = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				case "dst-mac": 
					this.dstmac = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				case "ether-type": 
					this.ethertype = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				case "dst-ip": 
					this.dstip = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				case "src-ip": 
					this.srcip = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				case "protocol": 
					this.protocol = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				case "dst-port": 
					this.dstport = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				case "src-port": 
					this.srcport = $(e.currentTarget).val();
					this.textFields[this.j] = (e.currentTarget.id);
					this.j += 1;
					break;
				default:
					break;
			}
		},
		
		// creates a new firewall rule based 
		// on user generated input
		pushRule: function() {
			var proceed = true;
			//if (this.name in this.nameList){
				//proceed = confirm("Warning! " + this.name + " is already being used." 
					   //+ " Proceeding will overwrite the current flow with" 
					  // + " this name. Would you like to proceed using "  
					  // + this.name + "?");
			//}
			
			if (this.name in this.nameList === false || proceed){
				this.nameList[this.name] = true;
				var flowAttrs = [this.name, this.ingressport, this.actions, this.srcport, 
							 	this.dstport, this.ethertype, this.dstmac, 
							 	this.srcmac, this.srcip, this.dstip, this.protocol, 
							 	this.vlanid, this.vlanpriority, this.tosbits, this.wildcards,
							 	this.priority, this.active];
							
				var noOp;
				console.log(noOp);

				var addRule = new FirewallMod(noOp);
				addRule.save({
					'switchid':$('#dpid').val(),
					'src-inport':this.ingressport,
					'src-mac':this.srcmac,
					'dst-mac':this.dstmac,
				
					'dl-type':this.ethertype,
					'src-ip':this.srcip,
					'dst-ip':this.dstip,
					'nw-proto':this.protocol,
					'tp-src':this.srcport,
					'tp-dst':this.dstport,
					'priority':this.priority,
					'action':this.action,
				});
				//console.log(JSON.stringify(addFlow));
			
				//clear all flow attributes
				this.ingressport = '';
				this.srcmac = '';
				this.dstmac = '';
				this.ethertype = '';
				this.srcip = '';
				this.dstip = '';
				this.protocol = '';
				this.srcport = '';
				this.dstport = '';
				this.priority = '';
				this.action = '';
				
				for (var i in this.textFields){
					console.log(this.textFields[i]);
					document.getElementById(this.textFields[i]).value="";
				}
				
				$('#actionBody').remove();
				this.textFields = [];
				$('select').selectmenu('refresh', true);
			}
		},
		
		// 1. find the rule that has been selected from the rules view
		// 2. compare that rule with the list of rules returned from the server
		// 3. once a match has been found, save the id of the matched rule
		// 4. send the saved id along to the server in a destroy request
		deleteRule: function () {
			var x = new FlowMod("one");
			x.destroy({data: { name: this.name }});
		},
		
		// 1. iterate through all of the rules held in the model
		// 2. for each rule encountered, save the id and destoy the rule
		deleteRules: function () {
			var noOp;
			var deleteRules = new FirewallMod(noOp);
			deleteRules.fetch().complete(function () {
    	  		console.log(JSON.stringify(deleteRules.get("0")));
    	  		console.log(JSON.stringify(deleteRules.get("1")));
    	 	});
		},
		
		// move to toggle on/off buttons in the upper right hand corner
		enableRules: function () {
			var op = "enable";
			var enableRules = new FirewallMod(op);
			enableRules.fetch();
		},
		
		// move to toggle on/off buttons in the upper right hand corner
		disableRules: function () {
			var op = "disable";
			var disableRules = new FirewallMod(op);
			disableRules.fetch();
		},
		
		//this.state 
		decideRules: function () {
			if($('#radio-choice-d').prop("checked")){
			alert('Firewall has been disabled.');
			$("#radio-choice-d").prop("disabled", true);
			$("#radio-choice-c").prop("disabled", false);
			this.disableRules();
			}
			else{
			alert('Firewall is now enabled.');
			$("#radio-choice-c").prop("disabled", true);
			$("#radio-choice-d").prop("disabled", false);
			this.enableRules();
			}
		},
		
		// re-fetches the rules as the exist on the server
		refreshRules: function () {
			var op;
			var refreshRules = new FirewallMod(op);
			refreshRules.fetch();
		},
		
		// clears all text box fields, removes actionBody 
		// and returns all drop down menus to initial positioning
		clearRule: function () {
			
		},
		
			//queries firewall and sets button based on that
			//the result of str is "firewall enabled" or "firewall disabled" with quotes intact	
			//renders controller template at the end
		buttonUpdating: function () {
			fm = new FirewallMod("status");
			fm.fetch().complete(function () {
			firewallStatus = fm.get("result");
			str = JSON.stringify(firewallStatus);
			//alert(firewallStatus);
				if(firewallStatus === "firewall enabled"){
				$( "#radio-choice-c" ).prop( "checked", true );
				$( "#radio-choice-d" ).prop( "checked", false );
				
				}
				else{
				$( "#radio-choice-d" ).prop( "checked", true );
				$( "#radio-choice-c" ).prop( "checked", false );
			
				}
			$('#content').append(this.template3).trigger('create');		
			},this);
			
		},
		
		// displays the basic firewall editing menu for a specific dpid
		showActions: function (e) {
			console.log(JSON.stringify(this.collection));
			var v = $(e.currentTarget).val();
			var c = this.collection.get(v);
			var d = c.get("ports");
			$('#actionBody').remove();
			$('#firewallEdTable').append(this.template2(c.toJSON())).trigger('create');
		},	
	});
	return FirewallEdView;
});