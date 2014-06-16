/**
 * Hosts
 *
 * @module      :: Model
 * @description :: A collection of data for the Host on the network.
 * @docs		:: In imagination land
 */

var Hosts = {
  attributes: {
      IPAddress: {
          //type:'STRING'
          //Not exactly sure how the parameters for this work but if it is requiring the input to be a valid IP address then this would be a nice feature to have. Need to look into this. If it doesnt work uncomment the type above and comment the type below.
          type:'IP'  
      },
    
      MACAddress: {
          type:'STRING',
          required: true
      },
      
      ConnectedToSwitch: {
          DPID:{
              type:'STRING',
              required: true
          },
          
          PortNum:{
            type:'INT',
            required:true
          }
      },
      
      LastConnected: {
          type: 'DATETIME'
      }
  }
};

module.exports = Hosts;