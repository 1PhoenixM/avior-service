function Deferred() {
    this._successCbk = function() {};
    this._failureCbk = function() {};
    
    return this;
}

Deferred.prototype.success = function(cbk) {
    this._successCbk = cbk;
    
    return this;
};

Deferred.prototype.failure = function(cbk) {
    this._failureCbk = cbk;
    
    return this;
};

Deferred.prototype.triggerSuccess = function() {
    var self = this,
        args = arguments;
    
    process.nextTick(function() {
	return self._successCbk.apply(null, args);        
    });
    
    return this;
};

Deferred.prototype.triggerFailure = function() {
    var self = this,
        args = arguments;
    
    process.nextTick(function() {
        return self._failureCbk.apply(null, args);
    });
    
    return this;
};

exports.Deferred = Deferred;