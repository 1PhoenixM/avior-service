module.export = {
	identity: 'flow',

	connection: 'floodlight',

	attributes: {
		DPID: {
			type: 'string',
			required: true
		},
        Match: {
            model: 'match',
            required: true
        },
        ActionType: {
			type: 'integer',
			required: true
		},
        ActionPortDPID: {
			type: 'integer',
			required: true
		},
        ActionPortID: {
			type: 'integer',
			required: true
		},
        HardTimeout: {
			type: 'integer',
			required: true
		},
        Priority: {
			type: 'integer',
			required: true
		},
        IdleTimeout: {
			type: 'integer',
			required: true
		},
        HardTimeout: {
			type: 'integer',
			required: true
		},
        ID: {
			type: 'integer',
			required: true
		},
        TableID: {
			type: 'integer',
			required: true
		},
        DurationSeconds: {
			type: 'integer',
			required: true
		},
        DurationNanoseconds: {
			type: 'integer',
			required: true
		},
        PacketCount: {
			type: 'integer',
			required: true
		},
        ByteCount: {
			type: 'integer',
			required: true
		}
	}
}