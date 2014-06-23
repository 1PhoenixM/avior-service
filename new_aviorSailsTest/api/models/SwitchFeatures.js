module.export = {
	identity: 'switchfeatures',

	connection: 'floodlight',

	attributes: {
		PortNum: {
            type:'integer',
            required:'true'
        },
        RXPackets: {
            type:'integer',
            required:'true'
        },
        TXPackets: {
            type:'integer',
            required:'true'
        },
        RXBytes: {
            type:'integer',
            required:'true'
        },
        TXBytes:{
            type:'integer',
            required:'true'
        },
        DroppedPackets:{
            type:'integer',
            required:'true'
        },
	}
}

