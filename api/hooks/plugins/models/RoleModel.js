//Plugin for controller role
//the 's' in exports is crucial
module.exports = {
	identity: 'role',

	connection: 'util',

	attributes: {
        Role: {
            type: 'string',
            required: true,
        },
		Description: {
			type: 'string',
			required: true
		},
        Date: {
			type: 'string',
			required: true
		},
    }
};