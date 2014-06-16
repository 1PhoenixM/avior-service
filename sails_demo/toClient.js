module.exports = function (ctlr) {
	return function (res) {
		var responseString = '';
		res.setEncoding('utf-8');
 
		res.on('data', function(data) {
			responseString += data;
		});
 
		res.on('end', function() {
                var responseObject = JSON.parse(responseString);
                var normalizedObject = ctlr.normalize(responseObject);
                console.log(normalizedObject);
                ctlr.response.send(normalizedObject);
		});
	}
}