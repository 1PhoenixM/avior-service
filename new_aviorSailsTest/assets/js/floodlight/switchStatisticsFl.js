define([
	"model/switchStatistics"
], function(SwitchStatistics){
	/* Floodlight specific URL for switch statistics */
	SwitchStatistics.prototype.url = "/wm/core/switch/all/aggregate/json"; 
	return SwitchStatistics;
});