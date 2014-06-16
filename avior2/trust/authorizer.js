//enforce access control policies from policymaker.js
//with respect to plugins/capabilities
Courier = require(./courier/courier.js);

console.log("Recieved attempted request from Courier.");
console.log("Is user role allowed to perform this action?");
console.log("If yes, send to identifier for more information.");
console.log("If no, send back denial message.");
//If allowed, Identifier will now take over, then return here when done.
console.log("User identified, preferences and configurations loaded.");
//Capability provider will take over from here.