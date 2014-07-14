//A port on a switch

module.export = {
	identity: 'switchports',

	connection: 'floodlight',

	attributes: {
	   DPID:{
            type:'string',
            required:true,
            primaryKey: true
        },
        Ports:{
            type:'array',
            required:true
        },
    }
}

