/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://links.sailsjs.org/docs/config/connections
 */

module.exports.connections = {

  // Local disk storage for DEVELOPMENT ONLY
  //
  // Installed by default.
  //
    
  //default: 'rest',
 

  localDiskDb: {
    adapter: 'sails-disk'
  },

  // MySQL is the world's most popular relational database.
  // http://en.wikipedia.org/wiki/MySQL
  //
  // Run:
  // npm install sails-mysql
  //
  someMysqlServer: {
    adapter: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_MYSQL_DB'
  },

  // MongoDB is the leading NoSQL database.
  // http://en.wikipedia.org/wiki/MongoDB
  //
  // Run:
  // npm install sails-mongo
  //
  someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    // database: 'your_mongo_db_name_here'
  },

  // PostgreSQL is another officially supported relational database.
  // http://en.wikipedia.org/wiki/PostgreSQL
  //
  // Run:
  // npm install sails-postgresql
  //
  somePostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_POSTGRES_USER',
    password: 'YOUR_POSTGRES_PASSWORD',
    database: 'YOUR_POSTGRES_DB'
  },
    
    
  rest: {
    adapter: 'sails-rest',
    type: 'json',             // expected response type (json | string | http)
    host: '10.11.17.40', // api host
    port: 8080,                 // api port
    protocol: 'http',         // HTTP protocol (http | https)
    pathname: '/wm',       // base api path
    resource: '/device/',           // resource path to use (overrides model name)
    action: null,             // action to use for the given resource ([resource]/run)
    query: {method:'GET'},                // query parameters to provide with all GET requests
    methods: {                // overrides default HTTP methods used for each CRUD action
      create: 'post',
      find: 'get',
      update: 'put',
      destroy: 'del'
    },
    beforeFormatResult: function(result){return result},    // alter result prior to formatting
    afterFormatResult: function(result){return result},     // alter result after formatting
    beforeFormatResults: function(results){return results}, // alter results prior to formatting
    afterFormatResults: function(results){return results},  // alter results after formatting
    //cache: {                  // optional cache engine
      //engine : require('someCacheEngine')
    //}
  },

  floodlight: {
    adapter: 'floodlight',
    hostname: '10.11.17.40',
    port: '8080'
  },
    
  opendaylight: {
   adapter: 'opendaylight',
   hostname: 'localhost',
   port: '8080',
   user: 'admin',
   password: 'admin'
  } //TODO: mask auth

  // More adapters:
  // https://github.com/balderdashy/sails

};
