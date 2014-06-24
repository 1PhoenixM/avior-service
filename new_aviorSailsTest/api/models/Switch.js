/**
 * Switches
 *
 * @module      :: Model
 * @description :: A collection of data for the Switches on the network.
 * @docs		:: In Imagination Land
 */

module.exports = {

  attributes: {
      Manufacturer:{
        type:'STRING',
        required:true
      },
      
      Hardware: {
        type:'STRING',
        required:true
      },
      
      Software: {
        type:'STRING',
        required:true
      },
      
      SerialNum: {
        type:'STRING',
        required:true
      },
      
      ConnectedSince: {
        type:'DATETIME',
        required:true
      },
      
      Ports: {
        LinkStatus: {
            type:'STRING',
            required:true
        },
          
        Name: {
            type:'STRING',
            required:true
        },
          
        Number: {
            type:'INT',
            required:true
        },
          
        RXPackets: {
            type:'INT',
            required:true
        },
          
        TXPackets: {
            type:'INT',
            required:true
        },
          
        RXBytes: {
            type:'INT',
            required:true
        },
          
        TXBytes: {
            type:'INT',
            required:true
        },
          
        DroppedBytes: {
            type:'INT',
            required:true
        },
          
        Errors: {
            type:'INT',
            required:true
        },
      },
      
      Flows: {
        FlowName: {
            type:'STRING',
            required:true
        },
          
        FlowPriority: {
            type:'INT',
            required:true
        },
          
        InputPort: {
            type:'INT',
            required:true
        },
          
        Actions: {
            type:'STRING',
            required:true
        },
          
        Packets: {
            type:'INT',
            required:true
        },
          
        Bytes: {
            type:'INT',
            required:true
        },
          
        Age: {
            type:'STRING',
            required:true
        },
          
        Timeout: {
            type:'INT',
            required:true
        }
      }
  }

};