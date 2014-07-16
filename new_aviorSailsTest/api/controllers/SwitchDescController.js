module.exports = {
    expectIntegerId: false,
    
    find: function(req, res){
    
    SwitchDesc.find({}, function(err, desc) {
          if(err) {return console.log(err);}
          else { //console.log("SwitchDesc found", desc); 
         
            if(req.param('id') && desc.length >= 1){
              for(var i=0;i<desc.length;i++){
                    if(desc[i].DPID === req.param('id').toString()){
                            return res.json(desc[i]);
                    }
                }
            }
            else {return res.json(desc)}
        }
        });
        
        /*if(req.query){
            var dpid = req.query.DPID;
            console.log(dpid);
        }
        SwitchDesc.findOne(req.query.DPID)
        //.where({DPID: dpid})
        .exec(function (err, response) {
            res.send(response);
        });
        
        SwitchDesc.findOne({
          DPID: req.param('id')
        }).exec(function(err, desc) {

          // Error handling
          if (err) {
            return console.log(err);

          } else {
            console.log("SwitchDesc found", desc);
          }
        });*/
        
        //SwitchDesc.primaryKey = 'DPID';
        
        /*if(req.param('id')){
        console.log('Given: ' + req.param('id'));
        SwitchDesc.findOne({ DPID: req.param('id') }, function(err, desc) {
          if(err) {return console.log(err);}
          else { console.log("SwitchDesc found", desc); 
               res.json(desc);}
        });
        }*/
    },
              
    
    
    /*find: function(req, res) {    
    SwitchDesc.find(req.param('DPID')).exec(function (err, desc) {
      if (err) {throw err;}
      else {res.json(desc);}
    });   
    },*/
    
    create: function(req, res) {

    },

    destroy: function(req, res) {

    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    }
}