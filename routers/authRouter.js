const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const {secretKey} = require('../secret')


authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)

authRouter
.route('/login')
.post(loginUser)


function getSignUp(req,res){
    res.sendFile('./public/signup.html',{root:__dirname});
}

async function postSignUp(req,res){
    const user = req.body;

    const createdUser = await userModel.create(user);

    res.json({
        message:"user sign up successfully",
        data:createdUser
    });
}

async function loginUser(req,res){
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                if(user.password==data.password){
                    let uid = user['_id'];
                    const token = jwt.sign({payload : uid},secretKey);
                    res.cookie("isLogin",token)
                    res.json({
                        message : "User logged in successfully",
                        user
                    })
                }else{
                    res.json({
                        message : "Wrong Creadentials"
                    })
                }
            }else{
                res.json({
                    message : "User not found"
                })
            }
        }else{
            res.json({
                message : "Empty field found"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports = authRouter;