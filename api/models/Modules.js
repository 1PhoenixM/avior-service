/**
 * Modules
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  identity: "modules",
  
  attributes: {
    Name: {
        type: "string",
        required: true
    },
    Loaded: {
        type: "string",
        required: true
    },
    Provides: {
        type: "string",
        required: true
    },
    Depends: {
        type: "string",
        required: true
    },
    
  }

};
