//A host (not OpenFlow-defined)

module.exports = {
	identity: 'host',

	connection: ['util'],
  
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