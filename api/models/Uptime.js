//A test struct for uptime

module.exports = {
	identity: 'uptime',

	connection: ['util'],

	attributes: {
		Uptime_msec: {
            type: 'integer',
            required: true,
        }
        
	}
}