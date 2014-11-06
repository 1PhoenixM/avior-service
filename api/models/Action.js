//A flow action.

module.exports = {
	identity: 'action',

	connection: ['util'],

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