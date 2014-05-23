load ofp.js 
version = "1.3.1"

Port.
    uint32_t curr_speed; /* Current port bitrate in kbps. */
    uint32_t max_speed; /* Max port bitrate in kbps */
    
OFPP.
    //-NONE  0xffffffff 
    OFPP_ANY = 0xffffffff /* Wildcard port used only for flow mod
(delete) and flow stats requests. Selects
all flows regardless of output port
(including flows with no output port). */

OFPPF.
    OFPPF_40GB_FD = 1 << 7, /* 40 Gb full-duplex rate support.           */
    OFPPF_100GB_FD = 1 << 8, /* 100 Gb full-duplex rate             support. */
    OFPPF_1TB_FD = 1 << 9, /* 1 Tb full-duplex rate support.                */
    OFPPF_OTHER = 1 << 10, /* Other rate, not in the list. */
    
OFPPC.
    //the new spec provides only 0, 2, 5, and 6.

OFPPS.
    //all stp functions are missing. only LINK_DOWN remains
    OFPPS_BLOCKED = 1 << 1, /* Port is blocked */
    OFPPS_LIVE = 1 << 2, /* Live for Fast Failover Group. */
    
PacketQueue:
    uint32_t port; /* Port this queue is attached to. */
    uint16_t len; /* Length in bytes of this queue desc. */

OFPQT.
    //NONE is missing
    OFPQT_MAX_RATE = 2, /* Maximum datarate. */
    OFPQT_EXPERIMENTER = 0xffff /* Experimenter defined         property. */

QueuePropMaxRate: function() {
        uint16_t rate; /* In 1/10 of a percent; >1000 -> disabled. */
    },

QueuePropExperimenter: function() {
        this.rate = 0; // in 1/10 of percent; >1000 -> disabled
    },
        
FlowWildCards == MatchFields        