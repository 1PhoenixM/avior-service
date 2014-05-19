//https://www.opennetworking.org/images/stories/downloads/sdn-resources/onf-specifications/openflow/openflow-spec-v1.3.1.pdf
/*
 * ofp.js - Base OpenFlow structures and values
 *
 */
define(function(){

return {
    VERSION: "1.3.1",

    /* === Appendix A 2.1 Port Structures === */

    /* Description of a physical port */
    Port: function() {
        this.name = " ";
        this.hw_addr = "";
        this.port_no = 0x0000;
        this.config = 0x0000;
        this.state = 0x0000;
        this.curr = 0x00000000;
        this.advertised = 0x00000000;
        this.supported = 0x00000000;
        this.peer = 0x00000000;
        Object.seal(this);
    },

    /* Port numbering. Physical ports are numbered starting from 1. */
    OFPP: {
        /* Maximum number of physical switch ports. */
        MAX:        0xffffff00,
        /* Reserved OpenFlow Port (fake output "ports"). */
        IN_PORT:    0xfffffff8, /* Send the packet out the input port. This
                                virtual port must be explicitly used in
                                order to send back out of the input port */
        TABLE:      0xfffffff9, /* Perform actions in flow table.
                                NB: This can only be the destination
                                port for packet-out messages */
        NORMAL:     0xfffffffa, // Process with normal L2/L3 switching
        FLOOD:      0xfffffffb, // All physical ports except input and those disabled by STP
        ALL:        0xfffffffc, // All physical ports except input port
        CONTROLLER: 0xfffffffd, // Send to controller
        LOCAL:      0xfffffffe, // Local openflow "port"
        NONE:       0xffffffff  // Not associated with a physical port
    },

    /* Features of physical ports available in datapath. */
    OFPPF: {
        RATE_10MB_HD:  1 <<  0, // 10 Mb half-duplex rate support
        RATE_10MB_FD:  1 <<  1, // 10 Mb full-duplex rate support
        RATE_100MB_HD: 1 <<  2, // 100 Mb half-duplex rate support
        RATE_100MB_FD: 1 <<  3, // 100 Mb full-duplex rate support
        RATE_1GB_HD:   1 <<  4, // 1 Gb half-duplex rate support
        RATE_1GB_FD:   1 <<  5, // 1 Gb full-duplex rate support.
        RATE_10GB_FD:  1 <<  6, // 10 Gb full-duplex rate support
        COPPER:        1 <<  7, // Copper medium
        FIBER:         1 <<  8, // Fiber medium
        AUTONEG:       1 <<  9, // Auto-negotiation
        PAUSE:         1 << 10, // Pause
        PAUSE_ASYM:    1 << 11  // Asymmetric pause
    },

    /* Flags to indicate behavior of the physical port. These flags are
     * used in ofp_phy_port to describe the current configuration. They are
     * used in the ofp_port_mod message to configure the port’s behavior.
     */
    OFPPC: {
        PORT_DOWN:    1 << 0, // Port is administratively down
        NO_STP:       1 << 1, // Disable 802.1D spanning tree on port
        NO_RECV:      1 << 2, // Drop all packets except 802.1D spanning tree packets
        NO_RECV_STP:  1 << 3, // Drop received 802.1D STP packets
        NO_FLOOD:     1 << 4, // Do not include this port when flooding
        NO_FWD:       1 << 5, // Drop packets forwarded to port
        NO_PACKET_IN: 1 << 6  // Do not send packet-in msgs for port
    },

    /* Current state of the physical port. These are not configurable from
     * the controller.
     */
    OFPPS: {
        LINK_DOWN:   1 << 0, // No physical link present
        STP_LISTEN:  0 << 8, // Not learning or relaying frames
        STP_LEARN:   1 << 8, // Learning but not relaying frames
        STP_FORWARD: 2 << 8, // Learning and relaying frames
        STP_BLOCK:   3 << 8, // Not part of spanning tree
        STP_MASK:    3 << 8  // Bit mask for OFPPS_STP_* values
    },

    /* === Appendix A 2.2 Queue Structures === */
    // TODO this part is broken (do we even need it)

    PacketQueue: function() {
        this.queue_id = 0x00000000;
        this.properties = []; // should be an array of OFPQT values
    },

    OFPQT: {
        NONE:     0, // no property defined for queue (default)
        MIN_RATE: 1, // minimum datarate guaranteed
    },

    QueuePropMinRate: function() {
        this.rate = 0; // in 1/10 of percent; >1000 -> disabled
    },

    /* === Appendix A 2.3 Flow Match Structures === */

    /* Fields to match against flows. */
    Match: function() {
        this.wildcards = 0x00000000; // Wildcard fields
        this.in_port = 0x0000; // Input switch port
        this.dl_src = ""; // Ethernet source address
        this.dl_dst = ""; // Ethernet destination address
        this.dl_vlan = 0x0000; // Input VLAN id
        this.dl_vlan_pcp = 0x00; // Input VLAN priority
        this. dl_type = 0x0000; // Ethernet frame type
        this.nw_tos = 0x00; // IP ToS
        this.nw_proto = 0x00; // IP protocol
        this.nw_src = 0x00000000; // IP source port
        this.nw_dst = 0x00000000; // IP destination port
        this.tp_src = 0x0000; // TCP/UDP source port
        this.tp_dst = 0x0000; // TCP/UDP destination port
    },

    /* Flow wildcards. */
    FlowWildcards: {
        IN_PORT:  1 << 0, // Switch input port
        DL_VLAN:  1 << 1, // VLAN id
        DL_SRC:   1 << 2, // Ethernet source address
        DL_DST:   1 << 3, // Ethernet destination address
        DL_TYPE:  1 << 4, // Ethernet frame type
        NW_PROTO: 1 << 5, // IP protocol
        TP_SRC:   1 << 6, // TCP/UDP source port
        TP_DST:   1 << 7, // TCP/UDP destination port

        NW_SRC_SHIFT: 8,
        NW_SRC_BITS:  6,
        NW_SRC_MASK:  ((1 << 6) - 1) << 8,
        NW_SRC_ALL:   32 << 8,

        NW_DST_SHIFT: 14,
        NW_DST_BITS:  6,
        NW_DST_MASK:  ((1 << 6) - 1) << 14,
        NW_DST_ALL:   32 << 14,

        DL_VLAN_PCP: 1 << 20,
        NW_TOS:  1 << 21,
        ALL:   ((1 << 22) - 1),
    },

    /* === Appendix A 2.4 Flow Action Structures === */

    Action: function(atype) {
        this.type = 0x0000; // Must be ActionType.OUTPUT
        this.port = 0x0000; // Output port
    },

    ActionType: {
        OUTPUT:       0, // Output to switch port
        SET_VLAN_VID: 1, // Set the 802.1q VLAN id
        SET_VLAN_PCP: 2, // Set the 802.1q priority
        STRIP_VLAN:   3, // Strip the 802.1q header
        SET_DL_SRC:   4, // Ethernet source address
        SET_DL_DST:   5, // Ethernet destination address
        SET_NW_SRC:   6, // IP source address
        SET_NW_DST:   7, // IP destination address
        SET_NW_TOS:   8, // IP ToS
        SET_TP_SRC:   9, // TCP/UDP source address
        SET_TP_DST:  10, // TCP/UDP destination address
        ENQUEUE:     11, // Output to Queue
        VENDOR:  0xffff
    },

    /* === Appendix A 3.1 Handshake === */

    /* Structure to hold switch information */
    SwitchFeatures: function() {
        this.datapath_id = 0x00000000;
        this.n_buffers = 0x0000;
        this.n_tables = 0x0000;
        this.capabilities = 0x0000;
        this.actions = 0x0000;
        this.ports = []; // should be an array of Port structures
    },

    /* Capabilities supported by the datapath. */
    OFPC: {
        FLOW_STATS:   1 << 0, // Flow statistics
        TABLE_STATS:  1 << 1, // Table statistics
        PORT_STATS:   1 << 2, // Port statistics
        STP:          1 << 3, // 802.1d spanning tree
        RESERVED:     1 << 4, // Reserved, must be zero
        IP_REASM:     1 << 5, // Can reassemble IP fragments
        QUEUE_STATS:  1 << 6, // Queue statistics
        ARP_MATCH_IP: 1 << 7, // Match IP addresses in ARP pkts
    },

    /* === Appendix A 3.2 Switch Configuration === */

    /* === Appendix A 3.3 Modify State Messages === */

    /* Structure to hold flow modification message */
    FlowMod: function() {
        this.match = null; // should contain a Match structure
        this.command = 0;
        this.idle_timeout = 0;
        this.hard_timeout = 0;
        this.priority = 0;
        this.buffer_id = -1;
        this.out_port = 0;
        this.flags = 0;
        this.actions = []; // should be an array of Action structures
    },

    OFPFC: {
        ADD:           0, // New flow
        MODIFY:        1, // Modify all matching flows
        MODIFY_STRICT: 2, // Modify entry strictly matching wildcards and priority
        DELETE:        3, // Delete all matching flows
        DELETE_STRICT: 4, // Delete entry strictly matching wildcards and priority
    },
    OFPFF: {
        SEND_FLOW_REM: 1 << 0, // Send flow removed message when flow expires or is deleted
        CHECK_OVERLAP: 1 << 1, // Check for overlapping entries first
        EMERG:         1 << 2, // Remark this is for emergency
    },

    /* Structure to hold port modification message */
    PortMod: function() {
        this.port_no = 0;
        this.hw_addr = "";
        this.config = 0;
        this.mask = 0;
        this.advertise = 0;
    },

    /* === Appendix A 3.4 Queue Configuration Messages === */


    /* === Appendix A 3.5 Read State Messages === */

    /* */
    StatsRequest: function() {
        this.type = 0;
        this.flags = 0;
        this.body = "";
    },

    /* */
    StatsReply: this.StatsRequest,

    OFPST: {
        DESC:      0, // empty body, DescStats reply
        FLOW:      1, // FlowStatsRequest body, FlowStats reply
        AGGREGATE: 2, // AggregateStatsRequest body, AggregateStatsReply reply
        TABLE:     3, // empty body, TableStats reply
        PORT:      4, // PortStatsRequest body, PortStats reply
        QUEUE:     5, // ..? body, PortStats reply
        VENDOR:    6, // vendor-defined
    },

    /* Structure to hold hardware description information */
    DescStats: function() {
        this.mfr_desc = ""; // Switch manufacturer
        this.hw_desc = "";  // Hardware revision
        this.sw_desc = "";  // Software revision
        this.serial_num = ""; // Serial number
        this.dp_desc = "";  // Human-readable description of datapath
    },

    FlowStats: function() {
        this.table_id = 0;
        this.match = null; // should be Match structure
        this.duration_sec = 0;
        this.duration_nsec = 0;
        this.priority = 0;
        this.idle_timeout = 0;
        this.hard_timeout = 0;
        this.cookie = 0;
        this.packet_count = 0;
        this.byte_count = 0;
        this.actions = []; // should be an array of Action structures
    },

    AggregateStats: function() {
        this.packet_count = 0;
        this.byte_count = 0;
        this.flow_count = 0;
    },

    TableStats: function() {
        this.table_id = 0;
        this.name = "";
        this.wildcards = 0;
        this.max_entries = 0;
        this.active_count = 0;
        this.lookup_count = 0;
        this.matched_count = 0;
    },

    PortStats: function() {
        this.port_no = 0;
        this.rx_packets = 0;
        this.tx_packets = 0;
        this.rx_bytes = 0;
        this.tx_bytes = 0;
        this.rx_dropped = 0;
        this.tx_dropped = 0;
        this.rx_errors = 0;
        this.tx_errors = 0;
        this.rx_frame_err = 0;
        this.tx_frame_err = 0;
        this.rx_over_err = 0;
        this.tx_crc_err = 0;
        this.rx_bytes = 0;
        this.collisions = 0;
    },

    QueueStats: function() {
        this.port_no = 0;
        this.queue_id = 0;
        this.tx_bytes = 0;
        this.tx_packets = 0;
        this.tx_errors = 0;
    },

    // The following sections are intentionally left empty
    // Openflow defines various asynchronous messages from
    // switch to controller that are not relevant to Avior
    /* === Appendix A 3.6 Send Packet Message === */
    /* === Appendix A 3.7 Barrier Message === */
    /* === Appendix A 4.1 Packet-In Message === */
    /* === Appendix A 4.2 Flow Removed Message === */
    /* === Appendix A 4.3 Port Status Message === */
    /* === Appendix A 4.4 Error Message === */

}

});
