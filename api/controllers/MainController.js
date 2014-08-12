module.exports = {
    
    identity: 'main',
        
    setinfo: function (req, res) {

        //console.log(sails.adapters.util.sdncontroller);

        sails.controllers.main.sdncontroller = req.param('connection');
        
        sails.controllers.main.hostname = req.param('hostname');
        
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
        res.json(jsonObj);
        }
        else if(sails.config.models.connection !== 'util'){
        jsonObj = {};
        jsonObj.sdncontroller = sails.config.models.connection;
        res.json(jsonObj);    
        }
        else{
        jsonObj = {};
        jsonObj.sdncontroller = "Not set at localhost:1337.";
        res.json(jsonObj);    
        }
    },
    
    unzip_plugin: function (req, res){
        //All this piece of code does is move the file. We could put a zip file here to move it into the directory, then extract from there.
        var fs = require('fs');
        fs.readFile('./PlexxiModel.js', {encoding: 'utf-8'}, function(err, data){
             fs.writeFileSync('./api/hooks/plugins/models/PlexxiModel.js', data, {});
        });
       
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
    }

};