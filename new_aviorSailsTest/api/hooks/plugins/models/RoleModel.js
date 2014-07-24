//Plugin for controller role

module.export = {
	identity: 'rolemodel',

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