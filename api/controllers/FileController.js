module.exports = {

  index: function (req,res){
    
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
            '<style>'+

        '.aviorHeader {'+
          'position:relative;'+
        '}'+

        '.headerIMG {'+
          'margin:auto;'+
          'position:absolute;'+
          'top:0;bottom:0;'+
          'left:0;right:0;'+
        '}'+

        '.headerIMG {'+
          'max-height:100%;'+
          'max-width: 100%;'+
        '}'+

        '.innerPageLoader{'+
            'display:none;'+
         'position:absolute;'+
         'vertical-align:center;'+
          'margin:auto;'+
          'top:40.5%;'+
          'left:0;right:0;'+
        '}'+

        '.ui-loader{'+
            'display:none;'+
        '}'+

        '.ui-icon-loading{'+
            'display:none;'+
        '}'+

        '#warning{'+
            'color: #b20000;'+   
        '}'+

        '</style>'+

        
        '<link rel="stylesheet" href="/styles/css/junaid.css">'+
        '<link rel="stylesheet" href="/styles/css/junaid.css/flipscroll.css">'+
        '<link rel="stylesheet" href="/styles/css/junaid.css/jqm-docs.css">'+
        '<link rel="stylesheet" href="/styles/css/junaid.css/jquery.mobile-1.3.2.min.css">'+
        '<link rel="stylesheet" href="/styles/css/junaid.css/responsive-tables.css">'+
        '<link rel="stylesheet" href="/styles/css/junaid.css/reveal.css">'+
        '<link rel="stylesheet" href="/styles/header.css">'+
        '<link rel="stylesheet" href="/styles/importer.css">'+

        '<script>'+
            'function validate(){'+
               
               'var plugin_name = document.getElementById("plugin_file").value;'+
                    'alert("Integration pending...");'+
                    
                    'window.location = "/success";'+
            '}'+
            
        '</script>'+

        '<header>'+
            '<div class="aviorHeader" data-role="header" data-theme="a" style="max-height: 60px;">'+
            '<h1><img class="headerIMG" src="/images/avior_logo_alt_trans.png"  height="40" width="120" style="vertical-align: top;"> </h1>'+
            '</div>'+
        '</header>'+

        '<body onload="getPlugins();">'+
        '<div id="check" style="text-align:center;">'+
        '<h2> Plugin Manager </h2>'+
        '<h4> <a href="https://github.com/1PhoenixM/avior-plugin-template"> This guide and template will explain the file structure and required code for an Avior plugin. </a> </h4>'+
        '<p id="pluginList"></p>'+
        '<h4> Please upload your plugin package below. </h4>'+
        '<p>The only file extension currently accepted by Avior is .zip </p>'+
        '<p id="warning"> To use your new plugin, it is necessary to restart the Avior backend server after you upload and validate your file. </p>'+
        
        '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
            '<input type="text" name="title"><br>'+
            '<input type="file" name="avatar" multiple="multiple"><br>'+
            '<input type="submit" value="Upload">'+
            '</form>'+

        '<button name="validation" id="validate" class="small-6 columns" onclick="validate();">Submit New Plugin</button>'+
        '</div>'+
        '</body>'
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
  },
    
  plugins: function (req, res) {
  
    return res.view('plugins', {
      plugins: sails.config.plugins
    });
  },

};

