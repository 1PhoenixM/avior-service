//**VARLIST
//This is a list of data elements given back from REST calls.
//Not all possible states of the network / returns are known. Is there somewhere to find this?
///////////////////////////////////FLOODLIGHT
'/wm/core/switch/all/port/json',
    SwitchFeatures.datapath_id:
    {PortStats.port_no = portNumber, 
        this.rx_packets = receivePackets;
        this.tx_packets = transmitPackets;
        this.rx_bytes = receiveBytes;
        this.tx_bytes = transmitBytes;
        this.rx_dropped = receiveDropped;
        this.tx_dropped = transmitDropped;
        this.rx_errors = receiveErrors;
        this.tx_errors = transmitErrors;
        this.rx_frame_err = receiveFrameErrors;
        this.rx_over_err = receiveOverrunErrors;
        this.rx_crc_err = receiveCRCErrors;
        this.collisions = collisions;}
'/wm/core/switch/all/queue/json',
        //find way to add these via mininet to see result
        QueueStats
'/wm/core/switch/all/flow/json',
       SwitchFeatures.datapath_id:
       {FlowStats.table_id = tableId,
        this.match = {
        Match.dl_dst = dataLayerDestination; // Ethernet destination address
           this.dl_src = dataLayerSource // Ethernet source address
            this. dl_type = dataLayerType // Ethernet frame type
           this.dl_vlan = dataLayerVirtualLan // Input VLAN id
           this.dl_vlan_pcp = dataLayerVirtualLanPriorityCodePoint // Input VLAN priority
            this.in_port = inputPort // Input switch port
         this.nw_dst = networkDestination // IP destination port
     networkDestinationMaskLen
             this.nw_proto = networkProtocol // IP protocol
           this.nw_src = networkSource // IP source port
     networkSourceMaskLen
        this.nw_tos = networkTypeOfService // IP ToS
       this.tp_dst = transportDestination // TCP/UDP destination port
           this.tp_src = transportSource // TCP/UDP source port
           this.wildcards = wildcards// Wildcard fields     
       }
        this.duration_sec = durationSeconds
        this.duration_nsec = durationNanoseconds
        this.priority = priority
        this.idle_timeout = idleTimeout
        this.hard_timeout = hardTimeout
        this.cookie = cookie
        this.packet_count = packetCount
        this.byte_count = byteCount
        
        this.actions = {
        Action.type = type
            length (missing from ofp)
        this.port = port 
            maxLength (missing)
            lengthU (missing)
        }   // should be an array of Action structures

       }
'/wm/core/switch/all/aggregate/json',
    SwitchFeatures.datapath_id:
    {
      AggregateStats.packet_count = packetCount;
        this.byte_count = byteCount;
        this.flow_count = flowCount;  
    }
'/wm/core/switch/all/desc/json',
     SwitchFeatures.datapath_id:
     {
        DescStats.mfr_desc = manufacturerDescription // Switch manufacturer
        this.hw_desc = hardwareDescription;  // Hardware revision
        this.sw_desc = softwareDescription;  // Software revision
        this.serial_num = serialNumber; // Serial number
        this.dp_desc = datapathDescription;  // Human-readable description of datapath
     }
'/wm/core/switch/all/table/json',
    SwitchFeatures.datapath_id:
    {
        TableStats.table_id = tableId
        this.name = name
        this.wildcards = wildcards
        this.max_entries = maximumEntries
        this.active_count = activeCount
        this.lookup_count = lookupCount
        this.matched_count = matchedCount
        length (missing from ofp)
    }
'/wm/core/switch/all/features/json',
     SwitchFeatures.datapath_id:
     {
        SwitchFeatures.actions = actions
         this.n_buffers = buffers
         this.capabilities = capabilities
      this.datapath_id = datapathId
       length (missing)
        this.ports = Port:{
         this.port_no = portNumber
        this.hw_addr = hardwareAddress
         this.name = name
        this.config = config
        this.state = state
        this.curr = currentFeatures
        this.advertised = advertisedFeatures
        this.supported = supportedFeatures
        this.peer = peerFeatures   
        }// should be an array of Port structures 
        this.n_tables = tables 
        type
        version
        xid
     }
'/wm/core/switch/<switchId>/<statType>/json',
        //per switch of above
'/wm/core/controller/switches/json',
    [{"harole":"MASTER",
      "actions":4095,
      "attributes":
      {"supportsOfppFlood":true,
       "supportsNxRole":true,
       "FastWildcards":4194303,
       "supportsOfppTable":true},
      "ports":[{"portNumber":3,
                "hardwareAddress":"ca:c1:50:14:14:bc",
                "name":"s1-eth3",
                "config":0,
                "state":0,
                "currentFeatures":192,
                "advertisedFeatures":0,
                "supportedFeatures":0,
                "peerFeatures":0},
               "buffers":256,
               "description":
               {"software":"1.9.0",
               "hardware":"Open vSwitch",
                "manufacturer":"Nicira,Inc.",
               "serialNum":"None",
               "datapath":"None"},
               "capabilities":199,
               "inetAddress":"/192.168.56.1:38129",
               "connectedSince":1401288591810,
               "dpid":"00:00:00:00:00:00:00:01"},
'/wm/core/controller/summary/json',
               {"# Switches":4,
               "# hosts":6,
               "# quarantine ports":0,
               "# inter-switch links":6}
'/wm/core/counter/<counterTitle>/json', 
               
'/wm/core/counter/<switchId>/<counterName>/json', 
               
'/wm/core/memory/json', 
               
'/wm/core/health/json', 
               
'/wm/core/system/uptime/json', 
               
'/wm/topology/links/json', //not in 0.8
               
'/wm/topology/switchclusters/json', //not in 0.8
               
'/wm/topology/external-links/json', 
               
'/wm/topology/links/json', 
               
'/wm/device/', 
               
'/wm/staticflowentrypusher/json', 
               
'/wm/staticflowentrypusher/list/<switch>/json', 
               
'/wm/staticflowentrypusher/clear/<switch>/json', 
               
'/networkService/v1.1/tenants/<tenant>/networks/<network>',
               
'/networkService/v1.1/tenants/<tenant>/networks/<network>/ports/<port>/attachment',
               
'/networkService/v1.1/tenants/<tenant>/networks',
               
'/wm/firewall/module/<op>/json',
               
'/wm/firewall/rules/json'  


