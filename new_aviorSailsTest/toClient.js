module.exports = function (ctlr,call,cb) {
	return function (res) {
		var responseString = '';
		res.setEncoding('utf-8');
 
		res.on('data', function(data) {
			responseString += data;
		});
 
		res.on('end', function() {
                        //console.log(responseString);
                        var responseObject = JSON.parse(responseString);
            
                        if(ctlr.dpidParse){
                        //console.log('\n\n\n\n\n\n\n\n\n\n\n' + responseObject);
                        var newObject = ctlr.dpidParse(call, responseObject);
                        //console.log('\n\n\n\n\n\n\n\n\n\n\n' + newObject);
                        var normalizedObject = ctlr.normalize(newObject);
                        }
            
                        else{
                        var newObject = ctlr.normalize(responseObject);
                        var normalizedObject = ctlr.nodeParse(call, newObject);
                        normalizedObject = normalizedObject.Stats; //ODL only
                        }
                        //console.log(normalizedObject);
                        //ctlr.response.send(normalizedObject);
                        
                        cb(null,normalizedObject);
		});
	}
}
