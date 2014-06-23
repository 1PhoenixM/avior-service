module.export = {
	identity: 'switchports',

	connection: 'floodlight',

	attributes: {
		PortState:{
            type:'integer',
            required:'true',
        },
        PortName:{
            type:'integer',
            required:'true',
        },
    }
}

