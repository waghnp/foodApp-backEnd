const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');

userRouter.route('/')
.get(protectRouter,getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/setCookies')
.get(setCookies)

function getCookies(req,res){
    let cookie = req.cookies;
    res.send({
        message:'Cookie get successful',
        data:cookie
    })
}

function setCookies(req,res){
    res.cookie('isLoggedin',false);
    res.send("Cookie set successful");
}

async function getUsers(req,res){
    const users = await userModel.find();
    res.send({message:"List of users ",data:users});
}

function protectRouter(req,res,next){
    if(req.cookies.isLoggedIn){
        next();
    }else{
        res.json({
            message : "Operation is not allowed, Please login first"
        })
    }
}

function postUser(req,res){
    console.log('post req->body ', req.body);
    user=req.body;
    res.send({message:'Post req successful',user:req.body})
}

async function updateUser(req,res){
    let user = req.body;

    // for(let key in updatedUser){
    //     user[key] = updatedUser[key];
    // }
    const updatedUser = await userModel.findOneAndUpdate({email:user.email},user); 
    res.json({
        message:"Update successful",
        data:updatedUser
    })
}

async function deleteUser(req,res){
    // user={}
    let user = req.body;

    const deletedUser = await userModel.findOneAndDelete(user);
    res.json({
        message:"Delete successful",
        data:deletedUser
    })
}

function getUserById(req,res){
    console.log(req.params);
    res.status(200).send("user id "+req.params.id)
}

module.exports = userRouter;