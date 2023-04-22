const UserModel = require('../models/user.js');


var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.jwt;
const bcrypt = require('bcryptjs');
const salt = 10;
const bCryptPasswordFromDb="$2a$10$Yd9f38I8wu8tfbtqBahYSOAJQ/i1no7oIoREQR6LorMZcTus/qOGO";
// user login function
const verifyUserLogin = async (email,password)=>{
   try {
       const user = await UserModel.findOne({email}).lean()
       if(!user){
           return {status:'error',error:'user not found'}
       }
       if(await bcrypt.compare(password,user.password)){
           // creating a JWT token
           token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
          
           return {status:'ok',token}
       }
       return {status:'error',error:'invalid password'}
   } catch (error) {
       console.log(error);
       return {status:'error',error:'timed out'}
   }
}

exports.checkLogin = [
   async(req, res)=> {
   const {email,password:plainTextPassword}=req.body;
   const AuthData = await verifyUserLogin(email?email:'Rashad.Raynor45@gmail.com',plainTextPassword?plainTextPassword:'123456');
   console.log(AuthData)
   //  const password = await bcrypt.hash('12345',salt);
   //  console.log(password);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
   //  query={};
   //  let results= await UserModel.find(query).then((val)=>{return val})
   res.cookie('token',AuthData.token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
   res.json(AuthData);
   return res;
   }
];