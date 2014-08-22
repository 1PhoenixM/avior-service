request = require "request"

module.exports = class Frst

        # This is the core access token that provides user permissions and account access
        access_token: null

        # This is overridable to allow use with internal api servers if needed
        host: "http://api.onfrst.com"

        # If set provides additional logging
        debug: false

        constructor: (@options)->
                if @options
                        @access_token = @options.access_token if @options.access_token
                        @host = @options.host if @options.host
                        @debug = @options.debug if @options.debug

        # Url generator
        url: (route)->
                throw new Error("you must call `url` with a route") unless route

                # TODO can now be accomplished using the Auth header
                access = if @access_token then "access_token=#{@access_token}" else ""

                console.log url if @debug

                # Ensure that there is always a leading slash
                route = "/#{route}" unless route.match(/^\//)

                "#{@host}#{route}?#{access}"

        remote: (options, cb)->
                throw new Error('remote must be called with a route') unless options.route

                url = @url(options.route)

                data =
                        url: url
                        method: options.type
                        json: options.data

                console.log('remote', data) if @debug

                request data, (err, res, body)->
                        #console.log 'remote res', body
                        if err
                                console.log url, err
                        else
                                try
                                        body = JSON.parse(body)
                                catch e
                                        console.log 'err parsing json body', err
                        err = body if res.statusCode == 404
                        cb(err, body)

        get: (options, cb)->
                if typeof options == "string"
                        route = options
                        options = {route:route}
                options.type = 'GET'
                @remote options, cb

        put: (options, cb)->
                options.type = 'PUT'
                @remote options, cb

        post: (route, data, cb)->
                options =
                        type: 'POST'
                        route: route
                        data: data
                @remote options, cb

        del: (options, cb)->
                options.type = 'DELETE'
                @remote options, cb
