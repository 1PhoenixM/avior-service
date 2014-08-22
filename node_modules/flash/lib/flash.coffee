request = require 'request'
child_process = require 'child_process'
{spawn, exec} = child_process
util = require "util"
print = util.print
fs = require 'fs'
path = require 'path'
mime = require 'mime'
async = require 'async'
nconf = require 'nconf'

process.on "uncaughtException", (err)-> console.log err

hosts = [
        "localhost"
        ]

try
        package_json = require(process.cwd() + '/package.json')
catch e
        #console.log 'not in a project directory'
throw "no package.json?!" unless package_json

throw new Error("package.json must have a repository.url") unless package_json.repository and package_json.repository.url

class Colors
        constructor: ()->
                @setType('text')

        # Change the root colors to one of the types available
        setType: (type)->
                throw new Error('type unavailable') unless type in ['text', 'bold', 'underline', 'background']

                @black =  @[type].black
                @red =    @[type].red
                @green =  @[type].green
                @yellow = @[type].yellow
                @blue =   @[type].blue
                @purple = @[type].purple
                @cyan =   @[type].cyan
                @white =  @[type].white

        text:
                black:  '\x1b[0;30m'
                red:    '\x1b[0;31m'
                green:  '\x1b[0;32m'
                yellow: '\x1b[0;33m'
                blue:   '\x1b[0;34m'
                purple: '\x1b[0;35m'
                cyan:   '\x1b[0;36m'
                white:  '\x1b[0;37m'
        bold:
                black:  '\x1b[1;30m'
                red:    '\x1b[1;31m'
                green:  '\x1b[1;32m'
                yellow: '\x1b[1;33m'
                blue:   '\x1b[1;34m'
                purple: '\x1b[1;35m'
                cyan:   '\x1b[1;36m'
                white:  '\x1b[1;37m'

        underline:
                black:  '\x1b[4;30m'
                red:    '\x1b[4;31m'
                green:  '\x1b[4;32m'
                yellow: '\x1b[4;33m'
                blue:   '\x1b[4;34m'
                purple: '\x1b[4;35m'
                cyan:   '\x1b[4;36m'
                white:  '\x1b[4;37m'

        background:
                black:  '\x1b[40m'
                red:    '\x1b[41m'
                green:  '\x1b[42m'
                yellow: '\x1b[43m'
                blue:   '\x1b[44m'
                purple: '\x1b[45m'
                cyan:   '\x1b[46m'
                white:  '\x1b[47m'

        reset: '\x1b[0m'
        bold: '\x1b[0;1m'

colors = new Colors()
bold = colors.bold
red = colors.red
green = colors.green
yellow = colors.yellow
blue = colors.blue
reset = colors.reset

app =
        session: null
        user: null
        access_token: null
app.branch = "master"
app.env = "production"
app.repo = process.cwd().replace(process.env.HOME + '/', '') # com/onfrst/applications/api, may not need this
app.repository = package_json.repository.url
app.application = package_json.name
app.deployTo = "/var/www/apps/#{app.application}/#{app.env}"
app.version = package_json.version
app.releasesDir = "releases"
app.sharedDir = "shared"
app.currentDir = "current"
app.releasesPath = -> path.resolve(app.deployTo, app.releasesDir)
app.sharedPath = -> path.resolve(app.deployTo, app.sharedDir)
app.currentPath = -> path.resolve(app.deployTo, app.currentDir)
app.releasePath = -> path.resolve(app.releasesPath, app.version)
app.previousRelease = null
app.latestRelease = null
app.previousReleasePath = -> path.resolve(app.releasesPath, app.previousRelease)
app.latestReleasePath = -> path.resolve(app.releasesPath, app.latestRelease)
app.nodeEntry = package_json.main

app.job = ->
        if app.env == "production"
                app.application
        else
                "#{app.application}-#{app.env}"

nconf.file(process.env.HOME + '/.flash.json')
#console.log 'nconf', nconf
unless nconf.get('user')
        nconf.set('user', {email:"anonymous@onfrst.com"})
        nconf.save()
