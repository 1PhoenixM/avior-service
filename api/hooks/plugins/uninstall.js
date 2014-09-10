module.exports = {
    uninstall: function uninstall(pluginName){
            //Will need to restart
            var Floodlight = require('../../adapters/FloodlightAdapter');  
            var Opendaylight = require('../../adapters/OpenDaylightAdapter');    
            var fs = require('fs');
            if(fs.existsSync('./api/hooks/plugins/files/' + pluginName)){
                console.log("Success, Plugin: " + pluginName + " will be removed.");
                if(sails.config.plugins.length){
                    for(var g=0; g<sails.config.plugins.length; g++){
                        if(sails.config.plugins[g] === pluginName){
                            sails.config.plugins.splice(g, 1);
                            console.log(sails.config.plugins);
                        }
                    }
                }
                var files = fs.readdirSync('./api/hooks/plugins/files/' + pluginName); //not recursive, just adapter
                //Todo: save names when loaded
                for(var i=0; i<files.length; i++){
                    var file = files[i];
                    adapterIndex = file.search(/Adapter.js$/);
                    if(adapterIndex !== -1){
                       var adapter = files[i].substr(23, files[i].length);
                       var adapter = './' + adapter;
                       adp = require(adapter);
                       if(adp.floodlight){
                            for(key in adp.floodlight){
                                if(Floodlight[key]){
                                    delete Floodlight[key];
                                }
                           }
                       }
                    }
                }
                fs.renameSync('./api/hooks/plugins/files/' + pluginName, './.tmp/pluginstore/' + pluginName);
            }
            else{
                console.log("Error: Plugin: " + pluginName + " was not found.");   
            }
        },    
}