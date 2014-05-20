//authentication
//user data - history, preferences
//associated with individual and group identities and permissions

//these will be saved to the local machine.

var fs = require('fs');
Authorizer = require(./trust/authorizer);

console.log("Valid user received from Authorizer.");
console.log("Loading history.");
console.log("Loading preferences.");
console.log("Sending back to Authorizer.");
//Authorizer takes over.