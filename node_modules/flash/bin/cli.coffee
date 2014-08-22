#!/usr/bin/env coffee
program = require("commander")
async = require("async")
exec = require('child_process').exec
util = require 'util'

flash = require("../lib/flash")

package_json = require("../package.json")

bold = '\x1b[0;1m'
green = '\x1b[0;32m'
red = '\x1b[0;31m'
blue = '\x1b[0;34m'
reset = '\x1b[0m'

complete = (err, res)->
        code = 0
        if err
                console.log "#{red}#{util.inspect(err)}#{reset}"
                code = 1
        console.log "#{blue}#{res}#{reset}" if res
        process.exit(code)


program.name = "flash"
program.version(package_json.version)

program.command("run")
        .description("Run the application in the current directory")
        .action () ->
                flash.run complete

program.command("create <name>")
        .description("Create a local application")
        .action (name) ->
                #console.log("create", name)
                async.waterfall [
                        (callback)->
                                program.prompt 'type (application, module): ', (type)->
                                        type = "module" unless type == "a" or type == "application" or type == "app" or type == ""
                                        type = "application"
                                        callback(null, type)
                        ], (err, type)->
                                console.log(type)
                                flash.create name, type, complete

program.command("init")
        .description("Initialize a local application")
        .action () ->
                flash.init complete

program.command("deploy")
        .description("Deploys a server configuration across your nodes")
        .action () ->
                flash.deploy complete

program.command("ps")
        .description("Shows processes running on any drones")
        .action (project)->
                flash.ps complete

program.command("whoami")
        .description("Shows you who you are logged in as")
        .action ()->
                flash.whoami complete

program.command("login")
        .description("Create a session the programmable-matter server")
        .action () ->
                async.waterfall [
                        (callback)->
                                program.prompt 'email: ', (email)->
                                        # TODO test if email is available, if not switch to registration
                                        res = {email: email}
                                        callback(null, res)
                        ,(res, callback)->
                                program.password 'password: ', "*", (password)->
                                        res.password = password
                                        process.stdin.destroy();
                                        callback(null, res)
                        ], (err, res)->
                                console.log(res)
                                flash.login res, (err, body)->
                                        console.log('finished')

program.command("register")
        .description("Register a user account with the programmable-matter server")
        .action ()->
                async.waterfall [
                        (callback)->
                                program.prompt 'first name: ', (first_name)->
                                        user = {first_name: first_name}
                                        callback(null, user)
                        ,(user, callback)->
                                program.prompt 'last name: ', (last_name)->
                                        user.last_name = last_name
                                        callback(null, user)
                        ,(user, callback)->
                                program.prompt 'email: ', (email)->
                                        # TODO test if email is available, if not switch to registration
                                        user.email = email
                                        callback(null, user)
                        ,(user, callback)->
                                program.password 'password: ', "*", (password)->
                                        user.password = password
                                        callback(null, user)
                        ,(user, callback)->
                                program.password 'confirm password: ', "*", (password_confirmation)->
                                        user.password_confirmation = password_confirmation
                                        process.stdin.destroy();
                                        callback(null, user)
                        ], (err, user)->
                                flash.register user, (err, user)->
                                        console.log(user == 'ok')

program.command("test")
        .description("Run the test suite")
        .action ()->
                flash.test complete

program.command("stop [pid]")
        .description("Stop the current application")
        .action (pid)->
                flash.stop pid, complete

program.command("start [name]")
        .description("Start the current application")
        .action (name)->
                flash.start name, complete

program.command("restart [pid]")
        .description("Restart the current application")
        .action (pid)->
                flash.restart pid, complete

program.command("ports")
        .description("Display the running port configuration")
        .action ()->
                flash.ports complete

program.command("jobs [name]")
        .description("Run a given job by name or list all available jobs")
        .action (name)->
                flash.job name, complete

program.command("servers [command]")
        .description("List all servers")
        .action (command)->
                if command == "add"
                        async.waterfall [
                                (cb)->
                                        program.prompt 'server address: ', (host)->
                                                console.log host
                                                cb(null, host)
                                (host, cb)->
                                        server =
                                                name: host
                                        cb(null, server)
                                ], (err, server)->
                                        flash.add_server server, completed
                else
                        flash.servers complete

program.command("version [command] [version]")
        .description("List or update the version of the current application")
        .action (command, version)->
                flash.version complete

                if command == "update"
                        # TODO prompt for version number unless version
                        program.prompt ''
                        flash.version version, complete

program.command("install [name]")
        .description("Install an application recipe by name or init file")
        .action (name)->
                flash.install name, complete

program.command("use [name]")
        .description("Use a plugin or dependency")
        .action (name)->
                unless name
                        flash.list_dependencies name, complete
                else
                        flash.add_dependency name, complete

program.command("log")
        .description("Display the last 100 log entries")
        .action ()->
                flash.log complete

program.command("i [command]")
        .description("Check information on server")
        .action (command)->
                # TODO restrict to the i commands only
                command = "all" unless command
                flash[command] complete

program.command("exec <command>")
        .description("Perform a remote command amongst all servers")
        .action (command)->
                #console.log command
                flash.remote command, complete

program.command("tag")
        .description("Update the package version and tag your repository")
        .action ()->
                flash.tag complete

program.command("bump")
        .description("Bump your package version by one minor release")
        .action ()->
                flash.bump complete

######

help_text = "#{bold}For usage information run:#{reset} flash --help"
program.command("*")
        .description("Display help text")
        .action ()->
                console.log help_text

program.parse(process.argv)

unless process.argv[2]
        console.log help_text
