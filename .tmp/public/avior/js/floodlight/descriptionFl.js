define([
	"model/description"
], function(Description){
	/* URL for switch description */
	//Description.prototype.url = "/switchdesc/find"; 
    Description.prototype.urlRoot = function() {return "/switchdesc/find/" + this.DPID + "";};
	Description.prototype.initialize = function(DPID) {this.DPID = DPID;};
	return Description;
});