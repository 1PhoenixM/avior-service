/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var util = require('util')
  , _ = require('lodash')
  //, getSDKMetadata = require('../sockets/lib/getSDKMetadata')
  //, STRINGFILE = require('sails-stringfile');

var bcrypt = require('bcrypt');
module.exports = {
    connection: ['util'],
  attributes: {
    id: {
      type: 'string',
      unique: true,
      primaryKey: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },

    //Override toJSON method to remove password from API
    toJSON: function() {
      var obj = this.toObject();
      // Remove the password object value
      delete obj.password;
      // return the new object without password
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  },

    publishCreate: function(values, req, options) {
        var self = this;

        options = options || {};

        if (!values[this.primaryKey]) {
          return sails.log.error(
            'Invalid usage of publishCreate() :: ' +
            'Values must have an `'+this.primaryKey+'`, instead got ::\n' +
            util.inspect(values)
          );
        }

        if (sails.util.isFunction(this.beforePublishCreate)) {
          this.beforePublishCreate(values, req);
        }

        var id = values[this.primaryKey];

        // If any of the added values were association attributes, publish add or remove messages.
        _.each(values, function(val, key) {

          // If the user hasn't yet given this association a value, bail out
          if (val === null) {
            return;
          }

          var association = _.find(this.associations, {alias: key});

          // If the attribute isn't an assoctiation, return
          if (!association) return;

          // Get the associated model class
          var ReferencedModel = sails.models[association.type == 'model' ? association.model : association.collection];

          // Bail if the model doesn't exist
          if (!ReferencedModel) return;

          // Bail if this attribute isn't in the model's schema
          if (association.type == 'model') {

            // Get the inverse association definition, if any
            reverseAssociation = _.find(ReferencedModel.associations, {collection: this.identity, via: key}) || _.find(ReferencedModel.associations, {model: this.identity, via: key});

              if (!reverseAssociation) {return;}

              // If this is a to-many association, do publishAdd on the other side
              // TODO -- support nested creates.  For now, we can't tell if an object value here represents
              // a NEW object or an existing one, so we'll ignore it.
              if (reverseAssociation.type == 'collection' && !_.isObject(val)) {
                  ReferencedModel.publishAdd(val, reverseAssociation.alias, id, {noReverse:true});
              }
              // Otherwise do a publishUpdate
              // TODO -- support nested creates.  For now, we can't tell if an object value here represents
              // a NEW object or an existing one, so we'll ignore it.
              else {

                var pubData = {};

                if (!_.isObject(val)) {
                  pubData[reverseAssociation.alias] = id;
                  ReferencedModel.publishUpdate(val, pubData, req, {noReverse:true});
                }

              }

          }

          else {

            // Get the inverse association definition, if any
            reverseAssociation = _.find(ReferencedModel.associations, {collection: this.identity, via: key}) || _.find(ReferencedModel.associations, {model: this.identity, alias: association.via});

              if (!reverseAssociation) {return;}

              // If this is a to-many association, do publishAdds on the other side
              if (reverseAssociation.type == 'collection') {

                // Alert any added models
                _.each(val, function(pk) {
                  // TODO -- support nested creates.  For now, we can't tell if an object value here represents
                  // a NEW object or an existing one, so we'll ignore it.
                  if (_.isObject(pk)) return;
                  ReferencedModel.publishAdd(pk, reverseAssociation.alias, id, {noReverse:true});
                });

              }

              // Otherwise do a publishUpdate
              else {

                // Alert any added models
                _.each(val, function(pk) {
                  // TODO -- support nested creates.  For now, we can't tell if an object value here represents
                  // a NEW object or an existing one, so we'll ignore it.
                  if (_.isObject(pk)) return;
                  var pubData = {};
                  pubData[reverseAssociation.alias] = id;
                  ReferencedModel.publishUpdate(pk, pubData, req, {noReverse:true});
                });

              }

            }

        }, this);

        // Ensure that we're working with a plain object
        values = _.clone(values);

        // If a request object was sent, get its socket, otherwise assume a socket was sent.
        var socketToOmit = (req && req.socket ? req.socket : req);

        // Blast success message
        sails.sockets.publishToFirehose({

          model: this.identity,
          verb: 'create',
          data: values,
          id: values[this.primaryKey]

        });

        // Publish to classroom
        var eventName = this.identity;
        this.broadcast(this._classRoom(), eventName, {
          verb: 'created',
          data: values,
          id: values[this.primaryKey]
        }, socketToOmit);

        // Also broadcasts a message to the legacy class room (derived by
        // using the `:legacy_v0.9` trailer on the class room name).
        // Uses traditional eventName === "message".
        // Uses traditional message format.
        if (sails.config.sockets['backwardsCompatibilityFor0.9SocketClients']) {
          var legacyData = _.cloneDeep({
            verb: 'create',
            data: values,
            model: self.identity,
            id: values[this.primaryKey]
          });
          var legacyRoom = this._classRoom()+':legacy_v0.9';
          self.broadcast( legacyRoom, 'message', legacyData, socketToOmit );
        }

        // Subscribe watchers to the new instance
        if (!options.noIntroduce) {
          this.introduce(values[this.primaryKey]);
        }

        if (sails.util.isFunction(this.afterPublishCreate)) {
          this.afterPublishCreate(values, req);
        }

      },
    
};
