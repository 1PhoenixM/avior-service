var fs = require('fs');

//The plugin file must contain a route method, route path name, and function name.
//Note: encoding is important for returning and sending strings, not buffers.
var capabilities = fs.readFileSync('./plexxi.js', {encoding:'utf-8'});

arr = capabilities.split('\n');

if(arr.length < 3){
    console.log('Error: The plugin file is missing something.\n'); //TODO: What's missing?
}

//This adds the route to courier, scroll all the way to the bottom.
fs.appendFileSync('./courier.js', 
                    '\n' + 'app.' + arr[0] + '(' + arr[1] + ', ' + 'function(req,res){'
+ '\napp.controller.response = res;' + '\n' + 'app.controller.' + arr[2] + '();' + '\n});', 
                  {encoding:'utf-8'});

//TODO: Add more appends to the adapter and anything else that needs to be updated.
//TODO: Used synchronous methods for simplicity, might change later.
console.log("Plugin successfully added to Avior."); //TODO: Make this a callback to the append, so that it really is true.