require('dotenv').config()
const logStream = require('../services/logger.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mongooseUserModel } = require('../database/mongooseConnection.js');
const emailService = require('../services/emailService.js');
const asyncHandler = require('../helpers/asyncRouteWrapper');

// send activation email passing both the email and id in the email content
const sendActivationEmail = async ({_id, email}) => {

    const data = {
        from: process.env.EMAIL_USER_NAME, 
        to: email, 
        subject: `Your Activation Link for ${email}`,
        text: `Please use the following link within the next 10 minutes to activate your account`,
        html: `<p>Please use the following link within the next 10 minutes to activate your account: <strong><a href="${process.env.BASE_URL}/verifyAccount?id=${_id}" target="_blank">Click here to verify your account</a></strong></p>`,
    };
    
    await new Promise ((resolve, reject) => {emailService.sendMail(data, function(error, info)
        {
            if(error){
                console.log(error);
                return reject(error)
            }

            console.log('Message sent: ' + info.response);
            return resolve();
        });
    });

};

// register a new user
const registerNewUser = asyncHandler(async(req, res, next) => {

    try {

        let User = mongooseUserModel();

        const { firstName, lastName, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && firstName && lastName)) {
          return res.status(400).send({
                message: "All input is required for the registration process"
          });
        }

        // check if user is already regiter with email
        const currentUser = await User.findOne({ email });

        if(currentUser){
            return res.status(409).send({
                message: "User has been registered! Please login!"
            });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
        });

        // sends out activation email for the first time
        sendActivationEmail(user)
            .then(() => console.log('Successfully sent activation email'))
            .catch(console.log)

        return res.json({
            status: 200,
            id: user._id,
            status: user.status,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            message: "an email has been sent out, please verify!",
            createdDate: user.createdDate
        });

    }catch(error){

        console.log(error.message);
        logStream.write(`Error: ${error.message}`)  
        next(error)

    }  

});


// resend activation email
const resendActivationEmail = asyncHandler(async(req, res, next) => {

    try {

        let User = mongooseUserModel();

        const { email } = req.body;
 
          // check if user is already regiter with email
          const user = await User.findOne({ email });

          if(user.status === 'active'){
            return res.status(409).send({
                message: "User has been registered! Please login!"
            });        
          }

          if(user){

            let _id = user._id;

                // send activation email after the first time after checking the user status is pending
                if(user.status === 'pending'){
                        sendActivationEmail({email,_id})
                        .then(() => console.log('Successfully sent activation email'))
                        .catch(console.log)
                }
             
          }

    }catch(error){
        
        console.log(error.message);
        logStream.write(`Error: ${error.message}`)  
        next(error)
        
    } 

});


// login to obtain the access token
const userLogin = async(req, res, next) => {

    try {

        let User = mongooseUserModel();

        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send({
                message: "Please provide email and password for login!"
            });
        }
        // check if user is already regiter with email
        const user = await User.findOne({ email });

        // check if user status is active
        if (user.status != 'active'){
            return res.status(400).send({
                message: "Please verify your account!"
            });
        }

        // check user and password matching what is in the db
        if (user && (await bcrypt.compare(password, user.password))) {

            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                    process.env.ACEESS_TOKEN_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // send out the user in the response with token
            res.status(200).json(user);

        }else{
            throw new Error('Your credentials could not be verified! Please makes sure that you have entered the correct email and password!'); 
        }

    }catch(error){

        console.log(error.message);
        logStream.write(`Error: ${error.message}`)  
        next(error)

    }  

};    

module.exports = {
    registerNewUser,
    resendActivationEmail,
    userLogin
};
