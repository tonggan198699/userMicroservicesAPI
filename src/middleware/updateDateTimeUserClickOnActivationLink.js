const asyncHandler = require('../helpers/asyncRouteWrapper');
const User = require('../models/user.js');

// update the sentActivationLinkAt to now timestamp
module.exports = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.query.id);
    
    if(user){
        user = await User.findOneAndUpdate
        (
            {email: user.email},
            {sentActivationLinkAt: Date.now(), status: 'verified'},
            { new: true, useFindAndModify: false}
        );
    }
    
    res.json({
        status: 200,
        status: user.status,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        sentActivationLinkAt: user.sentActivationLinkAt,
    });
        
     next();  

});