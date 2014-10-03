/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function controllerSet(req, res, next) {
    
    if(sails.controllers.main.sdncontroller){
        next();
    }
    
    else{
        console.log('The action could not be completed. You have not specified an SDN controller at the landing page (/).');
        return res.forbidden('The action could not be completed. You have not specified an SDN controller at the landing page (/).');   
    }

};
