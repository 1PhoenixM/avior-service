module.export = {
	identity: 'host',

	connection: 'opendaylight',

	attributes: {
		MAC_Address: {
			type: 'array',
			required: true
		},
		IP_Address: {
			type: 'array',
			required: false
		},
		VLAN_ID: {
			type: 'array',
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