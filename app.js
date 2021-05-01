const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

//get cookies
app.use(cookieParser()) ;

// .env 
dotenv.config({path:'./config.env'});

// port
const PORT = process.env.PORT;

// mongo
require('./data/conn');

// json
app.use(express.json());


// routes backend
app.use(require('./router/auth'));


// port listen
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
})