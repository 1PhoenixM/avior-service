xcdefine([
	"backbone",
	"marionette",
	"util",
	"view/topologyView",
], function(Backbone, Marionette, Util, topoView){
	var TopoCollectionView = Backbone.Marionette.CollectionView.extend({
	itemView: topoView;
	});
	return TopoCollectionView;
}); 