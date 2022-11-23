function protectRouter(req,res,next){
    if(req.cookies.isLoggedIn){
        next();
    }else{
        res.json({
            message : "Operation is not allowed, Please login first"
        })
    }
}


module.exports = protectRouter