module.exports = function (ctlr,call,postData,cb) {
	return function (res) {
		//console.log(res);
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
                        /*try{
                            var responseObject = JSON.parse(responseString);
                        }catch(e){
                            console.log('Error occurred in toClient: ' + e);
                        }
                        //Error catching, parse expects a string of JSON. This
                        //catch keeps Avior from crashing when it gets unexpected input
                        */
            
                
                        if(call === 'memory' && ctlr.nodeParse){
                            var start = responseString.search("var statData = ");
                            var ctlrData = responseString.substr(start);
                            var end = ctlrData.indexOf(";");
                            var ctlrData = ctlrData.substr(0, end);
                            var ctlrData = ctlrData.slice(15, ctlrData.length);
                            ctlrData = JSON.parse(ctlrData);
                            
                            ctlrData = ctlr.nodeParse(call, ctlrData, null);
                            
                            var normalizedObject = ctlr.normalize(ctlrData);
                            if(normalizedObject.Stats){
                                normalizedObject = normalizedObject.Stats; //ODL only
                            }
                            else{
                                normalizedObject = normalizedObject;
                            } 
                            cb(null,normalizedObject);
                        }
            
                        else if(call === 'modules' && ctlr.nodeParse){
                            var start = responseString.search("<pre>"); 
                            var end = responseString.search("</pre>"); //not working?
                            var modules = responseString.substr(start, end);
                            var modules = modules.replace("&nbsp;", " ");
                            console.log(modules);
                            cb(null,modules);
                        }
            
                        else{
                        var responseObject = JSON.parse(responseString);
                    
                        if(ctlr.dpidParse){
                            //console.log('\n\n\n\n\n\n\n\n\n\n\n' + responseObject);
                            var newObject = ctlr.dpidParse(call, responseObject);
                            //console.log('\n\n\n\n\n\n\n\n\n\n\n' + newObject);
                            var normalizedObject = ctlr.normalize(newObject);
                        }
            
                        else{
                            var newObject = ctlr.nodeParse(call, responseObject, null);
                            
                            var normalizedObject = ctlr.normalize(newObject);
                            if(normalizedObject.Stats){
                                normalizedObject = normalizedObject.Stats; //ODL only
                            }
                            else{
                                normalizedObject = normalizedObject;
                            }   
                        }
            
                        //console.log(normalizedObject);
            
                        //ctlr.response.send(normalizedObject);
                       
                        cb(null,normalizedObject);
                        }
                        
		});
	}
}