 define([
	"backbone",
	"underscore",
	"util",
	"collection/flowCollection",
], function(Backbone,_,Util,FlowCollection){
		/* Avior 2.0 URL for flows on a switch */
		//FlowCollection.prototype.url = function() {return "/flowstats/find/";};
        FlowCollection.prototype.url = function() {return "/flowstats/find/" + this.DPID + "";};
		FlowCollection.prototype.initialize = function(DPID) { 
			this.DPID = DPID; 
		};
		
		FlowCollection.prototype.parse = function(response){
            return response;
            /*for(var i=0;i<response.length;i++){
                if(response[i].DPID === this.DPID){
                    //console.log(response[i].Flows);
                    return response[i].Flows;    
                }
            }*/
            //var innerArray = response[this.DPID];
   			//return innerArray;
		}; 
	return FlowCollection;
});