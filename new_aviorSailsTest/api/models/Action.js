module.export = {
	identity: 'action',

	connection: 'opendaylight',

	attributes: {
        ActionType: {
			type: 'string',
			required: true
		},
        OutputPort: {
			type: 'integer',
			required: true
		},
    }
}