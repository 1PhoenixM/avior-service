Avior 2.0 is a Node.js service designed for the administration and management of OpenFlow-capable networks. It is currently in the coding phase.

To run Avior on Ubuntu Linux, you will need:
    >A clone of this repository.
    >A node.js install.
    >An SDN controller. Currently supported: Floodlight, OpenDaylight.

0. Have an instance of Floodlight or OpenDaylight running on your local machine or your network. Know where it is located - localhost on the local machine, or an external IP address.

1. Clone into this repository.

2. Use the 'cd' command to navigate to the directory.

3. When you are there, run 'cd demo' to use the latest working demo.

4. Run 'sudo apt-get install nodejs'. Node.js is required to run Avior.

5. When finished, run 'node server.js'. This will start the Avior server.

6. The currently supported controllers are Floodlight and OpenDaylight. You need to send a POST request to tell Avior which one you are using.
7. To make the POST request, run the following in a terminal:

    curl -H "Content-Type:application/json" -d '{"type":"Floodlight", "hostname":"localhost"}' http://localhost:3412/controller
    
Replace "Floodlight" with "OpenDaylight" if using the OpenDaylight controller. The default address that Avior will look for the controller is at "localhost", change this in the request if the controller is located at an external IP.

8. If successful, you should recieve a "Controller set" message. Routes are now available, and a full guide to available routes is coming soon. To get the most out of Avior, have an actual network or virtual Mininet network connected to your controller.

To use the sails.js demo, navigate into sails_demo directory.

Then run the command "sails lift". It currently runs on the sails default, localhost:1337
