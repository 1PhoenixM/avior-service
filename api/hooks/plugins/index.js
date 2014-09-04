//Much of this code is from: http://stackoverflow.com/questions/21085624/how-to-create-a-normal-sails-model-without-being-in-the-models-folder

// E.g. in /api/hooks/plugins/index.js
/*
 * Module dependencies
 */

var Waterline = require('waterline');

module.exports = function(sails) {

function injectPluginModels(pluginModels, cb) {
  // copy sails/lib/hooks/orm/loadUserModules to make it accessible here
    
  var loadUserModelsAndAdapters = require('./loadUserModules')(sails);
    
  async.auto({
    // 1. load api/models, api/adapters
    _loadModules: loadUserModelsAndAdapters,

    // 2. Merge additional models,  3. normalize model definitions
    modelDefs: ['_loadModules', function(next){
      _.each(pluginModels, function(pluginModel) {
         _.merge(sails.models, pluginModel);
      });

      _.each(sails.models, sails.hooks.orm.normalizeModelDef);
      next(null, sails.models);
    }],

    // 4. Load models into waterline, 5. tear down connections, 6. reinitialize waterline
    instantiatedCollections: ['modelDefs', function(next, stack){
      var modelDefs = stack.modelDefs;

      var waterline = new Waterline();
      _.each(modelDefs, function(modelDef, modelID){
        waterline.loadCollection(Waterline.Collection.extend(modelDef));
      });

      var connections = {};

      _.each(sails.adapters, function(adapter, adapterKey) {
        _.each(sails.config.connections, function(connection, connectionKey) {
          if (adapterKey !== connection.adapter) return;
          connections[connectionKey] = connection;
        });
      });

      var toTearDown = [];

      _.each(connections, function(connection, connectionKey) {
        toTearDown.push({ adapter: connection.adapter, connection: connectionKey });
      });

      async.each(toTearDown, function(tear, callback) {
         sails.adapters[tear.adapter].teardown(tear.connection, callback);
      }, function(){
         waterline.initialize({
           adapters: sails.adapters,
           connections: connections
         }, next)
      });
    }],
 
    // 7. Expose initialized models to global scope and sails
    _prepareModels: ['instantiatedCollections', sails.hooks.orm.prepareModels]

  }, cb);
};
    
    
  // injectPluginModels and mountBlueprintsForModels defined here
  function mountBlueprintsForModels(pluginModels, pluginControllers) {
  _.each(pluginModels, function(pluginModel){
 
              var controller = _.cloneDeep(pluginModel);
                controller._config = { actions: true, rest: true, shortcuts: true };

                controller.index = function (req, res) {
                    return res.send("To be completed...");
                };

                controllerId = pluginModel.identity;
              
           
               if (!_.isObject(sails.controllers[controllerId])) {
                  sails.controllers[controllerId] = controller;
                }

                if (!_.isObject(sails.hooks.controllers.middleware[controllerId])) {
                  sails.hooks.controllers.middleware[controllerId] = controller;
                }
    });
}

    function pluginLoader(cb){
        //filesystem iterator
        cb();
    }

  return {

    initialize: function(cb) {
       var Floodlight = require('../../adapters/FloodlightAdapter');  
              
       var Opendaylight = require('../../adapters/OpenDaylightAdapter');    
    
        sails.after('hook:orm:loaded', function() {
          pluginLoader(function(err, plugins) {
            //plugins = [RolePlugin];  

            var fs = require('fs');
              
            var path = require('path');  

            //var plugins = fs.readdirSync('./api/hooks/plugins/models');
              
            var recursive = require('recursive-readdir');
              
            recursive('./api/hooks/plugins/files', function (err, files) {
              // Files is an array of filename
                
            arr = [];
                
            for(var g=0; g<files.length; g++){
                    var file = files[g];
                    var modindex = file.search("Model.js"); //change to identify files in the Model folder
                    if(modindex !== -1){
                        var model = files[g].substr(17, files[g].length);
                        var model = '.' + model;
                        mod = require(model);
                        obj = {};
                        obj.models = mod;
                        obj.controllers = {};
                        obj.adapters = {};
                        arr.push(obj);
                    }
                    /*var ctlrindex = file.search("Controller.js");
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
                   var adapterindex = file.search("Adapter.js");
                   if(adapterindex !== -1){
                        var adapter = files[g].substr(17, files[g].length);
                        var adapter = '.' + adapter;
                        adp = require(adapter);
                        sails.config.plugin = adp;
                        
                       obj = {};
                       obj.models = {};
                       obj.controllers = {};
                       obj.adapters = adp;
                       arr.push(obj);
                       
                       /*if(adp.floodlight){
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
                        }*/
                    }
                
                //Views are moved into their folders for the restart
                //To handle: Python scripts folder
                var apindex = file.search("API.js");
                if(apindex !== -1){
                    var API = files[g].substr(24, files[g].length);
                    var APIName = path.basename(API);
                    fs.renameSync('./api/hooks/plugins/files/' + API, './assets/avior/js/floodlight/' + APIName);
                }
                var modelfindex = file.search("ModelF.js");
                if(modelfindex !== -1){
                    var ModelF = files[g].substr(24, files[g].length);
                    var ModelFName = path.basename(ModelF);
                    fs.renameSync('./api/hooks/plugins/files/' + ModelF, './assets/avior/js/model/' + ModelFName);
                }
                var collectionindex = file.search("Collection.js");
                if(collectionindex !== -1){
                    var Collection = files[g].substr(24, files[g].length);
                    var CollectionName = path.basename(Collection);
                    fs.renameSync('./api/hooks/plugins/files/' + Collection, './assets/avior/js/collection/' + CollectionName);
                }
                var viewindex = file.search("View.js");
                if(viewindex !== -1){
                    var View = files[g].substr(24, files[g].length);
                    var ViewName = path.basename(View);
                    fs.renameSync('./api/hooks/plugins/files/' + View, './assets/avior/js/view/' + ViewName);
                }
                var tplindex = file.search("tpl.html");
                if(tplindex !== -1){
                    var Template = files[g].substr(24, files[g].length);
                    var TemplateName = path.basename(Template);
                    fs.renameSync('./api/hooks/plugins/files/' + Template, './assets/avior/tpl/' + TemplateName);
                }
                var routeindex = file.search("Router.js");
                if(routeindex !== -1){
                    var Router = files[g].substr(24, files[g].length);
                    var RouterName = path.basename(Router);
                    fs.renameSync('./api/hooks/plugins/files/' + Router, './assets/avior/js/router/' + RouterName);
                }
            }

            /*for(var i=0; i<plugins.length; i++){

                        mod = require('./files/' + plugins[i]);
                        obj = {};
                        obj.models = mod;
                        arr.push(obj);

            }*/

            plugins = arr;
             
          // assuming plugin.models holds array of models for this plugin
          // customize for your use case
          var pluginModels = _.pluck(plugins, 'models');
          var pluginControllers = _.pluck(plugins, 'controllers');
          var pluginAdapters = _.pluck(plugins, 'adapters');
           
          injectPluginModels(pluginModels, cb);
          mountBlueprintsForModels(pluginModels, pluginControllers);      
                
            });

    });

    });

      
    }
  }
  
}