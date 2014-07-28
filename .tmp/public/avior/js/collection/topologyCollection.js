define([
	"backbone",
	"marionette",
	"util",
	"model/topology",
], function(Backbone,Marionette,Util,Topology){
	/* Structure to hold topology models */
	var TopologyCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		model: Topology,
	});
	
	/*Features.prototype.parse = function(resp) {
		var newResp = new Object;
		for (var key in resp){
			//console.log(JSON.stringify(resp[key].xid));	
			object = new Object;
			object.length = resp[key].length;
			object.tables = resp[key].tables;
			object.type = resp[key].type;
			object.version = resp[key].version;
			object.xid = resp[key].xid;
			
			//this.set(key, object);
			newResp[key] = object;
			//console.log(JSON.stringify(newResp));
		}
		return newResp;
	};*/
	
	return TopologyCollection;
}); 