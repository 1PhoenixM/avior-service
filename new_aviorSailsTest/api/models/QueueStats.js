//QueueStats

module.export = {
	identity: 'queuestats',

	connection: 'opendaylight',

	attributes: {
        DPID: {
            type: 'string',
            required: true,
            primaryKey: true
        },
		QueueID: {
			type: 'string',
			required: true
		},
        TXBytes: {
			type: 'string',
			required: true
		},
        TXPackets: {
			type: 'string',
			required: true
		},
        TXErrors: {
			type: 'string',
			required: true
		},
    }
}