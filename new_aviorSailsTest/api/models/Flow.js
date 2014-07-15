//A flow structure

module.export = {
	identity: 'flow',

	connection: 'opendaylight',

	attributes: {
		
        Action: {
			model: 'array',
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
        Cookie: {
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