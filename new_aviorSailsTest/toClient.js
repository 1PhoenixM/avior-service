module.exports = function (ctlr,call,cb) {
	return function (res) {
		console.log(res);
        var responseString = '';
		res.setEncoding('utf-8');
 
		res.on('data', function(data) {
			responseString += data;
		});
        
        res.on('error', function(err){
          console.log('Error occurred in toClient: ' + err.message);  
        });
 
        res.on('end', function() {
                        //console.log(responseString);
                        var responseObject = JSON.parse(responseString);
            
                        if(ctlr.dpidParse){
                            console.log('\n\n\n\n\n\n\n\n\n\n\n' + responseObject);
                            var newObject = ctlr.dpidParse(call, responseObject);
                            console.log('\n\n\n\n\n\n\n\n\n\n\n' + newObject);
                            var normalizedObject = ctlr.normalize(newObject);

                        }
            
                        else{
                            var newObject = ctlr.nodeParse(call, responseObject);
                            var normalizedObject = ctlr.normalize(newObject);
                            if(normalizedObject.Stats){
                                normalizedObject = normalizedObject.Stats; //ODL only
                            }
                            else{
                                normalizedObject = normalizedObject;
                            }
                        }
                        console.log(normalizedObject);
                        //ctlr.response.send(normalizedObject);
                        
                        cb(null,normalizedObject);
		});
	}
}
