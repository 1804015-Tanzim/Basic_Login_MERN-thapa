const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//schema
const userSchema = new mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        phone:{
            type:Number,
            require:true
        },
        work:{
            type:String,
            require:true
            
        },
        password:{
            type:String,
            require:true
        },
        cpassword:{
            type:String,
            require:true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        messages: [
            {
                name:{
                type:String,
                require:true
              },
                 email:{
                 type:String,
                 require:true
              },
                 phone:{
                 type:Number,
                 require:true
              },
                message: {
                    type:String,
                    required:true
                }
            }
        ],
        tokens:[
            {   
                token:{
                    type:String,
                    require:true
                }
                
            }
        ]
});

// hashing
userSchema.pre('save' , async function (next) {

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

// generating web token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id: this._id}, process.env.SECRECT_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

// store message 
userSchema.methods.addMessage = async function (name,email,phone,message) {
        try {
             this.messages = this.messages.concat ({name,email,phone,message});
             await this.save();
             return this.messages;
        } catch (err) {
            console.log(err);
        }
}

// mcollection create 
const User = mongoose.model('USER',userSchema); // colletion name : users

module.exports = User;