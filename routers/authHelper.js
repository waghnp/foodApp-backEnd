const jwt = require('jsonwebtoken');
const {secretKey} = require('../secret')

function protectRouter(req,res,next){
    if(req.cookies.isLogin){
        let isVerified = jwt.verify(req.cookies.isLogin,secretKey);
        if(isVerified){
            console.log(req.cookies.isLogin);
            next();
        }
    }else{
        res.json({
            message : "Operation is not allowed, Please login first"
        })
    }
}


module.exports = protectRouter