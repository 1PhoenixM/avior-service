module.exports = {

  identity: 'config',
    
  index: function (req,res){
      /*var controller_main = req.param('controller_main');
      var host_main = req.param('host_main');
      var switch_main = req.param('switch_main');
      var topology_main = req.param('topology_main');
      var flow_main = req.param('flow_main');
      obj = {};
      obj.controller*/
      if(!sails.controllers.config.panels){
          obj = {
          controller_main: "topology_view",
          host_main: "topology_view",
          switch_main: "topology_view",
          topology_main: "host_view",
          flow_main: "switch_view"
        };
          res.json(obj);
      }
      else{
      res.json(sails.controllers.config.panels);
      }
  },
    
    setPanels: function(req, res){
        sails.controllers.config.panels = req.body;
    },
};

