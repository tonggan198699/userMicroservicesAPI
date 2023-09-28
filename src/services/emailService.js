require('dotenv').config();
const nodemailer = require('nodemailer');

const emailService = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER_NAME,
      pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmail (data) {
    emailService.sendMail(data, function(error, info) {
        if (error) {
            console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = sendEmail;
