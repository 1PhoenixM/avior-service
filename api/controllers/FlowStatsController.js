module.exports = {
    find: function(req, res){
    if(sails.controllers.main.sdncontroller == 'mul'){
        var DPID = req.param('id');
        var Mul = require('../adapters/MulAdapter');
        Mul.dpid = DPID;
    }

         FlowStats.find({}, function(err, flows) {
          if(err) {return console.log(err);}
          else { 
            if(req.param('id') && flows.length >= 1){
              for(var i=0;i<flows.length;i++){
                    if(flows[i].DPID === req.param('id').toString()){
                            return res.json(flows[i]);
                    }
                }
            }
            else {return res.json(flows)}
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

