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
                            //unexpected end of input
                            /*var start = responseString.search("var statData = ");
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
                            */
                        }
            
                        else if(call === 'modules' && ctlr.nodeParse){
                            /*var start = responseString.search("<pre>"); 
                            var end = responseString.search("</pre>"); //not working?
                            var modules = responseString.substr(start, end);
                            var modules = modules.replace("&nbsp;", " ");
                            //console.log(modules); //non-object
                            //cb(null,modules);*/
                        }
            
            
                        else if (responseString.charAt(0) == '<'){
                            //handle ODL crash
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
                       
                        finalCheckForSubsequentData(normalizedObject);    
                            
                        //cb(null,normalizedObject);
                        }
                        
		});
	}
    
    function finalCheckForSubsequentData(normalizedObject){
        var counter = 0;
        
        if(call === 'switch' && ctlr.nodeParse){
           
            for(var i=0; i<normalizedObject.length; i++){
                var DPID = normalizedObject[i].DPID
            
                
            var options = {
              hostname: 'localhost',
              port: 8080,
              path: '/controller/nb/v2/switchmanager/default/node/OF/' + DPID +'', //todo: specific port lists
              method: 'GET',
              auth: 'admin:admin'
            };
            
            var responseString = '';
            
            var http = require('http');
            
	       http.get(options, function(res) {
              var body = '';
              res.on('data', function(chunk) {
                body += chunk;
              });
              res.on('end', function() {
                if (body.charAt(0) == '<'){
                    //To handle ODL's xml responses        
                }
                
                else{
                var PortObj = JSON.parse(body);
                  
                PortObj = ctlr.nodeParse('port', PortObj, normalizedObject);
                  
                PortObj = ctlr.normalize(PortObj);  
                
                //cb(null,normalizedObject);
                
                counter++;   
                    
                    if(counter === normalizedObject.length){
                         cb(null,normalizedObject);
                    }
                }
              });
            }).on('error', function(e) {
              console.log("Got error: " + e.message);
            }); 
                
            }
            
           
        }
        
        
                     
        else{
            cb(null,normalizedObject);
        }

    }
    
}