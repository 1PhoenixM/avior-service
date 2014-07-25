define([
	"model/switchStatistics"
], function(SwitchStatistics){
	/* Floodlight specific URL for switch statistics */
	SwitchStatistics.prototype.url = "/aggregate/find"; 
	return SwitchStatistics;
});