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
        
        //console.log(files);
        //base dir: /avior-service
	   //console.log(fs.readdirSync('./.tmp/uploads'));
         var fs = require('fs');
    if(files[0].type === "application/zip"){
        console.log(".zip file found, starting integration...");
        fs.renameSync('./.tmp/uploads/' + files[0].filename, './api/hooks/plugins/zipped/' + files[0].filename);
         var DecompressZip = require('decompress-zip');
        var unzipper = new DecompressZip('./api/hooks/plugins/zipped/' + files[0].filename)

        unzipper.on('error', function (err) {
            console.log('Caught an error: ' + err);
        });

        unzipper.on('extract', function (log) {
            console.log('Finished extracting to /api/hooks/plugins/files/');
        });

        unzipper.extract({
            path: './api/hooks/plugins/files/',
            filter: function (file) {
                return file.type !== "SymbolicLink";
            }
        });
      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    }
	
  else{
    console.log("Please upload a .zip file containing your files.");
       return res.json({
        error: "Not a .zip file."
      });
  }
    });
  }

};

