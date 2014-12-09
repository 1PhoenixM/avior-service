This section holds all of the files that are used for the back end portion of Avior. This section of the code is developed using Backbone.js. The major pieces of this folder are in Avior, JS, and Templates. The README in this section goes in to an in depth description of the Avior project itself and also provides some information on some of the files in this section. 

October 13, 2014 - Melissa Iori
Avior 2.0 - github.com/1PhoenixM/avior-service

Initial program written in Java by Jason Parraga, Ryan Wallner, Ryan Flaherty
Local .jar file ran client. Not web-based. Only Floodlight's API is supported. Required the download of a pre-compiled .jar specific to operating system (i.e. different download for Windows, for Linux, etc.) Included:

-Controller
-Devices (Hosts)
-Switches
-Static Flow Manager
-Firewall

Next iteration: Web-based, written in JavaScript, HTML, CSS by Junaid Kapadia, Kevin Pietrow, Devin Young
Runs within Floodlight through a Java routable. Browser-based. Only Floodlight's API is supported. Same download for any device. Completely new interface renders on mobile as well as desktop. Libraries and frameworks such as require.js and Backbone.js are integrated to show up-to-date dynamic stats. Included:

-Controller page
-Hosts page
-Switches page
-Topology page (new!) Rendered with d3.js
-Static Flow Manager page
-Firewall page

Current iteration: 2.0. Web-based, written on node.js, Sails.js, with same front-end as previous iteration by Melissa Iori, Aaron Kippins
Runs independently of any controller. The command 'sails lift' starts the Avior server, which is by default located at localhost:1337. Supports Floodlight API but is no longer dependent on it. Supports OpenDaylight's API and can support others via adapters. Sails.js gave Avior its own normalized JSON REST API which can pull from any controller, then output the information while using normalized OpenFlow protocol property names and conventions regardless of how the controller's API is set up. All normalization is handled in the back-end. The front-end remains mostly the same as it was in the previous web-based iteration, with a few tweaks to enable it to accept the JSON given back by Avior's API. Many new features, including a dual-panel customizable interface, plugin capability, and authentication. Included:

-Controller page
-Hosts page
-Switches page
-Topology page
-Static Flow Manager page
-Firewall page (now a sample plugin)

Avior is currently hosted on Github at github.com/1PhoenixM/avior-service.

See also github.com/1PhoenixM/avior-plugins and github.com/1PhoenixM/avior-plugin-template

Resource list:

Floodlight (controller API): http://www.openflowhub.org/display/floodlightcontroller/Floodlight+REST+API
Opendaylight (controller API): https://wiki.opendaylight.org/view/OpenDaylight_Controller:REST_Reference_and_Authentication

Node (back end): http://nodejs.org/api/
Sails (back end): http://sailsjs.org/#/documentation/concepts/
	http://sailsjs.org/#/documentation/reference/
	http://sailsjs.org/#/documentation/anatomy/myApp/

Backbone (front end): http://backbonejs.org/
Underscore (front end): http://underscorejs.org/

The problem that Avior solves:

SDN (software defined networking) is very cool for many reasons. As part of the greater push towards virtualization, SDN is evolving at a rapid rate. It saves time, saves costs, and saves efficiency for the staff of data centers. Avior in particular, can be a great help not only to expert systems administrators but also to those who are just learning SDN for their job or as a hobby. How does it do this?

First, it is necessary to understand how SDN helps the data center. Network infrastructure used to be quite convoluted within data centers. Hardware programming and software programming were heavily separated. Systems administrators knew how to troubleshoot network problems, but they had less control over traffic flows and network hardware at Layer 2. A network switch is simply a piece of hardware that decides where the frames (also referred to as packets in this context) it recieves need to go. It makes a decision based on a hard-coded "decision table" that is programmed into it. And when a systems administrator, up at the application layer, wanted to change this forwarding table to make things more effecient, they would have to call in a specialist who knew how to program that specific vendor switch, costing both time and money.

