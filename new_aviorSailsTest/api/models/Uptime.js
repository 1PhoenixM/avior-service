//A test struct for uptime

module.export = {
	identity: 'uptime',

	connection: 'floodlight',

	attributes: {
		UptimeMsec: {
            type: 'integer',
            required: true,
        }
        
	}
}