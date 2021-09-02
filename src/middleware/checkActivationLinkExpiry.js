const { mongooseUserModel } = require('../database/mongooseConnection.js');
const asyncHandler = require('../helpers/asyncRouteWrapper');

module.exports = asyncHandler(async (req, res, next) => {

    let User = mongooseUserModel();

    const user = await User.findById(req.query.id);

    // dateTimeUserClickOnActivationLink as an date type
    const dateTimeUserClickOnActivationLink = user.sentActivationLinkAt;
    // parse dateTimeUserClickOnActivationLink to timestamp
    const parseDateTimeUserClickOnActivationLink = Date.parse(dateTimeUserClickOnActivationLink);
    // currentDateTime timestamp
    const currentDateTime = Date.now();

    // add 10 mins to parseDateTimeUserClickOnActivationLink 
    // max time allowed before the activation link is expired 
    const maxTime = parseDateTimeUserClickOnActivationLink + (600*1000); 

    // check the current time is greater than the max time before throwing out the error
    if(currentDateTime > maxTime){
        throw new Error('Your activation link has expired after 10 minutes! Please request for an activation link resend!')
    }else{
        // updates the status to active 
        user = await User.findOneAndUpdate({email: user.email}, {status: 'active'}, { new: true, useFindAndModify: false });   
    }

});