As businesses expanded their networks, this became an untenable situation. There had to be a faster way to provision traffic on the fly. Companies today can't afford even small periods of downtime, and they needed a way for system administrators up at Layer 5 to be able to program those switches on their own. Enter SDN.

SDN takes the "control plane" that was formerly within switch firmware and brings it up to Layer 5, the application layer. To use it, a network would need to utilize some protocol that understood this new concept of control plane and could unify devices under it. One of the most popular SDN protocols used is called OpenFlow, and that is the protocol that Avior is based off of, as well.

Now that we have OpenFlow, all that is needed is to have OpenFlow-compatible switches. The most widely-used version of OpenFlow on switches is 1.0. Support is starting for 1.3.1 and 1.4, but as of the time of writing, they are not wide-spread. As long as a data center has some OpenFlow-capable switches, it can then proceed on to the final broad requirement to using SDN.

OpenFlow-compatible switches can all be managed with a piece of software called an SDN controller. SDN controllers were created as points of management. They store lots of data about what switches are on the network, the names of those switches, and the tables and rules on the switches. OpenFlow incorporates the concept of a "flow" which is essentially a rule for packet traffic. A sample flow tells a switch something along the lines of, "If a packet comes to you with this attribute, do that with it." On each switch is a "flow table" of these rules. The attributes to match on can be wildcards meaning "any" if omitted, or can be specified - you can check the headers of packets for source and destination MAC addresses, IP addresses, TCP/UDP data and many others.

This functionality is extremely powerful. Best of all, it is made to be much easier to use for those who are not familiar with networking hardware. The two most popular controller softwares currently being used today are called "Floodlight" and "Opendaylight". Both offer many of the same features in line with the OpenFlow 1.0.0 specification. They each have their own browser-based web interface that simplifies interaction with the controller. They also each have a REST API available over http.

If the controller software is running somewhere, say on a virtual machine with IP address 10.10.10.10, with the controller bound on port 8080, you would be able to access the REST API by simply visiting a URI in your browser like 10.10.10.10:8080/api. Visiting the URI will give you some information in a format called JSON. JSON objects essentially look like:

{
	"name": "flow1"
	"action": "output"
}

This JSON object shows a flow named flow1 that, if added to some switch, will cause all traffic to be output normally - essentially, "let all through".

REST APIs are based on CRUD:
Create - HTTP Method POST - Example: Sending JSON data to the server to create a new flow
Read - HTTP Method GET - (This is the most widely used and your browser does it by default) Example: Getting a list of all flows in the form of an array of JSON objects
Update - HTTP Method PUT - Example: Finding an already existing flow and updating its name to correct an error.
Delete - HTTP Method DELETE - Example: Sending a JSON request to delete a specific flow.

Of these, only GET is done natively by the browser. On Linux, a utility called curl can be used in the command line to send requests with other methods.

A curl request might look like this:

>curl -H "Content-Type:application/json" -X POST -d '{"name": "flow1", "action": "output"}' http://10.10.10.10:8080/api/flow/add

The -H flag signifies the request header that expresses that JSON is being sent.
-X gives the POST method.
-d signifies the data to be send, enclosed in single quotes as a JSON string. Keep in mind that single quotes are best to encapsulate the entire string, as double quotes are required inside the JSON itself. If you use double quotes, you will have to use \ to escape the literal double quotes inside the JSON.
The http://hostip:port/apipath is then provided.

If any part of the URI, JSON string or curl request is malformed, an error or nothing may be returned. Check these carefully.

As an application, Avior talks to the API for you so that there is no need to use curl requests. This is a big timesaver. Imagine having to send 20 or more key-value pairs (flows have a lot of match attributes) and missing a simple error like a misspelled property name. Or try visualizing a network that looks like this from the API alone.

