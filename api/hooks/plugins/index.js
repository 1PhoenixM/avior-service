//Much of this code is from: http://stackoverflow.com/questions/21085624/how-to-create-a-normal-sails-model-without-being-in-the-models-folder

// E.g. in /api/hooks/plugins/index.js
/*
 * Module dependencies
 */

var Waterline = require('waterline');
//var Role = require('./models/RoleModel.js'); 
/*var Role = 
    
    {
        
	identity: 'role',

	connection: 'util',

	attributes: {
        Role: {
            type: 'string',
            required: true,
        },
		Description: {
			type: 'string',
			required: true
		},
        Date: {
			type: 'string',
			required: true
		},
    }
};

var RolePlugin = {
    models: Role,
};*/

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
  function mountBlueprintsForModels(pluginModels) {
  _.each(pluginModels, function(pluginModel){
    var controller = _.cloneDeep(pluginModel);
    controller._config = { actions: true, rest: true, shortcuts: true };
    
    controller.index = function (req, res) {
        return res.send("To be completed...");
    };
      
    var controllerId = pluginModel.identity;

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
      sails.after('hook:orm:loaded', function() {
          pluginLoader(function(err, plugins) {
            //plugins = [RolePlugin];  

            var fs = require('fs');

            //var plugins = fs.readdirSync('./api/hooks/plugins/models');
              
            var recursive = require('recursive-readdir');
              
            recursive('./api/hooks/plugins/files', function (err, files) {
              // Files is an array of filename
                
            arr = [];
                
            for(var g=0; g<files.length; g++){
                    var file = files[g];
                    var index = file.search("Model.js");
                    if(index !== -1){
                        var model = files[g].substr(17, files[g].length);
                        var model = '.' + model;
                        mod = require(model);
                        obj = {};
                        obj.models = mod;
                        arr.push(obj);
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
          injectPluginModels(pluginModels, cb);
          mountBlueprintsForModels(pluginModels);
          //console.log(sails.models);
              //console.log(files);
            });

    });

    });

      
    }
  }
  
}