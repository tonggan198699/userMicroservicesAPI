const logStream = require('../services/logger.js');
const moment = require('moment');
const asyncHandler = require('../helpers/asyncRouteWrapper');

module.exports = asyncHandler(async ( req, res, next ) => {

    // log both the http url and http method to the cli
    console.log(`Request from: ${req.originalUrl}`) // Request from: /contact
    console.log(`Request type: ${req.method}`) // Request type: GET

        const dateWithFormat = moment().format('YYYY-MM-DD [T] HH:mm:ss');
        
        await logStream.write(`${dateWithFormat}\nRequest from: ${req.originalUrl}\nRequest type: ${req.method}\n`)

});