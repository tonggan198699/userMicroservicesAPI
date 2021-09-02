require('dotenv').config()
const logStream = require('../services/logger.js');
const { mongooseUserModel } = require('../database/mongooseConnection.js');

// find all Users from db
const getUser = async(req, res, next) => {

    let User = mongooseUserModel();

    // grab all the records from db

        const findAllUsers = await User.find({});
        return res.json(findAllUsers);   

}

// find a user by Id
const getUserWithId = async(req, res, next) => {

    let User = mongooseUserModel();

    try{
        const findUserById = await User.findById(req.params.userId);

        if(!findUserById){   
            throw new Error(); 
        }

        return res.json(findUserById);

    }catch(error){

        let errorMessage = `Error: User ID of ${req.params.userId} cannot be found in the database! please try again!`;
        console.log(errorMessage);

        logStream.write(errorMessage)  
        next(error)
    } 

}

// find a user and update it
const updateUserWithId = async(req, res, next) => {

    let User = mongooseUserModel();

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

    let User = mongooseUserModel();

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
    updateUserWithId,
    deleteUser
};