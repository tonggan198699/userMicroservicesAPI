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

    })

    module.exports = mongoose.model('User', UserSchema);
}