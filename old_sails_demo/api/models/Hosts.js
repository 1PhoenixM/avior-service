/**
 * Hosts
 *
 * @module      :: Model
 * @description :: A collection of data for the Host on the network.
 * @docs		:: In imagination land
 */

module.exports = {
  identity:'hosts',
    
  connection: 'floodlight',
    
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
      
      VLANID: {
        type: 'STRING'
      },
      
      attachedTo: {
              type:'STRING',
              required: true
      },
          
      portNum:{
            type:'INT',
            required:true
          }
      },
      
      lastSeen: {
          type: 'DATETIME'
      }
};

