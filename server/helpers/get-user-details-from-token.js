const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model');
const res = require("express/lib/response");
const getUserDetailsFromToken = async (token) => {
   try {
       if (!token) {
           return {
               message: "session out",
               logout: true
           }
       }

       const decode = await jwt.verify(token, process.env.JWT_SECREAT_KEY);

       const user = await UserModel.findById(decode.id).select('-password')
       return user
   } catch (error) {
       console.log(error)
   }


    // return res.status(200).json({
    //     message:'user details',
    //     data:user
    // })
}
module.exports = getUserDetailsFromToken;