/**
 * FlowStats
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.export = {
  identity: "flowstats",
    
  connection: "floodlight",
    
  attributes: {
  	DPID: {
        type: 'string',
        required: true,
        primaryKey: true,
    },
    Flows:{ 
        type: 'array',
        required: true,
    },
    /*Name: {
        type:"String",
        required: true
    },
    Priorty: {
        type:"Integer",
        required: true
    },
    InputPort: {
        type:"Integer",
        required: true
    },
    OutputPort: {
        type:"Integer",
        required: true
    },
    QueueID: {
        type:"Integer",
        required: true
    },
    VLANID: {
        type:"Integer",
        required: true
    },
    VLANPriority: {
        type:"Integer",
        required: true
    },
    DataLayerAddress: {
        type:"String",
        required: true
    },
    NetworkTypeOfService: {
        type:"String",
        required: true
    },
    NetworkAddress: {
        type:"String",
        required: true
    },
    TransportPort: {
        type:"Integer",
        required: true
    },
	PacketCount: {
        type:"Integer",
        required: true
    },
	ByteCount: {
        type:"Integer",
        required: true
    },
	DurationSeconds: {
        type:"Integer",
        required: true
    },
	IdleTimeout: {
        type:"Integer",
        required: true
    },*/
  }
}
