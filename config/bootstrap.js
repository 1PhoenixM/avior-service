/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  
  //Plugin integration continues here from /api/hooks/plugins/index.js  
  var Floodlight = require('../api/adapters/FloodlightAdapter');
  var Opendaylight = require('../api/adapters/OpenDaylightAdapter');    
    
  /*var adp = require('../api/hooks/plugins/files/FloodlightRole/AviorAdapter');
    
                        if(adp.floodlight){
                            for(key in adp.floodlight){
                                if(key === 'TO_OFP'){
                                    for(ky in adp.floodlight.TO_OFP){
                                    Floodlight.TO_OFP[ky] = adp.floodlight.TO_OFP[ky]; //use this.TO_OFP   
                                    }
                                }
                                else{
                                Floodlight[key] = adp.floodlight[key];
                                }
                            }
                             //console.log(Floodlight);
                        }
                        
                        if(adp.opendaylight){
                             for(key in adp.opendaylight){
                                if(key === 'TO_OFP'){
                                    for(ky in adp.opendaylight.TO_OFP){
                                    Opendaylight.TO_OFP[ky] = adp.opendaylight.TO_OFP[ky]; //use this.TO_OFP
                                    }
                                }
                                else{
                                Opendaylight[key] = adp.opendaylight[key];
                                }
                            }   
                        }*/
    
  cb();
};
