module.export = {
	identity: 'port',

	connection: 'opendaylight',

	attributes: {
		DPID: {
			type: 'string',
			required: true
		},
        ID: {
			type: 'string',
			required: true
		},
        RXPackets: {
			type: 'string',
			required: true
		},
        TXPackets: {
			type: 'string',
			required: true
		},
        RXBytes: {
			type: 'string',
			required: true
		},
        TXBytes: {
			type: 'string',
			required: true
		},
        RXDrops: {
			type: 'string',
			required: true
		},
        TXDrops: {
			type: 'string',
			required: true
		},
        RXErrors: {
			type: 'string',
			required: true
		},
        TXErrors: {
			type: 'string',
			required: true
		},
        RXFrameErr: {
			type: 'string',
			required: true
		},
        RXOverrunErr: {
			type: 'string',
			required: true
		},
        RXCrcErr: {
			type: 'string',
			required: true
		},
        Collisions: {
			type: 'string',
			required: true
		}       
    }
}