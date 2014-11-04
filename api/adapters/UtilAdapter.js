var Floodlight = require('./FloodlightAdapter');
var OpenDaylight = require('./OpenDaylightAdapter');
var Ryu = require('./RyuAdapter');

module.exports = {
	identity: 'util',
    
    registerConnection: function (conn, coll, cb) {
            if (!conn.hostname) { conn.hostname = '10.11.17.40'; }
            if (!conn.port) { conn.port = '8080'; }
            if (!conn.method) { conn.method = 'GET'; }
            cb();
    },

    //Clears the active configuration allowing for a new one to be created
    teardown: function(connectionName, cb) {
      if(!sails.config.connections[connectionName]) return cb();
      delete sails.config.connections[connectionName];
      cb();
    },

    //establishes a connection to the proper adapter when given the Controller Type and Ip Address
    find: function (conn, coll, options, cb) {  
        if(!sails.controllers.main.sdncontroller && sails.config.models.connection === 'util'){
            sails.controllers.main.sdncontroller = 'floodlight'; 
        }
        switch(sails.controllers.main.sdncontroller){
         case 'floodlight': 
                Floodlight.find(conn, coll, options, cb);
                break;
         case 'opendaylight':
                OpenDaylight.find(conn, coll, options, cb);
                break;
        case 'ryu':
                Ryu.find(conn, coll, options, cb);
                break;
        default:
                console.log("Error: No valid controller was provided.");
                break;
        } 
    },


    create: function (conn, coll, options, cb) {
        if(!sails.controllers.main.sdncontroller && sails.config.models.connection === 'util'){
            sails.controllers.main.sdncontroller = 'floodlight';
        }
        switch(sails.controllers.main.sdncontroller){
         case 'floodlight': 
                Floodlight.create(conn, coll, options, cb);
                break;
         case 'opendaylight':
                OpenDaylight.create(conn, coll, options, cb);
                break;
        default:
                console.log("Error: No valid controller was provided.");
                break;
        }     
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

    pluginCallback: function(call, options, obj){
        return obj;
    },
}