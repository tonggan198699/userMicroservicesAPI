require('dotenv').config()
const userController = require('../controllers/userController.js');
const express = require('express');
const router = express.Router();
const logMiddleware = require('../middleware/logMiddleware.js');
const authenticateToken = require('../middleware/authenticateToken.js');

// get all users
router.get('/users', [
    logMiddleware,
    authenticateToken,
    userController.getUser
]);

// get a user with ID
router.get('/user/:userId', [
    logMiddleware,
    authenticateToken,
    userController.getUserWithId
]);

// update a user with Email
router.get('/user/', [
    logMiddleware,
    authenticateToken,
    userController.getUserWithEmail
]);

// update a user with ID
router.put('/user/:userId', [
    logMiddleware,
    authenticateToken,
    userController.updateUserWithId
]);

// delete a user with ID
router.delete('/user/:userId', [
    logMiddleware,
    authenticateToken,
    userController.deleteUser
]);

// 404 for anything else
// router.get('*', (req, res,) => {
//     res.status(404).send('page not found!');
// });

module.exports = router;