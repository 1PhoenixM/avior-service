//Plugin for some test capability

module.exports = {
	identity: 'test',

	connection: 'util',

	attributes: {
        Info: {
            type: 'string',
            required: true,
        },
	Test: {
	    type: 'string',
	    required: true
	},
        Name: {
	    type: 'string',
	    required: true
	},
    }
};
