require('dotenv').config()
const express = require('express');
const authController = require('../controllers/authController.js');
const logMiddleware = require('../middleware/logMiddleware.js');
const updateDateTimeUserClickOnActivationLink = require('../middleware/updateDateTimeUserClickOnActivationLink.js');
const checkActivationLinkExpiry = require('../middleware/checkActivationLinkExpiry.js');
const router = express.Router();

// register
router.post('/register', [
    logMiddleware,
    authController.registerNewUser,
]);

// login
router.post('/login', [
    logMiddleware,
    authController.userLogin
]);

// verify account
router.get('/verifyAccount?:id', [
    logMiddleware,
    updateDateTimeUserClickOnActivationLink, // updates sentActivationLinkAt to now()
    // check for the time in which user clicks on the activation link
    // within the allowed timeline, sets status to true
    // after the allowed timeline, throws out error
    checkActivationLinkExpiry 
]);

// resend activation email
router.post('/resendActivationEmail?:id', [
    logMiddleware,
    updateDateTimeUserClickOnActivationLink, // updates sentActivationLinkAt to now()
    // calls the function to trigger activation email sending again
    authController.resendActivationEmail
]);

module.exports = router;