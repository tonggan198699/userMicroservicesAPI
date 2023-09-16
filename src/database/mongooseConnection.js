require('dotenv').config()
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { UserSchema } = require('../models/user.js');
//const {run} = require("nodemon/lib/monitor");

const mongooseConnection = async() => {

    mongoose.Promise = global.Promise;
    mongoose.connect(
        process.env.MONGODB_URL,
        {
                useNewUrlParser: true,
                useUnifiedTopology: true
                },
        (err) => {
            if(err) console.log(err)
            else console.log("mongdb is connected");
        }
    );

}


const mongooseUserModel = () => {
    const User = mongoose.model('User', UserSchema);
    return new User();
}

module.exports = {
    mongooseConnection: mongooseConnection,
    mongooseUserModel: mongooseUserModel
}