#console.log 'user', nconf.get('user')

FrstClient = require("frst")
frst = new FrstClient
        access_token: nconf.get('access_token')
        host: nconf.get('host')

module.exports =
        register: (user, cb)->
                console.log('flash.register', user)
                frst.post 'users', user, (err, res)->
                        console.log(err) if err
                        console.log 'res', res
                        cb(err, res)

        login: (user, cb)->
                #console.log('flash.login', user)
                frst.post 'login', user, (err, res)->
                        if err
                                cb(err, null)
                        else
                                #console.log('frst.login', res)
                                nconf.set('session', res.session)
                                nconf.set('user', res.user)
                                nconf.set('access_token', res.user.access_tokens[0])
                                frst.access_token = nconf.get('access_token')
                                nconf.save()
                                cb(null, res.message)

        run: (app, cb)->
                if typeof app == 'function'
                        cb = app
                        app = null

                main_filepath = path.join(process.cwd(), package_json.main)
                args = [main_filepath]
                command = if package_json.main.match('coffee') then "coffee" else "node"
                @local command, args, cb

        local: (command, cb)->
                @launch 'sh', ['-c', command], cb

        remote: (command, cb)->
                done = hosts.length
                for host in hosts
                        @launch 'ssh', [host, command], ()->
                                done--
                setInterval ()->
                        cb() if cb and done == 0
                , 100

        launch: (command, options, cb)->
                throw new Error('No command specified') unless command

                host = if command == "ssh" then options[0] else "local"


                print "#{bold}[#{host}]: #{reset}#{yellow}#{command} #{options.join(' ')}#{reset}\n"
                res = []

                child = spawn(command, options)


                child.stderr.on 'data', (chunk)->
                        print red + "#{red}[#{host}]: #{reset}#{chunk}\n"

                child.stdout.on 'data', (chunk)->
                        print "#{green}[#{host}]: #{reset}#{chunk}\n"
                        res.push chunk

                child.on 'exit', (code)->
                        #console.log(green + '> ' + reset + res)
                        #console.log(red + '> ' + reset + code) unless code == 0

                        code = if code == 0 then null else code
                        cb(code, 'done')

        prepare: (cb)->
                @remote "ls -x #{app.releasesPath()}", (err, res)->
                        console.log res
                        rs = res.replace(/^\s+|\s+$/g, '').split(/\s+/).sort()
                        app.releases = rs
                        app.latestRelease = rs[rs.length - 1]
                        app.previousRelease = rs[rs.length - 2]
                        cb()

        updateCode: (cb)->

                @local "git ls-remote #{app.repository} #{app.branch}", (err, res)=>
                        head = res.split(/\s+/).shift()
                        @remote """
                                if [ -d #{app.sharedPath()}/cached-copy ];
                                  then cd #{app.sharedPath()}/cached-copy &&
                                  git fetch -q origin &&
                                  git fetch --tags -q origin &&
                                  git reset -q --hard #{head} &&
                                  git clean -q -d -x -f;
                                else
                                  git clone -q #{app.repository} #{app.sharedPath()}/cached-copy &&
                                  cd #{app.sharedPath()}/cached-copy &&
                                  git checkout -q -b deploy #{head};
                                fi
                                """, =>
                                        @remote """
                                                cd #{app.sharedPath()}/cached-copy;
                                                rm -r node_modules;
                                                npm install -l;
                                                cp -RPp #{app.sharedPath()}/cached-copy #{app.releasePath()};
                                                """, cb

        symlink: (cb)->

                @remote """
                        rm -f #{app.currentPath()};
                        ln -s #{app.releasePath()} #{app.currentPath()};
                        ln -s #{app.sharedPath()}/logs #{app.currentPath()}/logs;
                        true
                        """, cb

        up_version: (version)->
                split = version.split('.')
                if split[2]
                        split[2] = parseInt(split[2], 10) + 1
                        return up_version = split.join('.')
                else
                        console.log("WARNING", "Your version doesn't look to be properly formatted semver")
                        return version

        tag: (cb)->
                up_version = @up_version(package_json.version)
                @local """
                        LASTTAG=$(git show-ref `git describe --abbrev=0 --tags` --hash)
                        HEAD=$(git show-ref --head --hash HEAD)
                        if [ "$LASTTAG" != "$HEAD" ]
                        then
                                flash bump
                                git tag #{up_version};
                                git push origin #{app.branch}
                                git push origin --tags
                        fi
                        """, cb

        bump: (cb)->
                package_json.version = @up_version(package_json.version)
                file = process.cwd() + '/package.json'
                fs.writeFile file, JSON.stringify(package_json, null, 2), (err, file)=>
                        @local "git add package.json; git commit -m \"bump version\"", cb

        # Pull latest changes from SCM and symlink latest release
        # as current release
        update: (cb)->
                @prepare => @updateCode => @symlink cb

        # Update code and restart server
        deploy: (cb)->
                # deploys an app named api to api.onfrst
                # flash deploy api
                # flash deploy api.onfrst.com
                # TODO get name from cli
                name = "api"
                name = "#{name}.onfrst.com" unless name.match(/\./)

                # check to make sure url is valid
                frst.get "/applications/#{name}", (err, res)=>
                        console.log("frst.applciations.#{name}", err, res);
                        unless res.message == "Invalid ObjectId"
                                cb(err, null)
                        else
                                @tag => @local """
                                git archive --format tar HEAD | gzip -9 > /tmp/#{name}.tgz
                                """, (err, res)->
                                        fs.readFile "/tmp/#{name}.tgz", (err, file)->
                                                app =
                                                        name: name
                                                        archive: file
                                                frst.post "/applications", app, (err, res)->
                                                        console.log "post res", err, res


        clean: (cb)->
                @local 'fleet exec -- rm -rf node_modules', (err, res) =>
                        cb(err, 'done') if cb

        setup: (cb)->

                dirs = [app.deployTo, app.releasesPath(), app.sharedPath(), "#{app.sharedPath()}/logs"].join(' ')
                @remote """
                        NAME=`whoami`;
                        sudo mkdir -p #{dirs} &&
                        sudo chown -R $NAME:$NAME #{dirs}
                        """, cb

        setupUpstart: (cb)->
                @setup => @writeUpstartScript cb

        writeUpstartScript: (cb)->

                maybeEnv = ''
                maybeEnv = "env NODE_ENV=\"#{app.env}\"" if app.env

                ups = """
                        description "#{app.application}"

                        start on startup
                        stop on shutdown

                        #{maybeEnv}

                        script
                                export NODE_ENV

                                cd #{app.currentPath()}
                                /usr/local/bin/coffee #{app.currentPath()}/#{app.nodeEntry}
                        end script
                        respawn
                        """

                if app.env == "production"
                        file = app.application
                else
                        file = "#{app.application}-#{app.env}"

                @remote "sudo echo '#{ups}' > /tmp/upstart.tmp && sudo mv /tmp/upstart.tmp /etc/init/#{file}.conf", cb

        start: (cb)->
                @remote "sudo start #{app.job()}", cb

        stop: (cb)->
                @remote "sudo stop #{app.job()}", cb

        restart: (cb)->
                @remote "sudo restart #{app.job()} || sudo start #{app.job()}", cb

        status: (cb)->
                @remote "sudo status #{app.application}", cb

        rollback: (cb)->
                @prepare => @rollbackCode => @restart => @rollbackCleanup cb

        rollbackCode: (cb)->
                if app.previousRelease
                        @remote "rm #{app.currentPath()}; ln -s #{app.previousReleasePath()} #{app.currentPath()}", cb

        rollbackCleanup: (cb)->
                @remote "if [ `readlink #{app.currentPath()}` != #{app.latestReleasePath()} ]; then rm -rf #{app.latestReleasePath()}; fi", cb

        ps: (cb)->
                @remote "ps", cb

        test: (project, cb)->
                @local "mocha --compilers coffee:coffee-script test/*.coffee", (err, res)=>
                        cb(err, 'done') if cb

        create: (project, type, cb)->
                console.log 'create'
                throw new Error('No project name specified') unless project
                throw new Error('Unknown project type') unless type == "application" or type == "module"

                template = if type == "application" then "#{__dirname}/../templates/application" else "#{__dirname}/../templates/module"

                console.log 'template', template

                async.waterfall [
                        (callback)=>
                                @local "cp -r #{template} #{project}", callback
                        ,(res, callback)=>
                                @local "cd #{project}; git init", callback
                        ,(res, callback)=>
                                @local "cd #{project}; git add .", callback
                        ,(res, callback)=>
                                @local "cd #{project}; git commit -m 'initial commit for #{project}'", callback
                        ], (err, res)->
                                cb(null, 'done') if cb

        ports: (cb)->
                frst.get 'applications', (err, applications)->
                        if applications and applications.length
                                for app in applications
                                        console.log app
                        else
                                console.log "No applications running"
                        if err
                                cb(err)
                        else
                                cb(null, 'done') if cb

        # Lists and executes system jobs
        job: (name, cb)->
                #console.log 'job', typeof name
                if typeof name == "function"
                        cb = name
                        name = null
                if name
                        #console.log 'run job', name
                        try
                                job = require("/Users/nrub/com/onfrst/worker/jobs/#{name}")
                                job.run {}, cb
                        catch e
                                if e.message.match('Cannot find module')
                                        console.log 'job not found'
                                else
                                        console.log e
                                cb(null, 'done')
                else
                        # list jobs
                        fs.readdir "/Users/nrub/com/onfrst/worker/jobs", (err, dir)->
                                for script in dir
                                        console.log script.replace('.coffee', '')
                                cb(null, 'done')

        servers: (cb)->
                #console.log 'listing all servers'
                frst.get 'servers', (err, servers)->
                        if servers and servers.length
                                for server in servers
                                        console.log server
                        else
                                console.log "No servers currently clustered"
                        if err
                                cb(err)
                        else
                                cb(null, 'done')

        add_server: (server, cb)->
                console.log 'add server', server
                frst.post 'servers', server, (err, server)->
                        console.log err if err
                        console.log server
                cb(null, 'done')

        list_dependencies: (name, cb)->
                # TODO
                console.log 'no dependencies'
                cb(null, 'done')

        add_dependency: (name, cb)->
                # test if this is a versioned string. e.g. name@0.0.0
                [name, version] = name.split("@") if name.match("@")

                # Test if this a git repo. e.g. git+ssh://github.com/frst/logging.git
                if name.match(".git")
                        # is there a tag?
                        if name.match("#")
                                console.log name, version, name.split("#")
                                [name, version] = name.split("#")

                try
                        @add_component name, version, cb
                        return
                catch e
                        console.log 'not a component', e

                try
                        @add_npm_dependency name, version, cb
                        return
                catch e
                        console.log 'not an npm dependency', e

        add_component: (name, version, cb)->
                @local """
                mkdir -p public/js/vendor;
                cd public/js/vendor;
                volo add #{name}
                """, cb

        add_npm_dependency: (name, version, cb)->
                console.log 'adding npm dependency', name, version
                try
                        @local "npm install #{name}", cb
                catch e
                        cb(e)

        # Retrieve a log for the current application
        log: (cb)->
                @remote "tail -n 100 /var/log/#{app.application}/error.log", cb

        # Basic disk usage
        disk: (cb)-> @remote 'df -h', cb

        # Find largest directories
        ducks: (cb)-> @remote 'cd /;sudo du -cks * |sort -rn |head -11'

        # List of processes
        top: (cb)-> @remote 'top -b -n 1 | head -n 12', cb

        # Who is logged in
        who: (cb)-> @remote 'who', cb

        # List node processes
        node: (cb)-> @remote 'ps -eo args | grep node | grep -v grep', cb

        # Free memory
        free: (cb)-> @remote 'free', cb
        all: (cb)->
                @disk => @top => @who => @node => @free cb

        whoami: (cb)->
                email = nconf.get('user').email
                unless email
                        console.log "Not logged in"
                else
                        console.log email
                cb()