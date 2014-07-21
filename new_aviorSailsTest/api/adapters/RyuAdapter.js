var toClient = require('../../toClient.js');
var http = require('http');

var TO_OFP = {
	// name-in-ryu: name-in-models

    
};

// Creates a function that, when called, will make a REST API call
var restCall = function(apiMethod,apiPath){
        //var self = this;
        return function(options,cb){
                if (options.args){
                        for (arg in options.args){
                                apiPath = apiPath.replace(/:[A-Za-z]+:/, options.args[arg]);
                        }
                }
                opts = {method:apiMethod,hostname:'localhost',port:8080,path:apiPath};
                req = http.request(opts, toClient(this,options.call,cb));
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                }
                req.end();
        }
};

module.exports = {
	   identity: 'ryu',

        registerConnection: function (conn, coll, cb) {
                if (!conn.port) { conn.port = 8080; }
                if (!conn.method) { conn.method = 'GET'; }
                cb();
        },

        find: function (conn, coll, options, cb) {
            switch (coll){       
                case 'flow': return this.getFlows({args:['all'],call:coll},cb);
                        break;
		        default: return cb();
                        break;
                }
        },
    
        
        create: function (conn, coll, options, cb) {
                switch (coll){
                case 'flow': return this.postFlow({data:{}},cb);
		        default: return cb();
                }
        },
    
        update: function (conn, coll, options, cb) {
                switch (coll){
		        default: return cb();
                }
        },
    
        destroy: function (conn, coll, options, cb) {
                switch (coll){
                case 'flow': return this.delFlow({data:{}},cb);
                        break;
		        default: return cb();
                }
        },
    
        normalize: function (obj) {
                var normalizedField;
                var normalizedObj;
                if (!obj){ return 0; } //to fix: this applies to both "null" and "0" responses.
		        if (obj.constructor === Array) {
			         normalizedObj = [];
			         for (i in obj) {
				        normalizedObj.push(this.normalize(obj[i]))
			         }
		        } else if (obj.constructor === String || obj.constructor === Number || obj.constructor === Boolean || obj === 0) {
                        normalizedObj = obj;
		        } else {
			         normalizedObj = {};
			         for (fromField in TO_OFP) {
				        if (obj[fromField] || obj[fromField] === 0) { //added so that "0" responses are not discarded
		 	        	       toField = TO_OFP[fromField];
	                           normalizedObj[toField] = this.normalize(obj[fromField]); //Nested structs? Probably handled recursively
				        }
			         }
                }
                return normalizedObj;
        },
    
        dpidParse: function (current, obj) {
                
                arr = [];
            
                return obj;
        
        
        },
  
    getFlows: restCall('GET',''), 


}

