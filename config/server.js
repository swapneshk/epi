var nodemailer = require('nodemailer');
/*
// create reusable transporter object using SMTP transport
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "testteam.e37@gmail.com",
        pass: "testing@2012"
    }
});
*/
module.exports = {
  drawRoutes: function(app) {
    
    app.set('view engine', 'jade');
	
    /*
	app.get('/dashboard', function(req, res){      
      res.render('../app/pages/dashboard-layout');
    });
    */

	app.get('/login', function(req, res){
		res.render('../app/pages/login');
	});
	
	app.get('/adminNav', function(req, res){
	console.log('adminNav');
      res.render('../app/templates/admins/sidebar');
    });
	
	app.get('/employeeNav', function(req, res){      
      res.render('../app/templates/employees/sidebar');
    });
	
	app.get('/managerNav', function(req, res){
      res.render('../app/templates/managers/sidebar');
    });
	
	/*
	app.get('/adminprofile', function(req, res){
      res.render('../app/templates/admins/adminprofile');
    });
	
	app.get('/managerprofile', function(req, res){
      res.render('../app/templates/managers/managerprofile');
    });
	
	app.get('/employeeprofile', function(req, res){
      res.render('../app/templates/employees/employeeprofile');
    });
    */
	
	app.post('/sendemail', function(req, res){
	  var email = req.body.email;
	  var mailtoken = req.body.mailtoken;
	  console.log("Req Body");
	  console.log(req.body);
	  // Send mail for pasword reset
	  if ( "1811919" == mailtoken ) {
		var passdata = req.body.passdata;
		
		// Decode Base64 password
		var b = new Buffer(passdata, 'base64');
		var changed_password = b.toString();
		
    /*
    var mailOptions = {
        from: "Test Team | <testteam.e37@gmail.com>", // sender address
        to: "swapneshk@smartdatainc.net", // list of receivers
        subject: "EMS: Password Change Request - Test", // Subject line
        text: "Hello world", // plaintext body
        html: "Your password changed successfully."+ "Your new password is "+ "<style='color: red;'>"+ changed_password +"</style>" // html body
    };
console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
		res.send({"message": error});
        }else{
            console.log("Message sent: " + response.message);
		res.send({"message": response.message});
        }
    }); 		
		*/
    
	  } // PASSWORD(1811919) IF ENDS HERE
	  
	});
    
    /*
    app.get('/test', function(req, res){
      res.render('../app/pages/test', {src: ""});
    });
    */
    
  }
};
