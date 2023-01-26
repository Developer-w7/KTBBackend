const UserModel = require('../models/user.js');
var mongoose = require("mongoose");
var faker = require('faker');
const bcrypt = require('bcryptjs');
const salt = 10;
exports.seedUser = [
   async(req, res)=> {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // query={};
    // let results= await StudentModel.find(query).then((val)=>{return val})
    // res.json(results);
    // return res;
    const {user_name,email,password:plainTextPassword}=req.body;
    if(plainTextPassword === ""){
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json({message:'Entry Failed'});
     
    }
    var randomName = faker.name.findName(); // Rowan Nikolaus
    var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    var randomCountry = faker.address; // Kassandra.Haley@erich.biz
    var randomPhone = faker.phone.phoneNumber(); // Kassandra.Haley@erich.biz
    var randomInstitution = faker.company.companyName(); // Kassandra.Haley@erich.biz
    var gender = faker.random.arrayElements(["male",
    "female",
   ]);
   var eyeColor = faker.random.arrayElements(["blue",
   "black", 
  ]);
  var fruit = faker.random.arrayElements(["apple",
  "orange", "berry" , "dragon fruit", 
  ]);
    var age = faker.random.arrayElements(["21",
    "30",
    "25",
    "35",
    "28"]);
    
    // const userEntry = new UserModel({ fullName: randomName ,email:randomEmail});
    
    
    const studentEntry = new UserModel({
      "index": Number(0),
      "fullName": randomName,
      "password": await bcrypt.hash(plainTextPassword,salt),
      "course":"62e943ac8b1883c4d48411b8",
      "college": "62e9521afdff1958cd162d83",
      "role":"62ebcfb7b789f0d1661509d9",
      "instructors":['62ebda524d267e0193068de6','62ebda4f4d267e0193068de0'],
      "isActive": false,
      "profileImg":faker.image.avatar(200, 200, false),
      "coverImg":faker.image.nature(1920, 1080, true),
      "email": email?email:randomEmail,
      "phone": randomPhone,
      "location": {
        "country": randomCountry.country(),
        "address": randomCountry.secondaryAddress(),
        "state":randomCountry.state(),
        "zipcode": randomCountry.zipCodeByState(),
      },
      "zones":{"2b":[23, 50,44],"3a":[34,50,88,12]},
      "userName": user_name?user_name:randomEmail,
      "registered":faker.date.between('2018-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
      "age": Number(age[0]),
      "gender": gender[0],
      "bio":faker.lorem.paragraphs(2, '<br/>'),
      "eyeColor": eyeColor[0],
      "favoriteFruit": fruit[0],
      "favoriteCinema":['avatar2','ironman2'],
      "tags": faker.random.arrayElements(["enim","id","velit","ad","consequat"])
    });
  
  
  
      const resp=await studentEntry.save();
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json({message:'Entry Succeed',resp});
      // return res.redirect('http://localhost:3000/home');
   }
];