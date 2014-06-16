var host = {
  attributes: {
   entityClass: 'STRING',
   mac: 'STRING',
   ipv4:'STRING',
   vlan:'STRING',
   attachmentPoint: {
      datapathId: 'STRING',
      port_no: 'INTEGER',
      err: 'STRING',
    },
    lastSeen: 'INTEGER',
  }
};

module.exports = host;