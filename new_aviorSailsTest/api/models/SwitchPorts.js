//A port on a switch

module.export = {
	identity: 'switchports',

	connection: 'floodlight',

	attributes: {
	
        RXPackets:{
            type:'integer',
            required:true
        },
        TXPackets:{
            type:'integer',
            required:true
        },
        RXBytes:{
            type:'integer',
            required:true
        },
        TXBytes:{
            type:'integer',
            required:true
        },
        RXDrops:{
            type:'integer',
            required:true
        },
        TXDrops:{
            type:'integer',
            required:true
        },
        RXErrors:{
            type:'integer',
            required:true
        },
        TXErrors:{
            type:'integer',
            required:true
        },
        RXFrameErr:{
            type:'integer',
            required:true
        },
        RXOverrunErr:{
            type:'integer',
            required:true
        },
        RXCrcErr:{
            type:'integer',
            required:true
        }
    }
}

