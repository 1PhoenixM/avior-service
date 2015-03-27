module.exports = {
    find: function(req, res){
     
    //Sets dpid for any switchport call, not just floodlight
        
    if(sails.controllers.main.sdncontroller === 'floodlight'){    
        var DPID = req.param('id');
        
        var Floodlight = require('../adapters/FloodlightAdapter');
        
        Floodlight.dpid = DPID;
        
    } else if(sails.controllers.main.sdncontroller == 'mul'){
        var DPID = req.param('id');
        var Mul = require('../adapters/MulAdapter');
        Mul.dpid = DPID;
    }
        
        SwitchPorts.find({}, function(err, ports) {
          if(err) {return console.log(err);}
          else { 
            if(req.param('id') && ports.length >= 1){
              for(var i=0;i<ports.length;i++){
                    if(ports[i].DPID === req.param('id').toString()){
                            return res.json(ports[i]);
                    }
                }
            }
            else {return res.json(ports)}
        }
        });
    },
    create: function(req, res) {

    },

    destroy: function(req, res) {

    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    }
  
};
