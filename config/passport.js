var passport    = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
module.exports = {
 express: {
    customMiddleware: function(app){
      console.log('express middleware for passport');
      app.use(passport.initialize());
        //app.use( express.cookieParser() );
        //app.use(express.session({ secret: 'my secret', cookie: { maxAge : //1200000 } }));
      app.use(passport.session());
    }
  }
};
