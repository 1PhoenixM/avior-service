define([
	"jquery",
	"underscore",
	"backbone",
	"router/router",
	"text!template/login.html",
	"text!template/content.html",
	"layout/frontpage",
], function($, _, Backbone, Router, loginTpl, contentTpl, FrontPage){
	return { 
		Router: Router,

		template: _.template(loginTpl),
		template2: _.template(contentTpl),

		initialize: function(){
			//console.log(window.innerHeight);
			//console.log(window.outerHeight);
			/*this.height = window.innerHeight * .811;
			//document.getElementById('content').style.height = this.height+"px";
			
			$(window).bind('resize', function () { 
				height = window.innerHeight * .811;
				//document.getElementById('content').style.height = this.height+"px";
			});*/
			
			$('#logout').click(function() {
								 localStorage.loggedIn = false;
								 window.location.href = "/avior/index.html#login";
								 document.getElementById("leftpanel3").style.display='none';
								 document.getElementById("logout").style.display='none';
								 $('#content').empty();
								 $('#content').append(this.template).trigger('create');
							  });
			
			//localStorage.timeout = new Date().getTime() + 60*60*1000;
			
			if(typeof(Storage)!=="undefined") {
				//console.log(localStorage.loggedIn);
				if (localStorage.timeout == undefined){
					localStorage.timeout = new Date().getTime() + 60*60*1000;
				}
				//console.log(new Date().getTime());
				//console.log(localStorage.timeout);
				if(new Date().getTime() > localStorage.timeout) {
  					alert("Session has expired");
  					localStorage.loggedIn = false;
				}
  				
  				if (localStorage.loggedIn == "true") {
  					$(document).bind('pageinit');
					$(function() { $("#some-div").show(); });
					$.mobile.linkBindingEnabled = false;
    				$.mobile.hashListeningEnabled = false;
    			
    				var self = this;
				
					document.getElementById("leftpanel3").style.display='block';
					document.getElementById("logout").style.display='block';
					var router = new Router();
					Backbone.history.start();

  				}
  				
  				else {
  					localStorage.timeout = new Date().getTime() + 60*60*1000;
  					$(document).bind('pageinit');
					$(function() { $("#some-div").show(); });
					$.mobile.linkBindingEnabled = false;
    				$.mobile.hashListeningEnabled = false;
    			
    				window.location.href = "/avior/index.html#login";
    				$('#content').empty();
    				
    				layout = new FrontPage();
    				layout.rightPanel.close();
    				
    				var self = this;
					$('#content').append(this.template).trigger('create');
					$('#userLogin').click(function() {self.validate();});
					
  				}
  				
  			}
			else {
  				document.getElementById("content").innerHTML = "Sorry, your browser does not support HTML5...";
  			}
		},
		
		validate: function() {
			var self = this;
			if ( $("#Lusername").val() === "admin" && $("#Lpassword").val() === "admin" ){
				$('#content').empty();
				document.getElementById("leftpanel3").style.display='block';
				document.getElementById("logout").style.display='block';
				var router = new Router(); 
				Backbone.history.start();
				window.location.href = "/avior/index.html#controllers";
				localStorage.loggedIn = true;
			}
			else {
				$('#content').empty();
				$('#content').append(this.template).trigger('create');
				$('#userLogin').click(function() {self.validate();});
				localStorage.loggedIn = true;
			}
		},
	};
});
