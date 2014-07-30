module.exports = {
    
    identity: 'main',
        
    setinfo: function (req, res) {

        //console.log(sails.adapters.util.sdncontroller);

        sails.controllers.main.sdncontroller = req.param('connection');
        
        sails.controllers.main.hostname = req.param('hostname');
        
        console.log(sails.controllers.main.hostname); //must enter a valid hostname, TODO: validation

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
        res.json(sails.controllers.main.sdncontroller);
        }
        else if(sails.config.models.connection !== 'util'){
        res.json(sails.config.models.connection);    
        }
        else{
        res.json("Not set at localhost:1337.");    
        }
    },
};