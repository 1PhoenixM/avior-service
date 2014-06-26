//A test struct for uptime

module.export = {
	identity: 'uptime',

	connection: 'floodlight',

	attributes: {
		Uptime_msec: {
            type: 'integer',
            required: true,
        }
        
	}
}