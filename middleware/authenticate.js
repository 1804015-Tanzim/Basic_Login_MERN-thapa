const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = require('../model/userSchema');

const authenticate = async (req,res,next) => {
    try{
        const token = req.cookies.jwtToken;
        const verifyToken = jwt.verify(token,process.env.SECRECT_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});

        if(!rootUser) { throw new Error('User not Found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (err) {
        res.status(401).send('Unauthorized: No token provide')
        console.log(err)
    }

}

module.exports = authenticate ; 