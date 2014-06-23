// Actions for Avior API
var FLAdapter = require('../adapters/FLAdapter.js');
var ODLAdapter = require('../adapters/ODLAdapter.js');

var AviorController = {
    
    getPortStats: function(req,res) {
        sdn_controller = FLAdapter; //todo: set controller in one place
        sdn_controller.response = res;
        sdn_controller.getPortStats({args:['all']});
        },
    
    getHosts: function (req,res) {
        sdn_controller = FLAdapter;
        sdn_controller.response = res;
        sdn_controller.getHosts({args:['default']}); //arg is for odl only, will be ignored in fl.
      },
    
    getUptime:  function (req,res) {
        sdn_controller = FLAdapter;
        sdn_controller.response = res;
        sdn_controller.getUptime({});
      },
    
    create: function(req, res) {

    },

    destroy: function(req, res) {

    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    }
}

module.exports = AviorController;