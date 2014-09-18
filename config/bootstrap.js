/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  
  //Plugin integration continues here from /api/hooks/plugins/index.js  
  //var Floodlight = require('../api/adapters/FloodlightAdapter');
  //var Opendaylight = require('../api/adapters/OpenDaylightAdapter');    
  
    /*var AdapterArray = [];
  var fs = require('fs');
  var plugins = fs.readdirSync('./api/hooks/plugins/files/');
  for(var i=0; i<plugins.length; i++){
      if (plugins[i].search('.') === -1){ //No extension, so it's a directory
         var pluginfiles = fs.readdirSync('./api/hooks/plugins/files/' + plugins[i]); 
         for(var j=0; j<pluginfiles.length; j++){
            if(pluginfiles[j].search("Adapter.js") !== -1){
                var adapter = require('./api/hooks/plugins/files/' + pluginfiles[j]);
                AdapterArray.push(adapter);
            }
         }
      }
  }*/
  
  
            sails.config.plugins = [];
    
    
            var fs = require('fs');
              
            var path = require('path');  

            //var plugins = fs.readdirSync('./api/hooks/plugins/models');
              
            var recursive = require('recursive-readdir');
              
            recursive('./api/hooks/plugins/files', function (err, files) {
              // Files is an array of filename
                
            arr = [];
                
            var Floodlight = sails.adapters.floodlight;
            var Opendaylight = sails.adapters.opendaylight;   
                
            for(var g=0; g<files.length; g++){
                    var file = files[g];
                    /*var modindex = file.search(/Model.js$/); //change to identify files in the Model folder
                    if(modindex !== -1){
                        var model = files[g];
                        var model = '../' + model;
                        mod = require(model);
                        obj = {};
                        obj.models = mod;
                        obj.controllers = {};
                        obj.adapters = {};
                        arr.push(obj);
                    }*/
                    /*var ctlrindex = file.search(/Controller.js$/);
                    if(ctlrindex !== -1){
                        var controller = files[g].substr(17, files[g].length);
                        var controller = '.' + controller;
                        ctr = require(controller);
                        obj = {};
                        obj.controllers = ctr;
                        obj.models = {}; //all objects must have a controllers prop and a models prop
                        obj.adapters = {};
                        arr.push(obj);
                    }*/
                   var adapterindex = file.search(/Adapter.js$/); //regex
                   if(adapterindex !== -1){
                        var adapter = files[g];
                       //fs.appendFileSync('./api/hooks/plugins/names.js', adapter + ',', {encoding: 'utf-8'});
                        var adapter = '../' + adapter;
                        adp = require(adapter);
                        sails.config.plugin = adp;
                       
                       //Plugin registering: depends on adapter being in top-level directory.
                       var endOfName = adapter.lastIndexOf("/"); //Essentially getting the folder name for that plugin.
                       var pluginName = adapter.substring(27, endOfName);
                       //console.log(pluginName);
                       sails.config.plugins.push(pluginName);
                       //can't delete dirs
                       //fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './api/hooks/plugins/files/' + pluginName + '' + ',', {encoding: 'utf-8'});
                      // fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './api/hooks/plugins/zipped/' + pluginName + '.zip' + '\n', {encoding: 'utf-8'});
                       
                       obj = {};
                       obj.models = {};
                       obj.controllers = {};
                       obj.adapters = adp;
                       arr.push(obj);
                       
                       if(adp.floodlight){
                            for(key in adp.floodlight){
                                if(key === 'TO_OFP'){
                                    for(ky in adp.floodlight.TO_OFP){
                                    Floodlight.TO_OFP[ky] = adp.floodlight.TO_OFP[ky]; //use this.TO_OFP   
                                    }
                                }
                                else{
                                Floodlight[key] = adp.floodlight[key];
                                }
                            }    
                        }
                        
                        if(adp.opendaylight){
                             for(key in adp.opendaylight){
                                if(key === 'TO_OFP'){
                                    for(ky in adp.opendaylight.TO_OFP){
                                    Opendaylight.TO_OFP[ky] = adp.opendaylight.TO_OFP[ky]; //use this.TO_OFP
                                    }
                                }
                                else{
                                Opendaylight[key] = adp.opendaylight[key];
                                }
                            }   
                        }
                    }
                
                //Views are moved into their folders for the restart
                //To handle: Python scripts folder
                var apindex = file.search(/API.js$/);
                if(apindex !== -1){
                    var API = files[g].substr(24, files[g].length);
                    var APIName = path.basename(API);
                    fs.renameSync('./api/hooks/plugins/files/' + API, './assets/avior/js/floodlight/' + APIName);
                    fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './assets/avior/js/floodlight/' + APIName + '' + '\n', {encoding: 'utf-8'});
                }
                var modelfindex = file.search(/ModelF.js$/);
                if(modelfindex !== -1){
                    var ModelF = files[g].substr(24, files[g].length);
                    var ModelFName = path.basename(ModelF);
                    fs.renameSync('./api/hooks/plugins/files/' + ModelF, './assets/avior/js/model/' + ModelFName);
                    fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './assets/avior/js/model/' + ModelFName + '' + '\n', {encoding: 'utf-8'});
                }
                var collectionindex = file.search(/Collection.js$/);
                if(collectionindex !== -1){
                    var Collection = files[g].substr(24, files[g].length);
                    var CollectionName = path.basename(Collection);
                    fs.renameSync('./api/hooks/plugins/files/' + Collection, './assets/avior/js/collection/' + CollectionName);
                    fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './assets/avior/js/collection/' + CollectionName + '' + '\n', {encoding: 'utf-8'});
                }
                var viewindex = file.search(/View.js$/);
                if(viewindex !== -1){
                    var View = files[g].substr(24, files[g].length);
                    var ViewName = path.basename(View);
                    fs.renameSync('./api/hooks/plugins/files/' + View, './assets/avior/js/view/' + ViewName);
                    fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './assets/avior/js/view/' + ViewName + '' + '\n', {encoding: 'utf-8'});
                }
                var tplindex = file.search(/tpl.html$/);
                if(tplindex !== -1){
                    var Template = files[g].substr(24, files[g].length);
                    var TemplateName = path.basename(Template);
                    fs.renameSync('./api/hooks/plugins/files/' + Template, './assets/avior/tpl/' + TemplateName);
                    fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './assets/avior/tpl/' + TemplateName + '' + '\n', {encoding: 'utf-8'});
                }
                var routeindex = file.search(/pluginrouter.js$/);
                if(routeindex !== -1){
                    var Router = files[g].substr(24, files[g].length);
                    var RouterName = path.basename(Router);
                    fs.renameSync('./api/hooks/plugins/files/' + Router, './assets/avior/js/router/' + RouterName); //change to pluginrouter
                    fs.appendFileSync('./api/hooks/plugins/names.txt', '' + './assets/avior/js/router/' + RouterName + '' + '\n', {encoding: 'utf-8'});
                
                }
            }

            cb();    
                
            });
    
  /*var adp = AdapterArray[0];
  var adp = require('../api/hooks/plugins/files/FloodlightRole/AviorAdapter');
    
                        if(adp.floodlight){
                            for(key in adp.floodlight){
                                if(key === 'TO_OFP'){
                                    for(ky in adp.floodlight.TO_OFP){
                                    Floodlight.TO_OFP[ky] = adp.floodlight.TO_OFP[ky]; //use this.TO_OFP   
                                    }
                                }
                                else{
                                Floodlight[key] = adp.floodlight[key];
                                }
                            }
                             //console.log(Floodlight);
                        }
                        
                        if(adp.opendaylight){
                             for(key in adp.opendaylight){
                                if(key === 'TO_OFP'){
                                    for(ky in adp.opendaylight.TO_OFP){
                                    Opendaylight.TO_OFP[ky] = adp.opendaylight.TO_OFP[ky]; //use this.TO_OFP
                                    }
                                }
                                else{
                                Opendaylight[key] = adp.opendaylight[key];
                                }
                            }   
                        }*/
    
  //cb();
};
