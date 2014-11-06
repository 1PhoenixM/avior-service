//A topology (not OpenFlow-defined)


module.exports = {
 connection: ['util'],
  attributes: {
      SourcePortNum:{
        type: 'integer',
        required: true
      },
      DestinationPortNum:{
        type: 'integer',
        required: true
      },
       SourceDPID:{
        type: 'string',
        required: true
      },
      DestinationDPID:{
        type: 'string',
        required: true
      }
  }
};