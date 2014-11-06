//A queue structure.

module.exports = {
	identity: 'queue',

	connection: ['opendaylight'],

	attributes: {
		QueueID: {
			type: 'string',
			required: true
		},
    }
}