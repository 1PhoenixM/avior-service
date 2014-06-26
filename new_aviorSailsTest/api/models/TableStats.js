//TableStats

module.export = {
	identity: 'table',

	connection: 'opendaylight',

	attributes: {
		DPID: {
			type: 'string',
			required: true
		},
        Name: {
			type: 'string',
			required: true
		},
        Wildcards: {
			type: 'string',
			required: true
		},
        TableID: {
			type: 'string',
			required: true
		},
        ActiveCount: {
			type: 'string',
			required: true
		},
        LookupCount: {
			type: 'string',
			required: true
		},
        MatchedCount: {
			type: 'string',
			required: true
		},
        MaxEntries: {
			type: 'string',
			required: true
		}
    }
}