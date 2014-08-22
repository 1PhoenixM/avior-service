FrstClient = require("../lib")
chai = require "chai"
should = chai.should()

describe 'the client', ->
        it 'should be instantiatable', ->
                frst = new FrstClient()
                should.exist(frst)

        it 'should be able to get all methods', (done)->
                frst = new FrstClient()
                frst.get '/', (err, methods)->
                        should.not.exist(err)
                        should.exist(methods)
                        done()
