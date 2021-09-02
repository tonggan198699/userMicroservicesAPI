const express = require('express');
const userRoutes = require('./src/routes/userRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const {mongooseConnection} = require('./src/database/mongooseConnection.js');
require('dotenv').config()

const app = express();

// db config 
if(process.env.DB_CHOICE === 'mongoose'){
    mongooseConnection();
}

// use bodyparser to parse the request that is readable by our api
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// serving static files from public folder
app.use(express.static('public')); // http://localhost:8000/sky.jpeg

app.use('/', userRoutes, authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Your server is running on port ${port}`));


