//Floodlight-only controller summary

module.export = {
	identity: 'controller',

	connection: 'floodlight',

	attributes: {
        Uptime: {
			type: 'string',
			required: true
		},
        Memory: {
			type: 'string',
			required: true
		},
        Health: {
			type: 'string',
			required: true
		},
        Modules: {
			type: 'string',
			required: true
		},
    }
}