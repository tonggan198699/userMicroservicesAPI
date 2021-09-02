require('dotenv').config();
const nodemailer = require('nodemailer');

const emailService = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER_NAME, 
      pass: process.env.EMAIL_PASSWORD 
    }
});

module.exports = emailService;