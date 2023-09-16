require('dotenv').config()
const logStream = require('../services/logger.js');
const User = require('../models/user.js');

// find all Users from db
const getUser = async(req, res, next) => {
    const findAllUsers = await User.find({});
    return res.json(findAllUsers);
}

// find a user by Id
const getUserWithId = async(req, res, next) => {

    try {
        const findUserById = await User.findById(req.params.userId);

        if(!findUserById){
            throw new Error();
        }

        return res.json(findUserById);

    } catch (e) {
        let errorMessage = `Error: User ID of ${req.params.userId} cannot be found in the database! please try again!`;
        console.log(errorMessage);

        logStream.write(errorMessage)
        next(e)
    }
}

// find a user by Email
const getUserWithEmail = async(req, res, next) => {

    try {
        const email = req.query.email
        const findUserByEmail = await User.find({email}).exec();

        if(!findUserByEmail){
            throw new Error();
        }

        return res.json(findUserByEmail);

    } catch (e) {
        let error = `Error: User Email of ${req.query.email} cannot be found in the database! please try again!`;

        console.log(error);
        logStream.write(error)
        next(e)
    }
}


// find a user and update it
const updateUserWithId = async(req, res, next) => {

    try{

        const findUserByIdAndUpdate = await User.findOneAndUpdate({_id: req.params.userId}, req.body, { new: true, useFindAndModify: false });
        
        if(!findContactByIdAndUpdate){   
            throw new Error(); 
        }
        
        return res.json(findUserByIdAndUpdate);
    
    }catch(error){

        let errorMessage = `Error: User ID of ${req.params.userId} cannot be found in the database! record has not been updated!`;
        console.log(errorMessage);

        logStream.write(errorMessage) 
        next(error)
    }
}

// find a user and delete it
const deleteUser = async(req, res, next) => {

    try{

        const removeUserById = await User.remove({_id: req.params.userId});

        if(!removeUserById){
            throw new Error();
        }

        return res.json({ message: 'successfully deleted user!'});

    }catch(error){

        let errorMessage = `Error: User ID of ${req.params.userId} cannot be found in the database! record has not been deleted!`;
        console.log(errorMessage);

       logStream.write(errorMessage)
        next(error)
    }
}

module.exports = {
    getUser,
    getUserWithId,
    getUserWithEmail,
    updateUserWithId,
    deleteUser
};