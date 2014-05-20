//client-facing
//routing service
//sets up routes to expose data thru browser

console.log("Received dispatch from server.");
console.log("Matching dispatch to matching route.");
//Authorizer takes over here.
console.log("Received Capability from Provider.");
console.log("Loading route to Server.");
//Server takes over here.


//TODO: separating server and routes 

var http = require('http'),
    url = require('url');

//code: teach yourself node.js in 24 hours

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    
    if (pathname === '/') {
        res.writeHead(200, {
        'Content-Type': 'text/html'
    });
        res.end('Avior Login\n')
    } else if (pathname === '/controllers') {
        res.writeHead(200, {
        'Content-Type': 'text/html'
    });
        res.end('Controllers\n')
    } 
      else if (pathname === '/hosts') {
        res.writeHead(200, {
        'Content-Type': 'text/html'
    });
        res.end('Hosts\n')
    }
      else if (pathname === '/switches') {
        res.writeHead(200, {
        'Content-Type': 'text/html'
    });
        res.end('Switches\n')
    }
      else if (pathname === '/topology') {
        res.writeHead(200, {
        'Content-Type': 'text/html'
    });
        res.end('Topology\n')
    } 
      else if (pathname === '/staticflowmanager') {
        res.writeHead(200, {
        'Content-Type': 'text/html'
    });
        res.end('Static Flow Manager\n')
    }
      else if (pathname === '/firewall') {
        res.writeHead(200, {
        'Content-Type': 'text/html'
    });
        res.end('Firewall\n')
    }
      else if (pathname === '/redirect') {
        res.writeHead(301, {
            'Location': '/'
    });
    res.end();
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('Page not found\n')
    }
}).listen(3000, "127.0.0.1");
console.log("Avior server running on 127.0.0.1:3000");