require('dotenv').config()

if(process.env.DB_CHOICE === 'mongoose'){

    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const VerificationSchema = new Schema({

        user_id: String,
        verified: Boolean,
        email: String,
        createdDate: { type: Date, default: Date.now }

    })

    module.exports = mongoose.model('Verification', VerificationSchema);
}