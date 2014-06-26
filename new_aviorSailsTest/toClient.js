module.exports = function (ctlr,cb) {
	return function (res) {
		var responseString = '';
		res.setEncoding('utf-8');
 
		res.on('data', function(data) {
			responseString += data;
		});
 
		res.on('end', function() {
                        console.log(responseString);
                        var responseObject = JSON.parse(responseString);
                        console.log('\n\n\n\n\n\n\n\n\n\n\n' + responseObject);
                        var newObject = ctlr.dpidParse(responseObject);
                        console.log('\n\n\n\n\n\n\n\n\n\n\n' + newObject);
                        var normalizedObject = ctlr.normalize(newObject);
                        console.log(normalizedObject);
                        //ctlr.response.send(normalizedObject);
                        cb(null,normalizedObject);
		});
	}
}
