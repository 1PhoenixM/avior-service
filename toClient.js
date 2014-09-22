//This is the callback which occurs after we have obtained data from the controller.
//The calling of cb(); sends normalized data up to the Sails API and thus and to the browser client.
//This file is only invoked for GET requests. POST/PUT/DELETE are handled within the api/controllers files and in the adapters' create, update and destroy functions.

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
                        //console.log('/////////////////');
                        
            
                        if(ctlr.nodeParse && ctlr.cookieGet === false){
                            
                            //console.log(res.headers["set-cookie"]);
                            //if(res.headers["set-cookie"]){
                                //ctlr.cookie = res.headers["set-cookie"];
                                //ctlr.cookie = ctlr.cookie[0];
                                //ctlr.cookie = ctlr.cookie.toString();
                                //ctlr.cookieGet = true;
                            //}
                            //does not seem to work.
                            //expected vals (how browser does it):
                            //JSESSIONIDSSO=3EA1E1F47A159E7997138EA0E50693B6; 
                            //JSESSIONID=09F2EDAE0CCC51B60CFD61B4CDC038CF; 
                            //sails.sid=s%3Aw7TDSEAWvI40GYAu2BA5wJZS.NjS6Kowd8iLIKjdpet2UUPsXYTczi6jDh3nzf1MK7Fk
                            
                            //gets from '/'
                            //posts to /j_security_check
                            //data: j_username=admin&j_password=admin
                            
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
                            var start = responseString.search("var statData = ");
                            var ctlrData = responseString.substr(start);
                            var end = ctlrData.indexOf(";");
                            var ctlrData = ctlrData.substr(0, end);
                            var ctlrData = ctlrData.slice(15, ctlrData.length);
                            if(ctlrData){
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
                            else{ ctlr.find('util', call, { where: null, limit: 30, skip: 0, recursive: 'yes' }, cb); } 
                        }
            
                        else if(call === 'uptime' && ctlr.nodeParse){
                            //unexpected end of input
                            var start = responseString.search("var statData = ");
                            var ctlrData = responseString.substr(start);
                            var end = ctlrData.indexOf(";");
                            var ctlrData = ctlrData.substr(0, end);
                            var ctlrData = ctlrData.slice(15, ctlrData.length);
                            if(ctlrData){
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
                            else{ ctlr.find('util', call, { where: null, limit: 30, skip: 0, recursive: 'yes' }, cb); } 
                        }
            
                        else if(call === 'modules' && ctlr.nodeParse){
                            var start = responseString.search("<pre>"); 
                            start = start + 5;
                            var end = responseString.search("</pre>"); //not working?
                            var modules = responseString.substring(start, end);
                            var modules = modules.replace(/&nbsp;/g, " ");
                            //var modules = modules.replace(/\\/g, "");
                            //Todo: backslashes before the quote marks
                            var modules = modules.split("\n");
                            arr = [];
                            
                            for (var i=0; i<modules.length; i++){
                                modobj = {};
                                modobj.Name = modules[i];
                                arr.push(modobj);
                            }
                            
                            //console.log(arr);
                            
                            //var modobj = {};
                            //modobj.Stats = modules;
                            //console.log(modules); //non-object
                            cb(null, arr);
                        }
            
            
                        else if (responseString.charAt(0) === '<' || responseString.charAt(0) === '&#60;'){ //maybe should deny any message not starting w/ '{'
                            //Err: ODL returns 401 on parallel rest calls
                            //retry?
                            
                            //console.log(res);
                            //handle ODL crash
                            //attempt the same call again
                            //todo: deal with create/delete
                            
                            //console.log("ODL auth denied");
                            //ctlr.find('util', call, { where: null, limit: 30, skip: 0, recursive: 'yes' }, cb); //Is this working? Auth page comes back
                            //callbacks are probably involved here
                            
                            //Another idea: Send an object message to the front end and tell it to initiate another call
                            
                            /*var async = require('async');
                            
                            async.retry(3, reCheck(cb, {}), function(err, result) {
                                if(err){ console.log(err); }
                                else{ cb(null, result); }
                            });*/
                            
                            //console.log(res.statusCode);
                            if(res.statusCode === 401){
                                   ctlr.find('util', call, { where: null, limit: 30, skip: 0, recursive: 'yes', autherror: 'yes' }, cb);
                            }
                            
                            /*errorObject = {aviorError: "AUTH"};
                            cb(null, errorObject);*/
                          
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

                            else if(ctlr.nodeParse){
                                var newObject = ctlr.nodeParse(call, responseObject, null);

                                var normalizedObject = ctlr.normalize(newObject);
                                if(normalizedObject.Stats){
                                    normalizedObject = normalizedObject.Stats; //ODL only
                                }
                                else{
                                    normalizedObject = normalizedObject;
                                }   
                            }
                            
                            else if(ctlr.dpParse){
                                var newObject = ctlr.dpParse(call, responseObject);
                                //console.log(newObject);
                                var normalizedObject = ctlr.normalize(newObject); 
                                //console.log(normalizedObject);
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
    
        if(ctlr.nodeParse && ctlr.cookieGet === false){
                            //console.log(res.headers["set-cookie"]);
                            /*if(res.headers["set-cookie"]){
                                ctlr.cookie = res.headers["set-cookie"];
                                //ctlr.cookie = ctlr.cookie[0];
                                ctlr.cookie = ctlr.cookie.toString();
                                ctlr.cookieGet = true;
                            }*/
                            //does not seem to work.
                            //expected vals (how browser does it):
                            //JSESSIONIDSSO=3EA1E1F47A159E7997138EA0E50693B6; 
                            //JSESSIONID=09F2EDAE0CCC51B60CFD61B4CDC038CF; 
                            //sails.sid=s%3Aw7TDSEAWvI40GYAu2BA5wJZS.NjS6Kowd8iLIKjdpet2UUPsXYTczi6jDh3nzf1MK7Fk
                            
                            //gets from '/'
                            //posts to /j_security_check
                            //data: j_username=admin&j_password=admin
                            
                            var username = 'admin';
                            var password = 'admin';
                            var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
                            
                            if(sails.controllers.main.hostname){
                              var host = sails.controllers.main.hostname;
                            }
            
                            opts = {method:'POST',hostname:host,port:8080,path:'/j_security_check?j_username=admin&j_password=admin',data:'j_username=admin&j_password=admin',auth:auth}; //TODO: mask auth //auth:'admin:admin'


                opts.headers = {'Host': opts.hostname + ':' + opts.port, 'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding': 'gzip,deflate,sdch',
                'Accept-Language':'en-US,en;q=0.8',
                'Cache-Control':'max-age=0',
                'Connection':'keep-alive',
                'Content-Length':33,
                'Content-Type':'application/x-www-form-urlencoded',                                
                'Cookie': ctlr.cookie,
                'Host':'localhost:8080',
                'Origin':'http://localhost:8080',
                'Referer':'http://localhost:8080/',
                'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'}; //spoofing for now, will fix
            
                var http = require('http');            
                            
                req = http.request(opts, function(res){ var response = '';
		                                                  res.setEncoding('utf-8');
                                                      res.on('data', function(data) {
			                                             response += data;
		                                              });
                                                       res.on('end', function() {
			                                             //console.log(response);
                                                           //don't need to call '/', just /security-check
                                                         http.get({hostname:host,port:8080,path:'/',auth: auth, headers: opts.headers}, function(res){ 
                                                            var resp = '';
                                                             res.setEncoding('utf-8');
                                                             res.on('data', function(data) {
                                                                 resp += data;
                                                             });
                                                             res.on('end', function() {
                                                                //console.log(res);
                                                                 ctlr.cookie = res.headers["set-cookie"];
                                                                 ctlr.cookie = ctlr.cookie[0];
                                                                 finalCheckForSubsequentData(normalizedObject);
                                                                 //console.log('end: ' + resp);  
                                                             });
                                                         });
		                                              });
                                                      
                                                      });
                
                req.write(opts.data);
   
                req.end();
                            
                ctlr.cookieGet = true;
                        
                        }
        
        if(call === 'switch' && ctlr.nodeParse){
           
            for(var i=0; i<normalizedObject.length; i++){
                    var DPID = normalizedObject[i].DPID;
                 
                //var username = 'admin';
                            //var password = 'admin';
                            //var authent = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
                
                if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                
                var options = {
                  hostname: host,
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
                    ctlr.cookie = res.headers["set-cookie"];    
                        
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
            
            //Note: correct cookie for web api is currently derived from the /switch/find call.
            //If trying to contact /switchdesc/find before /switch/find, will return "Not Found".
            DescArr = [];
            
            for(var i=0; i<normalizedObject.length; i++){
                    var DPID = normalizedObject[i].DPID;
                    
                
                var username = 'admin';
                var password = 'admin';
                var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

                // auth is: 'Basic VGVzdDoxMjM='
                
                if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }

                var options = {
                  hostname: host,
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
                'Cookie': ctlr.cookie,
                                               'Host':'localhost:8080',
                'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'};

                //console.log(options.headers);
                
                var responseString = '';

                var http = require('http');

               http.get(options, function(res) {
                  var body = '';
                  res.on('data', function(chunk) {
                    body += chunk;
                  });
                  res.on('end', function() {
                     //console.log(res);
                      //console.log(body);
                    if (body.charAt(0) === '\n' || body.charAt(0) === '<'){
                        //To handle ODL's xml responses
                        for(var j=0; j<normalizedObject.length; j++){
                            normalizedObject[j].Manufacturer = 'Not found';
                            normalizedObject[j].Hardware = 'Not found';
                            normalizedObject[j].Software = 'Not found';
                            normalizedObject[j].SerialNum = 'Not found';
                        }
                        cb(null,normalizedObject);
                    }

                    else{
                    DescObj = JSON.parse(body);       
                    
                    //DescArr.push(DescObj);    
                      
                    //Parsing must be found here, dpid is not found
                        
                    DescObj = ctlr.nodeParse('switchdesc2', DescObj, normalizedObject);
                        
                    DescObj = ctlr.normalize(DescObj);
                    
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
        
        else if(ctlr.dpParse && (call === 'flowstats' || call === 'switchports' || call === 'switchdesc')){
           console.log(normalizedObject);
            cb(null,normalizedObject);
        }
        
                     
        else{
            cb(null,normalizedObject);
        }

    }
    
}