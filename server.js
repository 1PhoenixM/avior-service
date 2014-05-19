//talks to the browser (client)
//gets requests and gives responses
var Discover = require('./capability/discoverer');
var Courier = require('./courier/courier');

//Request dispatch begins here.
console.log("Request from client received.");
console.log("Matching route dispatched to Courier.");
//Courier takes over here.
console.log("Received information from Courier.");
console.log("Responding to client.");
//Request dispatch ends here.