/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/user/login`
   */
   login: function (req, res) {
    
    // Send a JSON response
    return res.login({
        successRedirect: '#controllers'
    });
  },


  /**
   * Action blueprints:
   *    `/user/logout`
   */
   logout: function (req, res) {
    
    // Send a JSON response
    req.logout();
    return res.ok('Logged out successfully.');
  },


  /**
   * Action blueprints:
   *    `/user/signup`
   */
   signup: function (req, res) {
    
    // Send a JSON response
   User.create(req.params.all()).exec(function (err, user) {
     if (err) return res.negotiate(err);
        req.login(user, function (err){
          if (err) return res.negotiate(err);
          return res.redirect('#controllers');
        });
     });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
