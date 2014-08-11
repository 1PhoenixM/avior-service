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
        var filename = req.param('name');
        console.log(filename);
        var DecompressZip = require('decompress-zip');
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
        });
    }

};