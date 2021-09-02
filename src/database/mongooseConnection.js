require('dotenv').config()
const mongoose = require('mongoose');
const { UserSchema } = require('../models/user.js');

const mongooseConnection = async() => {

    mongoose.Promise = global.Promise;
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedToplogy: true
        });
    }catch(error){
        handleError(error);
    }

}

const mongooseUserModel = () => {

    const User = mongoose.model('User', UserSchema);
    return User;
    
}


module.exports = {
    mongooseConnection: mongooseConnection,
    mongooseUserModel: mongooseUserModel
}