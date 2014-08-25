# Avior 2.0

![Avior Logo]
(https://raw.githubusercontent.com/1PhoenixM/avior-service/master/assets/images/avior_logo_alt_trans.png)

Avior is a network management GUI designed for OpenFlow networks, focusing on versatility and usability
with a variety of dynamic network statistics and useful management tools.

Features include:
  * Dynamic stats about the controller, hosts, and switches on the network
  * Network topology rendered with d3.js
  * Static Flow Pusher
  * Firewall

To install and use:

Dependencies: node.js, sails.js (via npm)

1. Git clone this repository. 

2. Extract the files. 

3. Navigate to the directory with 'cd' commands in a terminal.

4. Run 'sails lift'. 

5. Navigate to localhost:1337 in your browser. 

6. Select your SDN controller. Currently supported: 
  * Floodlight (full support) ![Floodlight Logo]
(https://raw.githubusercontent.com/1PhoenixM/avior-service/master/assets/avior/img/floodlight-icon.png)
  * OpenDaylight (in development, full support coming soon) ![Opendaylight Logo]
(https://raw.githubusercontent.com/1PhoenixM/avior-service/master/assets/avior/img/opendaylight-icon.png)
  * And more...
    
7. Enter the IP address of your controller and click "Start Avior". 

8. Log in with admin/admin. 

9. The Avior API and GUI is now available! Use it to monitor a real network or a Mininet-generated network.

10. Visit [sdn.marist.edu](http://sdn.marist.edu) for more on Avior and other SDN projects.

a [Sails](http://sailsjs.org) application