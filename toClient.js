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
                        //console.log(res);
            
                        if(ctlr.nodeParse && ctlr.cookieGet === false){
                            //console.log(res.headers["set-cookie"]);
                            if(res.headers["set-cookie"]){
                                ctlr.cookie = res.headers["set-cookie"];
                                //ctlr.cookie = ctlr.cookie[0];
                                ctlr.cookieGet = true;
                            }
                            //does not seem to work.
                        }
                        
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
            
            
                        else if (responseString.charAt(0) == '<' || responseString.charAt(0) === '&#60;'){ //maybe should deny any message not starting w/ '{'
                            //console.log(res);
                            //handle ODL crash
                            //attempt the same call again
                            //todo: deal with create/delete
                            
                            //console.log("ODL auth denied");
                            //ctlr.find('util', call, { where: null, limit: 30, skip: 0, recursive: 'yes' }, cb); //Is this working? Auth page comes back
                            //callbacks are probably involved here
                            
                            //Another idea: Send an object message to the front end and tell it to initiate another call
                            
                            //errorObject = {error: "AUTH"};
                            //cb(null,errorObject);
                          
                        }
            
                        else{

                            if (responseString === ''){
                                responseString = '{}';
                            }

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
                            
                            if(ctlr.dpid){
                                ctlr.dpid = '';
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
                    var DPID = normalizedObject[i].DPID;


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
        
        else if(call === 'switchdesc' && ctlr.nodeParse){
            
            for(var i=0; i<normalizedObject.length; i++){
                    var DPID = normalizedObject[i].DPID;
                
                var username = 'admin';
                var password = 'admin';
                var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

                // auth is: 'Basic VGVzdDoxMjM='

                var options = {
                  hostname: 'localhost',
                  port: 8080,
                  path: '/controller/web/troubleshoot/nodeInfo?nodeId=OF|' + DPID +'', //todo: specific port lists
                  method: 'GET',
                  auth: auth,
                };
                
                options.headers = {'Authorization': auth, 'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Accept-Encoding': 'gzip,deflate,sdch',
'Accept-Language':'en-US,en;q=0.8',
'Cache-Control':'max-age=0',
'Connection':'keep-alive',
'Cookie':'sails.sid=s%3AG2lmPjtFgtwMyK8XEvIrPU18.MwqSF6Op873bY4iA%2BuJ6XU8ywMBZ15yYgB36d8GXd%2FU; JSESSIONIDSSO=F5F105B0BB6EC113FD7C9E1D81171B8B; JSESSIONID=5221426DD686C1B5D1A7E072B97C4A24',
                               'Host':'localhost:8080',
'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'};

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
                    var DescObj = JSON.parse(body);
                        
                    DescObj = ctlr.nodeParse('switchdesc2', DescObj, normalizedObject);
                        
                    DescObj = ctlr.normalize(DescObj);
                        
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