module.exports = {

  identity: 'plugin',
    
  _config: {},

  pluginList: function(req, res){
    return res.json(sails.config.plugins);    
  },
    
  uninstall: function(req,res){
     var PluginUninstaller = require('../hooks/plugins/uninstall');
    PluginUninstaller.uninstall(req.param('id'));  
    return res.view('uninstallSuccess');
    //sails.hooks.plugins.index.uninstall(req.param('id'));  
  },
    
};
