module.exports = {
    find: function(req, res){
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
