var http = require('http');
var path = require('path');

var express = require('express');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'my-app/build')));

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/send', (request, response) => {
  const sgMail = require('@sendgrid/mail');
  
  sgMail.setApiKey(process.env.API_KEY_SENDGRID);
  
  let msg = request.body;
  
  sgMail.send(msg)
    .then(() => {
      console.info('success: SendGrid');
      
      response.status(200).send('Mail delivered');
    })
    .catch((error) => {
      console.error('error: SendGrid');
      console.error(error.message);
      console.error(error);

      var domain = process.env.DOMAIN_MAILGUN;
      var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY_MAILGUN, domain: domain});
       
      mailgun.messages().send(msg, (error, body) => {
        if (error)  {
          console.error('error: Mailgun');
      
          response.status(error.statusCode).send('Mail no\'t delivered');
        } else {
          console.info('success: Mailgun');
          console.log(body);
          
          response.status(200).send('Mail delivered');
        }
      });
    }); 
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");