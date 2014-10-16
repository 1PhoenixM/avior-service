module.exports = {
    
    deleteFolderRecursive: function deleteFolderRecursive(path) {
     var fs = require('fs'); 
     if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
          var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
    },
    
    uninstall: function uninstall(pluginName){
            var self = this;
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
                            //console.log(sails.config.plugins);
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
                        if(adp.opendaylight){
                            for(key in adp.opendaylight){
                                if(Opendaylight[key]){
                                    delete Opendaylight[key];
                                }
                           }
                       }
                    }
                }
                //Todo: separate plugins to be removed as selected.
                //fs.renameSync('./api/hooks/plugins/files/' + pluginName, './.tmp/pluginstore/' + pluginName);
                fs.readFile('./api/hooks/plugins/names.txt', {encoding: 'utf-8'}, function (err, data) {
                    if (err) throw err;
                    //console.log(data);
                    var nameArray = data.split("\n");
                    //console.log(nameArray);
                    
                    nameArray.pop();
                    
                    var counter  = 0;
                        for(var i=0; i<nameArray.length; i++){
                        
                        if(fs.lstatSync(nameArray[i]).isDirectory()){
                           self.deleteFolderRecursive(nameArray[i]); 
                        }
                            
                        else{    
                            fs.unlink(nameArray[i], function (err) {
                                if (err) throw err;
                                //console.log('Successfully deleted ' + nameArray[i]);
                                counter++;
                                if(counter === nameArray.length - 1){ //todo: fix to clear out old names.
                                fs.writeFile('./api/hooks/plugins/names.txt', '', function (err) {
                                  if (err) throw err;
                                  console.log('names.txt was cleared out.');
                                    });
                                }
                            });
                        }
                           
                        }
                    });
                
            }
            else{
                console.log("Error: Plugin: " + pluginName + " was not found.");   
            }
        },    
}