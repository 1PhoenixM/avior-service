module.exports = {

  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: function  (req, res) {
    req.file('avatar').upload(function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
	var fs = require('fs');
	fs.renameSync('../../.tmp/uploads/' + files.filename, './' + files.filename);
	console.log('../../.tmp/uploads/' + files.filename);
	console.log(fs.existsSync('../../.tmp/uploads/' + files.filename));
    });
  }

};

