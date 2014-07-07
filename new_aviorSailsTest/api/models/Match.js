//A flow match.

module.export = {
	identity: 'match',

	connection: 'floodlight',
    
    types: {
        openflow_match_1_0_0: function(MatchType){
            return MatchType === 'DataLayerDestination' || MatchType === 'DataLayerSource' || MatchType === 'DataLayerType' || MatchType === 'DataLayerVLAN' || MatchType === 'DataLayerVLAN_PCP' || MatchType === 'InputPortNum' 
            || MatchType === 'NetworkDestination' || MatchType === 'NetworkDestionationMaskLen' || MatchType === 'NetworkProtocol' || MatchType === 'NetworkSource' || MatchType === 'NetworkSourceMaskLen' || MatchType === 'NetworkTOS'  || MatchType === 'TransportDestination' || MatchType === 'TransportSource' || MatchType === 'Wildcards'
        },
    },
    //TODO: normalize match fields between controllers, too.
    //nwSrc(ODL) = src-ip(FL) = NetworkSource(Avior)
    //This logic works as a validation of valid match fields. This might make it easier
    //when we update to 1.3.1, we just have to update this mapping.

	attributes: {
        MatchMask: {
			type: 'integer',
			required: false
		},
        MatchType: {
			type: 'string',
            openflow_match_1_0_0: true,
			required: true
		},
        MatchValue: {
			type: 'integer',
			required: true
		},
    }
}