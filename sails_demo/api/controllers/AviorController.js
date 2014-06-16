// Actions for Avior API
var FLAdapter = require('../../FLAdapter.js');
var ODLAdapter = require('../../ODLAdapter.js');

var AviorController = {
    getHost: function (req,res) {
        sdn_controller = FLAdapter;
        sdn_controller.response = res;
        sdn_controller.getHosts({});
        //Hosts.create({});
      },
    
    getUptime:  function (req,res) {
        sdn_controller = FLAdapter;
        sdn_controller.response = res;
        sdn_controller.getUptime({});
      },
}

module.exports = AviorController;