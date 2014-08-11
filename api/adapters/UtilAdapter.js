var Floodlight = require('./FloodlightAdapter');
var OpenDaylight = require('./OpenDaylightAdapter');

module.exports = {
	identity: 'util',

    //sdncontroller: 'test',
    
        registerConnection: function (conn, coll, cb) {
                if (!conn.hostname) { conn.hostname = '10.11.17.40'; }
                if (!conn.port) { conn.port = '8080'; }
                if (!conn.method) { conn.method = 'GET'; }
                cb();
        },
    
        teardown: function(connectionName, cb) {
          if(!sails.config.connections[connectionName]) return cb();
          delete sails.config.connections[connectionName];
          cb();
        },
    
        /*setController: function() {
            var self = this;
             switch(this.sdncontroller){
             case 'floodlight': 
                    self = Floodlight;
                    console.log("Floodlight is now the active controller.");
                    break;
             case 'opendaylight':
                    self = OpenDaylight;
                    console.log("OpenDaylight is now the active controller.");
                    break;
            default:
                    console.log("Error: No valid controller was provided.");
                    break;
            } 
        },*/

        find: function (conn, coll, options, cb) {  
            if(!sails.controllers.main.sdncontroller && sails.config.models.connection === 'util'){
                sails.controllers.main.sdncontroller = 'floodlight';
            }
            switch(sails.controllers.main.sdncontroller){
             case 'floodlight': 
                    //console.log(sails.controllers.main.sdncontroller);
                    Floodlight.find(conn, coll, options, cb);
                    break;
             case 'opendaylight':
                    //console.log(sails.controllers.main.sdncontroller);
                    OpenDaylight.find(conn, coll, options, cb);
                    break;
            default:
                    console.log("Error: No valid controller was provided.");
                    break;
            } 
        },
    
        
        create: function (conn, coll, options, cb) {
            /*if(!sails.controllers.main.sdncontroller && sails.config.models.connection === 'util'){
                sails.controllers.main.sdncontroller = 'floodlight';
            }
            switch(sails.controllers.main.sdncontroller){
             case 'floodlight': 
                    //console.log(sails.controllers.main.sdncontroller);
                    Floodlight.create(conn, coll, options, cb);
                    break;
             case 'opendaylight':
                    //console.log(sails.controllers.main.sdncontroller);
                    OpenDaylight.create(conn, coll, options, cb);
                    break;
            default:
                    console.log("Error: No valid controller was provided.");
                    break;
            }*/        
        },
    
        update: function (conn, coll, options, cb) {
            /*if(!sails.controllers.main.sdncontroller && sails.config.models.connection === 'util'){
                sails.controllers.main.sdncontroller = 'floodlight';
            }
            switch(sails.controllers.main.sdncontroller){
             case 'floodlight': 
                    //console.log(sails.controllers.main.sdncontroller);
                    Floodlight.update(conn, coll, options, cb);
                    break;
             case 'opendaylight':
                    //console.log(sails.controllers.main.sdncontroller);
                    OpenDaylight.update(conn, coll, options, cb);
                    break;
            default:
                    console.log("Error: No valid controller was provided.");
                    break;
            }*/       
        },
    
        destroy: function (conn, coll, options, cb) {
            /*if(!sails.controllers.main.sdncontroller && sails.config.models.connection === 'util'){
                sails.controllers.main.sdncontroller = 'floodlight';
            }
            switch(sails.controllers.main.sdncontroller){
             case 'floodlight': 
                    //console.log(sails.controllers.main.sdncontroller);
                    Floodlight.destroy(conn, coll, options, cb);
                    break;
             case 'opendaylight':
                    //console.log(sails.controllers.main.sdncontroller);
                    OpenDaylight.destroy(conn, coll, options, cb);
                    break;
            default:
                    console.log("Error: No valid controller was provided.");
                    break;
            }*/        
        },
    
}