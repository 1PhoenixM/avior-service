module.exports = {
    
    identity: 'main',
        
    setinfo: function (req, res) {

        //console.log(sails.adapters.util.sdncontroller);

        sails.controllers.main.sdncontroller = req.param('connection');
        
        sails.controllers.main.hostname = req.param('hostname');
        
        sails.controllers.main.opendaylight_version = req.param('odl_ver');
        
        //must enter a valid hostname, TODO: validation

        //console.log(sails.adapters.util.sdncontroller);

        //sails.adapters.util.setController();

        //console.log(sails.models.host.connection);  

        //sails.models.host.connection = "[ '" + req.param('connection') + "' ]";

        //console.log(sails.models.host.connection);

        //var currentconn = sails.config.models.connection;
        //sails.config.connections.floodlight.hostname = req.param('hostname'); //hardcoded for now
        //console.log('\nSet.');
    },
    
    fetchController: function (req, res){
        //Necessary for Avior to get the controller being used
        if(sails.controllers.main.sdncontroller){
        jsonObj = {};
        jsonObj.sdncontroller = sails.controllers.main.sdncontroller;
            if(jsonObj.sdncontroller === 'floodlight'){
            jsonObj.icon = '/avior/img/floodlight-icon.png';
            }
            else if(jsonObj.sdncontroller === 'opendaylight'){
            jsonObj.icon = '/avior/img/opendaylight-icon.png';    
            }
            else if(jsonObj.sdncontroller === 'ryu'){
            jsonObj.icon = '/avior/img/ryu-icon.png';    
            }
            else if(jsonObj.sdncontroller === 'mul'){
            jsonObj.icon = '/avior/img/mul-icon.ico';
            }
            else{
            jsonObj.icon = '';    
            }
            //jsonObj.icon = '/avior/img/' + jsonObj.sdncontroller '-icon.png';
        res.json(jsonObj);
        }
        else if(sails.config.models.connection !== 'util'){
        jsonObj = {};
        jsonObj.sdncontroller = sails.config.models.connection;
            if(jsonObj.sdncontroller === 'floodlight'){
            jsonObj.icon = '/avior/img/floodlight-icon.png';
            }
            else if(jsonObj.sdncontroller === 'opendaylight'){
            jsonObj.icon = '/avior/img/opendaylight-icon.png';    
            }
            else if(jsonObj.sdncontroller === 'ryu'){
            jsonObj.icon = '/avior/img/ryu-icon.png';    
            }
            else if(jsonObj.sdncontroller === 'mul'){
            jsonObj.icon = '/avior/img/mul-icon.png';
            }
            else{
            jsonObj.icon = '';    
            }
        res.json(jsonObj);    
        }
        else{
        jsonObj = {};
        jsonObj.sdncontroller = "Not set at localhost:1337.";
        jsonObj.icon = '';
        res.json(jsonObj);    
        }
    },
    
    unzip: function (req, res){
        
        var formidable = require('formidable'),
            http = require('http'),
            util = require('util');
            
        
              if (req.url === '/files' && req.method.toLowerCase() === 'post') {
                  // parse a file upload
                var form = new formidable.IncomingForm();

                form.parse(req, function(err, fields, files) {
                  res.writeHead(200, {'content-type': 'text/plain'});
                  console.log(err);
                  console.log(fields);
                  console.log(files);
                  res.write('received upload:\n\n');
                  res.end(util.inspect({fields: fields, files: files}));
                });
                  
                return;
              }

              // show a file upload form 
              res.writeHead(200, {'content-type': 'text/html'});
              res.end(
                '<form action="/files" enctype="multipart/form-data" method="post">'+
                '<input type="text" name="title"><br>'+
                '<input type="file" name="upload" multiple="multiple"><br>'+
                '<input type="submit" value="Upload">'+
                '</form>'
              );
            
        //All this piece of code does is move the file. We could put a zip file here to move it into the directory, then extract from there.
        
        /*var fs = require('fs');
        fs.readFile('./PlexxiModel.js', {encoding: 'utf-8'}, function(err, data){
             fs.writeFileSync('./api/hooks/plugins/models/PlexxiModel.js', data, {});
        });*/
       
        /*
        var file = req.param('name');
        console.log(file);
            file = file.substr(12, file.length); //C:/fakepath/
            console.log(file);
            if(file.search("Model.js") > 0){
                            fs.renameSync('C:/fakepath/'+file+'', './api/hooks/plugins/models/'+file+'')
                            //sails.models[file] = './api/plugins/'+file+''; //How to do this?

                            //file = file.substring(0, file.length - 3);
                            //var plugin = require('../../plugins/'+file+'');
                            //sails.models[file] = plugin;

                            console.log(file + " was successfully loaded as a new Model on restart.")
                        }
                        else if(file.search("Controller.js") > 0){
                            fs.renameSync('C:/fakepath/'+file+'', './api/hooks/plugins/controllers/'+file+'')
                            //sails.controllers[file] = './api/plugins/'+file+'';
                            console.log(file + " was successfully loaded as a new Controller on restart.")
                        }
                        else{
                            console.log("Unknown file " + file);
                        }
                        */
        
        /*var DecompressZip = require('decompress-zip');
        var unzipper = new DecompressZip(filename)

        unzipper.on('error', function (err) {
            console.log('Caught an error: ' + err);
        });

        unzipper.on('extract', function (log) {
            console.log('Finished extracting');
        });

        unzipper.extract({
            path: '../hooks/plugins/models',
            filter: function (file) {
                return file.type !== "SymbolicLink";
            }
        });*/
    },
    
    files: function (req, res){
          // parse a file upload
        
                 var formidable = require('formidable'),
            http = require('http'),
            util = require('util');
        
                var form = new formidable.IncomingForm();

                form.parse(req, function(err, fields, files) {
                  res.writeHead(200, {'content-type': 'text/plain'});
                  console.log(err);
                  console.log(fields);
                  console.log(files);
                  res.write('received upload:\n\n');
                  res.end(util.inspect({fields: fields, files: files}));
                });
                  
                return;
        
        
    }

};
