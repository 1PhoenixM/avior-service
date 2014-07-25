 define([
	"backbone",
	"util",
], function(Backbone,Util){
	/* Structure to hold port models */
	var PortCollection = Backbone.Collection.extend({
		comparator: function(collection){
    		return(collection.get("PortNum"));
  		}
	});
	return PortCollection;
});