/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');

module.exports = {
    
    identity: 'auth',

  index: function(req, res) {
    res.view();
  },

  logout: function(req, res) {
    req.logout();
      res.send('{ logout successful }');
    //res.redirect('/');
  },

  // http://developer.github.com/v3/
  // http://developer.github.com/v3/oauth/#scopes
  github: function(req, res) {
    passport.authenticate('github', { failureRedirect: '/login' }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  // https://developers.facebook.com/docs/
  // https://developers.facebook.com/docs/reference/login/
  facebook: function(req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  // https://developers.google.com/
  // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
  google: function(req, res) {
    passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  // https://apps.twitter.com/
  // https://apps.twitter.com/app/new
  twitter: function(req, res) {
    passport.authenticate('twitter', { failureRedirect: '/login' }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },
    
  local: function(req, res) {
    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)) res.send(err);
      req.logIn(user, function(err){
        if (err) res.send(err);
        res.send({ message: 'login successful' });
        return;
      });
    })(req, res);
  },
 login: function(req, res){
    passport.authenticate('local', function(err, user, info){
    if ((err) || (!user)) res.send(err);
    req.logIn(user, function(err){
    if (err) res.send(err);
         
    return res.send({ message: 'login successful' });
    });
    })(req, res);
    },
    
};
