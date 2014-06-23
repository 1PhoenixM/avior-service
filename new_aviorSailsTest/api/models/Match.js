module.export = {
	identity: 'match',

	connection: 'opendaylight',

	attributes: {
        MatchMask: {
			type: 'integer',
			required: false
		},
        MatchType: {
			type: 'integer',
			required: true
		},
        MatchValue: {
			type: 'integer',
			required: true
		},
    }
}