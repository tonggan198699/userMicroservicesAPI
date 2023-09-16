const { mongooseUserModel } = require('../database/mongooseConnection.js');
const asyncHandler = require('../helpers/asyncRouteWrapper');
const User = require('../models/user.js');

// update the sentActivationLinkAt to now timestamp
module.exports = asyncHandler(async (req, res, next) => {

    //let User = mongooseUserModel();

    let user = await User.findById(req.query.id);
    
    if(user){
        user = await User.findOneAndUpdate({email: user.email}, {sentActivationLinkAt: Date.now()}, { new: true, useFindAndModify: false });   
    }
    
    res.json({
        status: 200,
        id: user._id,
        status: user.status,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        sentActivationLinkAt: user.sentActivationLinkAt,
    });
        
     next();  

});