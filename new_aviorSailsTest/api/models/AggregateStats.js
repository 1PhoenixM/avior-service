//Aggregate stats

module.export = {
	identity: 'aggregatestats',

	connection: 'floodlight',

	attributes: {
		PacketCount: {
			type: 'integer',
			required: true
		},
        ByteCount: {
			type: 'integer',
			required: true
		},
        FlowCount: {
			type: 'integer',
			required: true
		},
    }
}