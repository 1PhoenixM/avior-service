/**
 * Memory
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
 connection: ['util'],
  attributes: {
      TotalMemory:{
        type: 'integer',
        required: true
      },
      FreeMemory:{
        type: 'integer',
        required: true
      }
  }
};
