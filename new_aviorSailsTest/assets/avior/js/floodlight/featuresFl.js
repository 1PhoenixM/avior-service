define([
	"model/features"
], function(Features){
	/* Floodlight specific URL for switch features */
	Features.prototype.url = "/switchfeatures/find"; 
	
	Features.prototype.parse = function(resp) {
		function compare(a,b) {
  			if (a.PortNum < b.PortNum)
     			return -1;
  			if (a.PortNum > b.PortNum)
   		 		return 1;
  			return 0;
		}

		//objs.sort(compare);
        //Note: Avior 2.0 API expects array.
        
		var newResp = new Object;
		for (var i=0; i<resp.length; i++){
			//console.log(JSON.stringify(resp[key].xid));	
			object = new Object;
			//object.length = resp[key].length;
			//object.tables = resp[key].tables;
			//object.type = resp[key].type;
			//object.version = resp[key].version;
			//object.xid = resp[key].xid;
			object.Ports = resp[i].Ports;
			
			object.Ports.sort(compare);
			
			
			//this.set(key, object);
			newResp[i] = object;
			//console.log(JSON.stringify(newResp));
		}
		return newResp;
	};
	return Features;
});