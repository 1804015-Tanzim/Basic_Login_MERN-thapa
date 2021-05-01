const mongoose = require('mongoose');

const DB = process.env.DATA;

mongoose
    .connect(DB,{ useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(()=> console.log('mongo connected'))
    .catch((err) => console.log('mongo NOT connected'))
