module.exports = function (ctlr,cb) {
	return function (res) {
		var responseString = '';
		res.setEncoding('utf-8');
 
		res.on('data', function(data) {
			responseString += data;
		});
 
		res.on('end', function() {
                        var responseObject = JSON.parse(responseString);
                        var normalizedObject = ctlr.normalize(responseObject);
                        //console.log(normalizedObject);
                        //The line below was changed in matt's file.
                        ctlr.response.send(normalizedObject);
                        //cb(null, normalizedObject);
		});
	}
}
