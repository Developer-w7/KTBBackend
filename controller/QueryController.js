const UserModel = require('../models/user.js');
const StudentModel = require('../models/to-del/student.js');

var mongoose = require("mongoose");



exports.listCategories = [
   async(req, res)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    query={};
    let results= await StudentModel.find(query).then((val)=>{return val})
    res.json(results);
    return res;
   }
];