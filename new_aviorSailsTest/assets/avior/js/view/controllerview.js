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
	var ControllerView = Backbone.View.extend({
		el: $('#content'),

		template1: _.template(firewallEditor),
		template2: _.template(actionSelect),
		template3: _.template(controllerTpl),


		initialize: function(collec, display){
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
			document.getElementById("radio-choice-c").innerHTML() = "Da Bears";
		},

		events: {
			// listen for change event (not click) on the #firewallToggle element
			// then check the value property of #firewallToggle element
			// and if "on" then call enableRules, otherwise call disableRules
			// $('#firewallToggle').value
			"click #enableRules": "enableRules",
			"click #disableRules": "disableRules",
			"change #firewallToggle": "decideRules",
		},
		

		render: function() {
			//$('#container2').remove();
			$('#content').empty();
			this.$el.html(this.template3({coll: this.collection.toJSON()})).trigger('create');
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
		
		//decides which firewall function to call
		decideRules: function() {
			if(document.getElementById('firewallToggle').value === "off"){
			alert('Firewall has been disabled.');
			this.disableRules();
			}
			else{
			alert('Firewall is now enabled.');
			this.enableRules();
			}	
		},
	});
	return ControllerView;
});