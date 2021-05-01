const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require("../middleware/authenticate")

// DB
require('../data/conn');
const User = require('../model/userSchema');

// router
// register async await
router.post('/register', async (req,res)=>{
    const {name, email, phone, work, password, cpassword } = req.body;

    if(!name|| !email|| !phone|| !work|| !password|| !cpassword ){
        return res.status(422).json({error:"Fill all data"});
    }

    // same user or not
    try {
        const userExits = await User.findOne({ email: email });

            if(userExits){
                return res.status(422).json({error: "Email already Exist"})
            } else if (password != cpassword) {
                return res.status(422).json({error: "password not matching"})
            } else {

            // new user
            const user = new User({name, email, phone, work, password, cpassword});

            // save
            await user.save();
            
            res.status(201).json({message:"Succesfully resgistration Complete"})
        }
           
                            
    } catch (err) {
            console.log(err);
    }     
});


// login route
router.post('/signin', async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) {
             return res.status(400).json({error:"Fill all the fleld"});
        }

        const userExist = await User.findOne({ email: email });

        // email cheack
        if(userExist) {
                const passwordMatch = await bcrypt.compare(password, userExist.password);

                

             // password check
             if(!passwordMatch) {
                    res.status(400).json({error:"Invalid credentials pass"});
             } else {
                    // jwt
                const token = await userExist.generateAuthToken();
                
                // cookie
                res.cookie("jwtToken",token, {
                    expires: new Date(Date.now()+25892000000),
                    httpOnly:true
                })

                    res.json({message:"Succesfully signed in"});
             }

        } else {
            res.status(400).json({error:"Invalid credentials"});
        }

    } catch (err) {
        console.log(err);
    }
    

})


// about page authenticate and get data
router.get('/aboutback',authenticate , (req,res)=>{
    console.log("about page");
    res.send(req.rootUser);
});

// home page and contact get data and authenticate
router.get('/getdata',authenticate,(req,res)=>{
        console.log("Home & Contact");
        res.send(req.rootUser);
});

//  contact us page send data
router.post('/contact',authenticate, async (req,res)=>{
         try {
            const {name, email, phone, message} = req.body;

            if(!name || !email || !phone || !message){
                console.log("not filled all fields")
                return res.json({error:"FILLED ALL FIELDS"})
            }

            const userContact = await User.findOne({_id:req.userID});

            if(userContact) {
                const userMessage = await userContact.addMessage(name,email,phone,message);

                await userContact.save();

                res.status(201).json({message:"User succesfully add a message"});
            }


         } catch (err) {
             console.log(err);
         }
});

// logout
router.get('/logout', (req,res)=>{
    console.log("logout");
    res.clearCookie('jwtToken',{path:'/'});
    res.status(200).send('respond logout');
});


module.exports = router;