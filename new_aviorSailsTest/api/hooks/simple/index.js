module.exports = function pluginHook(sails) {

    return {
        checkForPlugins: function(){
            //TODO: Better searching / validations. Naming scheme or other validation?
            //Verbose output?
            
            /*console.log('Plugin checker loaded.');
            var fs = require('fs');
            fs.readdir('./api/plugins/', function(err, files){
                if (err) {throw err;}
                files.forEach(function(file){
                    console.log(file + ' found.');
                    if(file.search("Model.js") > 0){
                        fs.renameSync('./api/plugins/'+file+'', './api/models/'+file+'')
                        console.log(file + " was successfully loaded as a new Model.")
                    }
                    else if(file.search("Controller.js") > 0){
                        fs.renameSync('./api/plugins/'+file+'', './api/controllers/'+file+'')
                        console.log(file + " was successfully loaded as a new Controller.")
                    }
                    else{
                        console.log('Plugin check warning: File named: ' + file + ' was dropped because filename doesn\'t match Avior\'s naming scheme.');
                    }
                });
            });*/  
        },

        // Runs automatically when the hook initializes
        initialize: function (cb) {

            var hook = this;

            // You must trigger `cb` so sails can continue loading.
            // If you pass in an error, sails will fail to load, and display your error on the console.

            hook.checkForPlugins();

        return cb();
        }
    }
};