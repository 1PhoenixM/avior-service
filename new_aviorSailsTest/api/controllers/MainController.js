module.exports = {
  setinfo: function (req, res) {
      
    //console.log(sails.adapters.util.sdncontroller);
      
    sails.adapters.util.sdncontroller = req.param('connection');
   
    //console.log(sails.adapters.util.sdncontroller);
      
    //sails.adapters.util.setController();
      
    //console.log(sails.models.host.connection);  
      
    //sails.models.host.connection = "[ '" + req.param('connection') + "' ]";
      
    //console.log(sails.models.host.connection);
      
    //var currentconn = sails.config.models.connection;
    //sails.config.connections.floodlight.hostname = req.param('hostname'); //hardcoded for now
    //console.log('\nSet.');
  }
};