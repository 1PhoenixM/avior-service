module.export = {
	identity: 'match',

	connection: 'opendaylight',
    
    //types: {
        //
        //openflow_match_1_0_0: function(MatchType){
        //return MatchType === ''
        //}
    //},
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
            //openflow_match_1_0_0: true,
			required: true
		},
        MatchValue: {
			type: 'integer',
			required: true
		},
    }
}