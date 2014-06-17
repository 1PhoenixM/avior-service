// Actions for Avior API
var FLAdapter = require('../adapters/FLAdapter.js');
var ODLAdapter = require('../adapters/ODLAdapter.js');

var AviorController = {
    
    getPortStats: function(req,res) {
        sdn_controller = FLAdapter; //todo: set controller in one place
        sdn_controller.response = res;
        sdn_controller.getPortStats({args:['all']});
        },
    
    getHost: function (req,res) {
        sdn_controller = FLAdapter;
        sdn_controller.response = res;
        sdn_controller.getHosts({args:['default']}); //arg is for odl only, will be ignored in fl.
        //can create models/destroy models from here
        Hosts.create({
          MACAddress: "mac",
          ConnectedToSwitch: "switch",
          PortNum: 2 
           }).done(function(err, host) {

          if (err) {
            return console.log(err);

          }else {
            console.log("Host created:\n", host);
          }
        });
        //end create
      },
    
    getUptime:  function (req,res) {
        sdn_controller = FLAdapter;
        sdn_controller.response = res;
        sdn_controller.getUptime({});
      },
}

module.exports = AviorController;