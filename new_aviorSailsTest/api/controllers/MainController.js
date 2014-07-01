module.exports = {
  setinfo: function (req, res) {
    sails.config.models.connection = req.param('connection');
    //sails.models.host.connection = req.param('connection')   
    var currentconn = sails.config.models.connection;
    sails.config.connections.floodlight.hostname = req.param('hostname'); //hardcoded for now
    console.log('\nSet.');
  }
};