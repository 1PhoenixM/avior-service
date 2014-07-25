/**
 * FirewallModule
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  identity: "enablefirewall",
    
  attributes: {
    Status: {
        type: "string",
        required: true
    },
    Details: {
        type: "string",
        required: true
    },
    
  }

};
