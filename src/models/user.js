require('dotenv').config()

if(process.env.DB_CHOICE === 'mongoose'){

    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const UserSchema = new Schema({

        firstName: String,
        lastName: String,
        email: String,
        password: String,
        status: { type: String, default: 'inactive'},
        token: String,
        sentActivationLinkAt: { type: Date, default: Date.now },
        createdDate: { type: Date, default: Date.now }

        // firstName: {
        //     type: String,
        //     required: 'Enter the first name'
        // },
        // lastName: {
        //     type: String,
        //     required: 'Enter the last name'
        // },
        // email: {
        //     type: String,
        //     required: 'Enter the email'
        // },
        // password: {
        //     type: String,
        //     required: 'Enter the password!!'
        // },
        // company: {
        //     type: String
        // },
        // phone: {
        //     type: Number
        // },
        // status: {
        //     type: String,
        //     default: "pending",
        // },
        // token: {
        //     type: String
        // },
        // sentActivationLinkAt: {
        //     type: Date,
        //     default: Date.now
        // },
        // createdDate: {
        //     type: Date,
        //     default: Date.now
        // }

    })

    //module.exports = {UserSchema};
    module.exports = mongoose.model('User', UserSchema);
}