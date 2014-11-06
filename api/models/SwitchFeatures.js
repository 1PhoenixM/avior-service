//Switch features

module.exports = {
	identity: 'switchfeatures',

	connection: ['util'],

	attributes: {
         DPID: {
            type: 'string',
            required: true,
            primaryKey: true
        },
		Datapath: {
            type:'integer',
            required:'true'
        },
        Buffers: {
            type:'integer',
            required:'true'
        },
        Tables: {
            type:'integer',
            required:'true'
        },
        Capabilities: {
            type:'integer',
            required:'true'
        },
        Actions: {
            model:'action',
            required:'true'
        },
        Ports: {
            model:'port',
            required:'true'
        },
	}
}