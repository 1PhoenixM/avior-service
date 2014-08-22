This is an API client for working with the On Frst Commerce API that is found at `https://api.onfrst.com`

[![Build Status](https://secure.travis-ci.org/frst/frst-node.png)](http://travis-ci.org/frst/frst-node)

## Usage

    FrstClient = require('frst');
    frst = new FrstClient({access_token: "<insert-your-token>"});

    frst.get("/", function(err, methods) {
        // methods will contain a list of resources you have access to
    });

## Development

The client is built primarily in coffee-script so if you're looking to help in development you can find the source `coffee` files inside the src directory

## Testing

Testing is performed on the compiled `js` library using `mocha` and `chai`.

    cake test
