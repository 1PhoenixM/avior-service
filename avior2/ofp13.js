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
    //-NO_STP
    //-NO_RECV_STP
    //-NO_FLOOD

OFPPS.
    //-STP_LISTEN
    //-STP_LEARN
    //-STP_FORWARD
    //-STP_BLOCK
    //-STP_MASK
    OFPPS_BLOCKED = 1 << 1, /* Port is blocked */
    OFPPS_LIVE = 1 << 2, /* Live for Fast Failover Group. */
    
PacketQueue:
    uint32_t port; /* Port this queue is attached to. */
    uint16_t len; /* Length in bytes of this queue desc. */

OFPQT.
    //-NONE
    OFPQT_MAX_RATE = 2, /* Maximum datarate. */
    OFPQT_EXPERIMENTER = 0xffff /* Experimenter defined         property. */


QueuePropMaxRate: function() {
        uint16_t rate; /* In 1/10 of a percent; >1000 -> disabled. */
    },

QueuePropExperimenter: function() {
        uint32_t experimenter; /* Experimenter ID which takes the same
form as in struct
ofp_experimenter_header. */
uint8_t data[0]; /* Experimenter defined data. */
    },
        
///////////////////////////////////////////////////////////////////////////////
        

Match.
    //-all
uint16_t type; /* One of OFPMT_* */
uint16_t length; /* Length of ofp_match (excluding padding) */
/* Followed by:
* - Exactly (length - 4) (possibly 0) bytes containing OXM TLVs, then
* - Exactly ((length + 7)/8*8 - length) (between 0 and 7) bytes of
* all-zero bytes
* In summary, ofp_match is padded as needed, to make its overall size
* a multiple of 8, to preserve alignement in structures using it.
*/
uint8_t oxm_fields[4]; /* OXMs start here - Make compiler happy*/
    
Match_type.
    OFPMT_STANDARD = 0, /* Deprecated. */
    OFPMT_OXM = 1, /* OpenFlow Extensible Match */
    
OXM_Class_IDs.
    /* OXM Class IDs.
* The high order bit differentiate reserved classes from member classes.
* Classes 0x0000 to 0x7FFF are member classes, allocated by ONF.
* Classes 0x8000 to 0xFFFE are reserved classes, reserved for standardisation.
*/
enum ofp_oxm_class {
OFPXMC_NXM_0 = 0x0000, /* Backward compatibility with NXM */
46
©
2012; The Open Networking Foundation
OpenFlow Switch Specication Version 1.3.1
OFPXMC_NXM_1 = 0x0001, /* Backward compatibility with NXM */
OFPXMC_OPENFLOW_BASIC = 0x8000, /* Basic class for OpenFlow */
OFPXMC_EXPERIMENTER = 0xFFFF, /* Experimenter class */
};

FlowWildCards == OXM_MatchFields.
//(!) are required
!OFPXMT_OFB_IN_PORT = 0, /* Switch input port. */
OFPXMT_OFB_IN_PHY_PORT = 1, /* Switch physical input port. */
OFPXMT_OFB_METADATA = 2, /* Metadata passed between tables. */
!OFPXMT_OFB_ETH_DST = 3, /* Ethernet destination address. */
!OFPXMT_OFB_ETH_SRC = 4, /* Ethernet source address. */
!OFPXMT_OFB_ETH_TYPE = 5, /* Ethernet frame type. */
OFPXMT_OFB_VLAN_VID = 6, /* VLAN id. */
OFPXMT_OFB_VLAN_PCP = 7, /* VLAN priority. */
OFPXMT_OFB_IP_DSCP = 8, /* IP DSCP (6 bits in ToS field). */
OFPXMT_OFB_IP_ECN = 9, /* IP ECN (2 bits in ToS field). */
!OFPXMT_OFB_IP_PROTO = 10, /* IP protocol. */
!OFPXMT_OFB_IPV4_SRC = 11, /* IPv4 source address. */
!OFPXMT_OFB_IPV4_DST = 12, /* IPv4 destination address. */
!OFPXMT_OFB_TCP_SRC = 13, /* TCP source port. */
!OFPXMT_OFB_TCP_DST = 14, /* TCP destination port. */
!OFPXMT_OFB_UDP_SRC = 15, /* UDP source port. */
!OFPXMT_OFB_UDP_DST = 16, /* UDP destination port. */
OFPXMT_OFB_SCTP_SRC = 17, /* SCTP source port. */
OFPXMT_OFB_SCTP_DST = 18, /* SCTP destination port. */
OFPXMT_OFB_ICMPV4_TYPE = 19, /* ICMP type. */
OFPXMT_OFB_ICMPV4_CODE = 20, /* ICMP code. */
OFPXMT_OFB_ARP_OP = 21, /* ARP opcode. */
OFPXMT_OFB_ARP_SPA = 22, /* ARP source IPv4 address. */
OFPXMT_OFB_ARP_TPA = 23, /* ARP target IPv4 address. */
OFPXMT_OFB_ARP_SHA = 24, /* ARP source hardware address. */
OFPXMT_OFB_ARP_THA = 25, /* ARP target hardware address. */
!OFPXMT_OFB_IPV6_SRC = 26, /* IPv6 source address. */
!OFPXMT_OFB_IPV6_DST = 27, /* IPv6 destination address. */
OFPXMT_OFB_IPV6_FLABEL = 28, /* IPv6 Flow Label */
OFPXMT_OFB_ICMPV6_TYPE = 29, /* ICMPv6 type. */
OFPXMT_OFB_ICMPV6_CODE = 30, /* ICMPv6 code. */
OFPXMT_OFB_IPV6_ND_TARGET = 31, /* Target address for ND. */
OFPXMT_OFB_IPV6_ND_SLL = 32, /* Source link-layer for ND. */
OFPXMT_OFB_IPV6_ND_TLL = 33, /* Target link-layer for ND. */
OFPXMT_OFB_MPLS_LABEL = 34, /* MPLS label. */
OFPXMT_OFB_MPLS_TC = 35, /* MPLS TC. */
OFPXMT_OFP_MPLS_BOS = 36, /* MPLS BoS bit. */
OFPXMT_OFB_PBB_ISID = 37, /* PBB I-SID. */
OFPXMT_OFB_TUNNEL_ID = 38, /* Logical Port Metadata. */
OFPXMT_OFB_IPV6_EXTHDR = 39, /* IPv6 Extension Header pseudo-field */
    
