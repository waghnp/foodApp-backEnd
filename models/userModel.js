const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const db_link = 'mongodb+srv://admin:%40Waghn650@cluster0.4t8htla.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then((db)=>{
    console.log('DB connected successfully');
    // console.log(db);
})
.catch((error)=>{
    console.log(error);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.password===this.confirmPassword
        }
    }
});

userSchema.pre('save',function(){
    this.confirmPassword = undefined;
})

userSchema.pre('save',async function(){
    const salt =await bcrypt.genSalt();
    const encoding =await bcrypt.hash(this.password, salt);
    this.password = encoding;
})

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;
