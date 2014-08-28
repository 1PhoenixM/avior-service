# Avior 2.0

![Avior Logo]
(https://raw.githubusercontent.com/1PhoenixM/avior-service/master/assets/images/avior_logo_alt_trans.png)

Avior is a network management GUI designed for OpenFlow networks, focusing on versatility and usability
with a variety of dynamic network statistics and useful management tools.

![Avior Screenshots]
(https://raw.githubusercontent.com/1PhoenixM/avior-service/master/assets/images/Avior.png)
Development screenshots taken August 26, 2014. Click to enlarge.

Features include:
  * Dynamic stats about the controller, hosts, and switches on the network
  * Network topology rendered with d3.js
  * Static Flow Pusher
  * Firewall

To install and use:

Dependencies: node.js, sails.js (via npm)

1. If you have git installed, git clone this repository. Alternatively you can download the .zip file from this page.
    
    > git clone http://github.com/1PhoenixM/avior-service

2. In a terminal, run:

    > cd avior-service

3. To start the server, run: 

    > sails lift 

4. If you need to stop the server, go to the terminal, hold the CTRL key, and type 'C'. In your browser, visit:

    > http://localhost:1337

5. Select your SDN controller. Currently supported: 
  * Floodlight ![Floodlight Logo]
(https://raw.githubusercontent.com/1PhoenixM/avior-service/master/assets/avior/img/floodlight-icon.png) (full support)
  * OpenDaylight ![Opendaylight Logo]
(https://raw.githubusercontent.com/1PhoenixM/avior-service/master/assets/avior/img/opendaylight-icon.png) (near-full support coming very soon)
  * And more...
    
6. Enter the IP address of your controller and click "Start Avior". 

7. Log in with admin/admin. 

8. The Avior API and GUI is now available! Use it to monitor a real network or a Mininet-generated network.

9. Visit [sdn.marist.edu](http://sdn.marist.edu) for more on Avior and other SDN projects.

Guide:

Clicking the menu button in the top left corner opens the menu.

Overview:
Controller - A brief summary, showing which controller is being used, its uptime, memory usage, its status, and which Java modules are loaded.
Hosts - A list of hosts with their MAC and IP addresses.
Switches - A list of switches and their ports and flows.
Topology - A graphical topology of switches, hosts, and their links. You can change the colors via the Advanced tab.

Tools:
Flow Editor - Flow Editor allows you to create and delete static flows on the network.
Firewall - Currently a Floodlight-only feature, Firewall allows you to block certain ports.

Management:
Setup - The landing page of Avior, where you can choose your controller and enter an IP address to switch controllers at any time. No need to restart the server.
Plugins - Visit http://github.com/1PhoenixM/avior-plugin-template for details on how to create an Avior plugin. Requires restart to take effect.
Options - Allows you to configure the GUI panels. No need to restart the server.

FAQ:

Q: The interface isn't loading, or reports 0 switches when there are switches connected.
A: Especially for OpenDaylight, the web interface is still a little buggy. Clearing your web cache and refreshing your browser should fix the issue.

Q: The Sails server crashes with an ECONN_REFUSED error.
A: Close all instances of Avior in the browser and restart the server. Be sure to visit localhost:1337 first to select your controller and point Avior at a valid IP address.

API:

This is a normalized JSON REST API over HTTP that can be used under Floodlight or OpenDaylight. All methods are GET unless otherwise specified.

/memory/find - TotalMemory and FreeMemory used by the controller.
/modules/find - List of all loaded Java modules / classes used by the controller.
/health/find - The health of the controller.
/uptime/find - Uptime of the controller.

/host/find - Lists all hosts on the network, their MAC and IP addresses.

/switch/find - A list of switches on the controller and a port list for each one.
/switchdesc/find/:dpid - Description of the switch, including its manufacturer, hardware, software and serial number.
/switchfeatures/find - Features of the switches.
/aggregate/find - Aggregate stats, packet and byte counts.
/switchports/find/:dpid - Port Statistics for each port on a switch including RX and TX packets and bytes, etc.
/flowstats/find/:dpid - Flows on the switches.

/alterflow/find - Static flows on the switches.
/alterflow/create - (POST) Create a new static flow.
/alterflow/destroy - (DELETE) Destroy an existing static flow. This action cannot be undone.
/clearflows - Clears ALL flows. This action cannot be undone.

/topology/find - Topology of the network, showing how switches and hosts are connected through port links.

a [Sails](http://sailsjs.org) application