[
  {
    "SourceDPID": "00:00:00:00:00:00:00:01",
    "SourcePortNum": 12,
    "DestinationDPID": "00:00:00:00:00:00:00:02",
    "DestinationPortNum": 48
  },
  {
    "SourceDPID": "00:00:00:00:00:00:00:02",
    "SourcePortNum": 18,
    "DestinationDPID": "00:00:00:00:00:00:00:03",
    "DestinationPortNum": 17
  },
  {
    "SourceDPID": "00:00:00:00:00:00:00:03",
    "SourcePortNum": 50,
    "DestinationDPID": "00:00:00:00:00:00:00:04",
    "DestinationPortNum": 24
  },
  {
    "SourceDPID": "00:00:00:00:00:00:00:01",
    "SourcePortNum": 33,
    "DestinationDPID": "00:00:00:00:00:00:00:04",
    "DestinationPortNum": 49
  },
  {
    "SourceDPID": "00:00:00:00:00:00:00:01",
    "SourcePortNum": 21,
    "DestinationDPID": "00:00:00:00:00:00:00:03",
    "DestinationPortNum": 47
  },
  {
    "SourceDPID": "00:00:00:00:00:00:00:04",
    "SourcePortNum": 6,
    "DestinationDPID": "00:00:00:00:00:00:00:02",
    "DestinationPortNum": 33
  }
]

Avior's API sends this JSON up to Avior's front-end, which renders it into an easy-to-view graphical topology. That way, an administrator can see exactly which switches are connected to which hosts.

Now that we see how Avior handles JSON from different APIs, time to get deeper into the details of its code. I have provided here a breakdown of important files and modules within Avior at their current snapshot status, and many are simply dependencies of the Sails.js framework that can be left alone.

If a file is not mentioned in this list, it probably does not contain much in the way of Avior source code.

***avior-service/***

.tmp/ - This hidden folder contains temporarily loaded copies of web files - there is no source code in here. Uploaded plugin files are stored very briefly in .tmp/uploads before being moved to /api/hooks/plugins/zipped.

api/ - Contains the entire API back-end service and the adapters that manage controller APIs.
	adapters/ - Sails uses adapters to grab data from external sources, in this case, our SDN controllers. Since the controller APIs we are dealing with have different names and structures, we create an adapter module that talks specifically to each one, normalizes its data and sends it back in a human-readable and Avior-front-end-readable JSON format.
	controllers/ - Sails uses controllers to delegate certain actions to certain routes. Many of these are empty, as there are no special actions to be taken. They are used for plugin management and authentication, though.
	hooks/
	models/
	plugins/
	policies/
	responses/
	services/

assets/ - Contains js and css libraries and dependencies, as well as the entire Avior front-end.
	avior/
		css/
		img/
		js/
			collection/	
			floodlight/
			foundation/
			junaid.js/
			layout/
			lib/
			model/
			openflow/
			router/	
			vendor/
			view/
			avior.js
			foundation.min.js
			main.js
			text.js
			util.js
		tpl/
		index.html

config/ - Contains important Sails.js data and details, along with custom routes, connections to controllers, and authentication code.

node_modules/ - Contains node.js dependencies. Probably not to be messed with.

tasks/ - Code for the Grunt utility, no Avior source code here.

views/ - Sails views that are used for controller choice, login, plugins, 404s and anything else that affects the back-end.
  
.gitignore - For Github, an excluded files list.

app.js - The node.js bootstrap upon which everything loads. 

CodeNotes.txt - You are here.

Gruntfile.js - Code for the Grunt utility, no Avior source code here.

package.json - Contains dependencies for npm install.

README.md - A light guide containing setup, API and other details.

server.js - An Express dependency for the purpose of authentication.

toClient.js  - A very important file to the Avior source code. Within this module is the callback function to be executed when the data has come back from the controller. This file is run no matter what controller is being used. It makes many checks for validation of the JSON, catches some errors, then calls .parse and .normalize for the controller when it is satisfied that the JSON is valid. Finally, it calls cb(), Sails' function to send the JSON up to the browser. This is only done for GET requests.

If you get stuck, Google and StackOverflow are your friends, as is the documentation on... everything! Avior is, of course, open source. I look forward to seeing it be developed even further.

-Melissa Iori (Melissa.Iori1@marist.edu)
