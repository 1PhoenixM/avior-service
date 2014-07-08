//A host (not OpenFlow-defined)

module.export = {
	identity: 'host',

	connection: 'floodlight',
  
	attributes: {
		MAC_Address: {
			type: 'string',
			required: true
		},
		IP_Address: {
			type: 'string',
			required: false
		},
		VLAN_ID: {
			type: 'integer',
			required: false
		},
		Attached_To: {
			type: 'array',
			required: true
		},
		Last_Seen: {
			type: 'integer',
			required: false
		}
	}
}