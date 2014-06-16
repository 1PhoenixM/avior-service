//**VARLIST
//This is a list of data elements given back from REST calls.
//Not all possible states of the network / returns are known. Is there somewhere to find this?
///////////////////////////////////OPEN DAYLIGHT
'/controller/nb/v2/topology/{containerName}',
    {
    "edgeProperties":[
    {
    "edge":{
    "tailNodeConnector":{
    "node":{
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "id":"2",
    "type":"OF"
    },
    "headNodeConnector":{
    "node":{
    "id":"00:00:00:00:00:00:00:51",
    "type":"OF"
    },
    "id":"2",
    "type":"OF"
    }
    },
    "properties":{
    "timeStamp": {
    "value": 1379527162648,
    "name": "creation",
    },
    "name": {
    "value": "s2-eth3"
    },
    "state": {
    "value": 1
    },
    "config": {
    "value": 1
    },
    "bandwidth": {
    "value": 10000000000
    }
    }
    },
    {
    "edge":{
    "tailNodeConnector":{
    "node":{
    "id":"00:00:00:00:00:00:00:51",
    "type":"OF"
    },
    "id":"2",
    "type":"OF"
    },
    "headNodeConnector":{
    "node":{
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "id":"2",
    "type":"OF"
    }
    },
    "properties":{
    "timeStamp": {
    "value": 1379527162648,
    "name": "creation",
    }
    }
    }
    ]
    }
'/controller/nb/v2/topology/{containerName}/userLinks',
        {
    "status":"Success",
    "name":"link1",
    "srcNodeConnector":"OF|2@OF|00:00:00:00:00:00:00:02",
    "dstNodeConnector":"OF|2@OF|00:00:00:00:00:00:00:51"
    }
'/controller/nb/v2/topology/{containerName}/userLink/{name}',
    {
    "userLinks": [
    {
    "status": "Success",
    "name": "link1",
    "srcNodeConnector": "OF|2@OF|00:00:00:00:00:00:00:02",
    "dstNodeConnector": "OF|5@OF|00:00:00:00:00:00:00:05"
    }
    ]
    }
'/controller/nb/v2/hosttracker/{containerName}/address/{networkAddress}',
    GET:

    {
     "dataLayerAddress":"00:00:00:00:01:01",
     "nodeType":"OF",
     "nodeId":"00:00:00:00:00:00:00:01",
     "nodeConnectorType":"OF",
     "nodeConnectorId":"9",
     "vlan":"0",
     "staticHost":"false",
     "networkAddress":"1.1.1.1"
    }

    PUT:
    {
     "dataLayerAddress":"00:00:00:00:01:01",
     "nodeType":"OF",
     "nodeId":"00:00:00:00:00:00:00:01",
     "nodeConnectorType":"OF",
     "nodeConnectorId":"9",
     "vlan":"1",
     "staticHost":"true",
     "networkAddress":"1.1.1.1"
    }

'/controller/nb/v2/hosttracker/{containerName}/hosts/active', 
    {
 "hostConfig":[
  {
   "dataLayerAddress":"00:00:00:00:01:01",
   "nodeType":"OF",
   "nodeId":"00:00:00:00:00:00:00:01",
   "nodeConnectorType":"OF",
   "nodeConnectorId":"9",
   "vlan":"0",
   "staticHost":"false",
   "networkAddress":"1.1.1.1"
  },
  {
   "dataLayerAddress":"00:00:00:00:02:02",
   "nodeType":"OF",
   "nodeId":"00:00:00:00:00:00:00:02",
   "nodeConnectorType":"OF",
   "nodeConnectorId":"5",
   "vlan":"0",
   "staticHost":"false",
   "networkAddress":"2.2.2.2"
  }
 ]
}
'/controller/nb/v2/hosttracker/{containerName}/hosts/inactive',
    {
 "hostConfig":[
  {
   "dataLayerAddress":"00:00:00:00:01:01",
   "nodeType":"OF",
   "nodeId":"00:00:00:00:00:00:00:01",
   "nodeConnectorType":"OF",
   "nodeConnectorId":"9",
   "vlan":"0",
   "staticHost":"false",
   "networkAddress":"1.1.1.1"
  },
  {
   "dataLayerAddress":"00:00:00:00:02:02",
   "nodeType":"OF",
   "nodeId":"00:00:00:00:00:00:00:02",
   "nodeConnectorType":"OF",
   "nodeConnectorId":"5",
   "vlan":"0",
   "staticHost":"false",
   "networkAddress":"2.2.2.2"
  }
 ]
}
'/controller/nb/v2/flowprogrammer/{containerName}',
        {
    "flowConfig": [
    {
    "installInHw": "true",
    "name": "flow1",
    "node": {
    "type": "OF",
    "id": "00:00:00:00:00:00:00:01"
    },
    "ingressPort": "1",
    "priority": "500",
    "etherType": "0x800",
    "nwSrc":"9.9.1.1",
    "actions": [
    "OUTPUT=2"
    ]
    }
    ]
    }
'/controller/nb/v2/flowprogrammer/{containerName}/node/{nodeType}/{nodeId}',
        {
    "flowConfig": [
    {
    "installInHw": "true",
    "name": "flow1",
    "node": {
    "type": "OF",
    "id": "00:00:00:00:00:00:00:01"
    },
    "ingressPort": "1",
    "priority": "500",
    "etherType": "0x800",
    "nwSrc":"9.9.1.1",
    "actions": [
    "OUTPUT=2"
    ]
    }
    ]
    }
'/controller/nb/v2/flowprogrammer/{containerName}/node/{nodeType}/{nodeId}/staticFlow/{name}',
        
    GET:
    {
    "installInHw":"true",
    "name":"flow1",
    "node":{
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "ingressPort":"1",
    "priority":"500",
    "etherType":"0x800",
    "nwSrc":"9.9.1.1",
    "actions":[
    "OUTPUT=2"
    ]
    }
    PUT:
        {
    "installInHw":"true",
    "name":"flow1",
    "node":{
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "ingressPort":"1",
    "priority":"500",
    "etherType":"0x800",
    "nwSrc":"9.9.1.1",
    "actions":[
    "OUTPUT=2"
    ]
    }
    
'/controller/nb/v2/staticroute/{containerName}/route/{route}',
    GET:
        {
    "name":"route-1",
    "prefix":"10.10.1.0/24",
    "nextHop":"1.1.1.1"
    }
    PUT:
    {
    "name":"route-1",
    "prefix":"10.10.1.0/24",
    "nextHop":"1.1.1.1"
    }
'/controller/nb/v2/staticroute/{containerName}/routes',
        {
    "staticRoute": [
    {
    "name": "route-1",
    "prefix": "10.10.1.0/24",
    "nextHop": "1.1.1.1"
    }
    ]
    }
'/controller/nb/v2/statistics/{containerName}/flow',
        {
    "flowStatistics": [
    {
    "node": {
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "flowStatistic": [
    {
    "flow": {
    "match": {
    "matchField": [
    {
    "type": "DL_TYPE",
    "value": "2048"
    },
    {
    "mask": "255.255.255.255",
    "type": "NW_DST",
    "value": "1.1.1.1"
    }
    ]
    },
    "actions": {
    "@type": "output",
    "port": {
    "node":{
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "id":"3",
    "type":"OF"
    }
    },
    "priority": "1",
    "idleTimeout": "0",
    "hardTimeout": "0",
    "id": "0"
    },
    "tableId": "0",
    "durationSeconds": "1828",
    "durationNanoseconds": "397000000",
    "packetCount": "0",
    "byteCount": "0"
    }
    ]
    },
    {   flow statistics of another node
    ............
    ................
    ......................
    }

    ]
    }
'/controller/nb/v2/statistics/{containerName}/port',
        {
    "portStatistics": [
    {
    "node": {
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "portStatistic": [
    {
    "nodeConnector":{
    "node":{
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "id":"3",
    "type":"OF"
    },
    "receivePackets": "182",
    "transmitPackets": "173",
    "receiveBytes": "12740",
    "transmitBytes": "12110",
    "receiveDrops": "0",
    "transmitDrops": "0",
    "receiveErrors": "0",
    "transmitErrors": "0",
    "receiveFrameError": "0",
    "receiveOverRunError": "0",
    "receiveCrcError": "0",
    "collisionCount": "0"
    },
    {
    "nodeConnector": {
    "node":{
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "id":"2",
    "type":"OF"
    },
    "receivePackets": "174",
    "transmitPackets": "181",
    "receiveBytes": "12180",
    "transmitBytes": "12670",
    "receiveDrops": "0",
    "transmitDrops": "0",
    "receiveErrors": "0",
    "transmitErrors": "0",
    "receiveFrameError": "0",
    "receiveOverRunError": "0",
    "receiveCrcError": "0",
    "collisionCount": "0"
    },

    ]
    },
    {
    "node": {
    "id":"00:00:00:00:00:00:00:03",
    "type":"OF"
    },
    "portStatistic": [
    ..................
    .......................
    ..........................
    ]
    }
    ]
    }
'/controller/nb/v2/statistics/{containerName}/table',
        {
    "tableStatistics": [
    {
    "node": {
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "tableStatistic": [
    {
    "nodeTable": {
    "node":{
    "id":"00:00:00:00:00:00:00:02",
    "type":"OF"
    },
    "id":"0"
    },
    "activeCount": "11",
    "lookupCount": "816",
    "matchedCount": "220",
    "maximumEntries": "1000"
    },
    {
    ...another table
    .....
    ........
    }

    ]
    }
    ]
    }
'/controller/nb/v2/statistics/{containerName}/flow/node/{nodeType}/{nodeId}',
        {
    "node": {
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "flowStatistic": [
    {
    "flow": {
    "match": {
    "matchField": [
    {
    "type": "DL_TYPE",
    "value": "2048"
    },
    {
    "mask": "255.255.255.255",
    "type": "NW_DST",
    "value": "1.1.1.2"
    }
    ]
    },
    "actions": [
    {
    "@type": "setDlDst",
    "address": "52d28b0f76ec"
    },
    {
    "@type": "output",
    "port":{
    "node":{
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "id":"5",
    "type":"OF"
    }
    }
    ],
    "priority": "1",
    "idleTimeout": "0",
    "hardTimeout": "0",
    "id": "0"
    },
    "tableId": "0",
    "durationSeconds": "2089",
    "durationNanoseconds": "538000000",
    "packetCount": "0",
    "byteCount": "0"
    }
    ]
    }
'/controller/nb/v2/statistics/{containerName}/port/node/{nodeType}/{nodeId}',
        {
    "node": {
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "portStatistic": [
    {
    "nodeConnector": {
    "node":{
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "id":"3",
    "type":"OF"
    },
    "receivePackets": "171",
    "transmitPackets": "2451",
    "receiveBytes": "11970",
    "transmitBytes": "235186",
    "receiveDrops": "0",
    "transmitDrops": "0",
    "receiveErrors": "0",
    "transmitErrors": "0",
    "receiveFrameError": "0",
    "receiveOverRunError": "0",
    "receiveCrcError": "0",
    "collisionCount": "0"
    },
    {
    "nodeConnector": {
    "node":{
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "id":"2",
    "type":"OF"
    },
    "receivePackets": "179",
    "transmitPackets": "2443",
    "receiveBytes": "12530",
    "transmitBytes": "234626",
    "receiveDrops": "0",
    "transmitDrops": "0",
    "receiveErrors": "0",
    "transmitErrors": "0",
    "receiveFrameError": "0",
    "receiveOverRunError": "0",
    "receiveCrcError": "0",
    "collisionCount": "0"
    }
    ]
    }

'/controller/nb/v2/statistics/{containerName}/table/node/{nodeType}/{nodeId}',
        {
    "node": {
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "tableStatistic": [
    {
    "nodeTable": {
    "node":{
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "id":"0"
    },
    "activeCount": "12",
    "lookupCount": "11382",
    "matchedCount": "10524",
    "maximumEntries": "1000"
    },
    {
    "nodeTable": {
    "node":{
    "id":"00:00:00:00:00:00:00:01",
    "type":"OF"
    },
    "id":"1"
    },
    "activeCount": "0",
    "lookupCount": "0",
    "matchedCount": "0",
    "maximumEntries": "0"
    }
    ]
    }
'/controller/nb/v2/subnetservice/{containerName}/subnets',
    {
    "subnetConfig": [
    {
    "name": "marketingdepartment",
    "subnet": "30.31.54.254/24",
    "nodeConnectors": [
    "OF|04@OF|00:00:00:00:00:00:00:04",
    "OF|07@OF|00:00:00:00:00:00:00:07"
    ]
    },
    {
    "name":"salesdepartment",
    "subnet":"20.18.1.254/16",
    "nodeConnectors": [
    "OF|11@OF|00:00:00:aa:bb:cc:dd:ee",
    "OF|13@OF|00:00:00:aa:bb:cc:dd:ee"
    ]
    }
    ]
    }
'/controller/nb/v2/subnetservice/{containerName}/subnet/{subnetName}',
    GET:        
    {
    "name":"marketingdepartment",
    "subnet":"30.0.0.1/24",
    "nodeConnectors":[
    "OF|1@OF|00:00:00:00:00:00:00:01",
    "OF|3@OF|00:00:00:00:00:00:00:03"
    ]
    }
    PUT:
    {
    "name":"salesdepartment",
    "subnet":"172.173.174.254/24",
    "nodeConnectors":[
    "OF|22@OF|00:00:11:22:33:44:55:66",
    "OF|39@OF|00:00:ab:cd:33:44:55:66"
    ]
    }
    POST:
    {
    "name":"salesdepartment",
    "subnet":"172.173.174.254/24",
    "nodeConnectors":[
    "OF|22@OF|00:00:11:22:33:44:55:66",
    "OF|39@OF|00:00:ab:cd:33:44:55:66"
    ]
    }
'/controller/nb/v2/switchmanager/{containerName}/nodes',
'/controller/nb/v2/switchmanager/{containerName}/save',
'/controller/nb/v2/switchmanager/{containerName}/node/{nodeType}/{nodeId}',
'/controller/nb/v2/switchmanager/{containerName}/node/{nodeType}/{nodeId}/property/{propertyName}',
'/controller/nb/v2/switchmanager/{containerName}/node/{nodeType}/{nodeId}/property/{propertyName}/{propertyValue}',
'/controller/nb/v2/switchmanager/{containerName}/nodeconnector/{nodeType}/{nodeId}/{nodeConnectorType}/{nodeConnectorId}/property/{propertyName}',
'/controller/nb/v2/switchmanager/{containerName}/nodeconnector/{nodeType}/{nodeId}/{nodeConnectorType}/{nodeConnectorId}/property/{propertyName}/{propertyValue}',
    
'/controller/nb/v2/usermanager/users',
'/controller/nb/v2/usermanager/users/{userName}',
    
'/controller/nb/v2/containermanager/containers',
'/controller/nb/v2/containermanager/container/{container}',
'/controller/nb/v2/containermanager/container/{container}/flowspecs',
'/controller/nb/v2/containermanager/container/{container}/nodeconnector',  
'/controller/nb/v2/containermanager/container/{container}/flowspec/{flowspec}',
    
'/controller/nb/v2/connectionmanager/nodes',
'/controller/nb/v2/connectionmanager/node/{nodeType}/{nodeId}',
'/controller/nb/v2/connectionmanager/node/{nodeId}/address/{ipAddress}/port/{port}',
'/controller/nb/v2/connectionmanager/node/{nodeType}/{nodeId}/address/{ipAddress}/port/{port}',

'/controller/nb/v2/networkconfig/bridgedomain/bridge/{nodeType}/{nodeId}/{bridgeName}',
'/controller/nb/v2/networkconfig/bridgedomain/port/{nodeType}/{nodeId}/{bridgeName}/{portName}',
'/controller/nb/v2/networkconfig/bridgedomain/port/{nodeType}/{nodeId}/{bridgeName}/{portName}/{vlan}',
    
'/controller/nb/v2/neutron/floatingips',
'/controller/nb/v2/neutron/floatingips/{floatingipUUID}',
'/controller/nb/v2/neutron/networks',
'/controller/nb/v2/neutron/networks/{netUUID}',
'/controller/nb/v2/neutron/ports',
'/controller/nb/v2/neutron/ports/{portUUID}',
'/controller/nb/v2/neutron/routers',
'/controller/nb/v2/neutron/routers/{routerUUID}',
'/controller/nb/v2/neutron/routers/{routerUUID}/add_router_interface',
'/controller/nb/v2/neutron/routers/{routerUUID}/remove_router_interface',
'/controller/nb/v2/neutron/subnets',
'/controller/nb/v2/neutron/subnets/{subnetUUID}'