const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const User = mongoose.model('User')
// const {jwtkey} = require('../keys')
const {User} = require('../models/user.model.js')
const config = require("config");

module.exports = (req,res,next)=>{
       const { authorization } = req.headers;
       //authorization === Bearer sfafsafa
       if(!authorization){
           return res.status(401).send({error:"you must be logged in"})
       }
       const token = authorization.replace("Bearer ","");
       jwt.verify(token,config.get("jwtPrivateKey"),async (err,payload)=>{
           if(err){
             return  res.status(401).send({error:"you must be logged in 2"})
           }
        const {userId} = payload;
        const user = await User.findById(userId)
        req.user=user;
        next();
       })
}

// const jwt= require("jsonwebtoken");
// const config = require("config");
// const mongoose = require('mongoose');
// const {User} = require('../models/user.model.js')

// module.exports = function (req, res, next) {
//   const token = req.header("x-auth-token");
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// }