 define([
	"backbone",
	"util",
	"model/host",
], function(Backbone,Util,Host){
	/* Structure to hold flow models */
	var HostCollection = Backbone.Collection.extend({
		model: Host,
		url: Util.missingCtlrErr,
                comparator: function(hst){
                        var addresses = hst.get("ipv4");
                        if (addresses.length){
                                return this.ipstr2ipnum(addresses[0]);
                        }
                        return "";
                },
                ipstr2ipnum: function(addr){
                        var d = addr.split('.');
                        return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
                },
	});
	return HostCollection;
});
