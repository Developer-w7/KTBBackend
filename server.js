// import {connectToDb} from "./db/connect";


const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');

require('dotenv').config();

const {connectToDb,connection} = require('./db/connect.js');
var apiRouter = require("./routes/api");
const UserModel = require('./models/user.js');
// const StudentModel = require('./models/to-del/student.js');
// const CourseModel = require('./models/course.js');
// const CollegeModel = require('./models/college.js');
const UserRoleModel = require('./models/user_role.js');

let customerId = null;
var express = require('express');
// const Mongoose = require('mongoose');

const MongoStore = require('connect-mongo');
var faker = require('faker');
// const { populate } = require('./models/student.js');
var app = express();

connectToDb();
// const http = require('http');
// const test = require('./test');

const hostname = '127.0.0.1';
const port = 5000;

// const sessionStore = new MongoStore({ uri: process.env.connectionString, collection: 'sessions' });
// Session Config
app.use(express.json());
app.use(express.urlencoded({extended: true}));
console.log(process.env.connectionString)
app.use(
  session({
      secret: 'story book',
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.connectionString
    }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
  })
);
app.use("/", apiRouter);


// UserRoleModel.create({
        
//       RoleName: "Instructor",
//       Privilages: "Level-309"
//       });

app.get('/', function(req, res, next ){
  var randomName = faker.name.findName(); // Rowan Nikolaus
  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  var randomCard = faker.helpers.createCard(); // random contact card containing many properties
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(randomCard);
    // res.send('<h2>haii</h2>')
});


app.get('/users', async(req, res)=>{
  var id = req.params.id;
  const query = req.query;// query = {sex:"female"}
  var randomName = faker.name.findName(); // Rowan Nikolaus
  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
}

UserModel.find()
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .exec(function (err, doc) {
      if(err) { res.status(500).json(err); return; };
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(doc);
  });

});

app.get('/user', async(req, res)=>{


  UserModel.find({_id:"62ebdcdb21dc0bf08ed058ec"})
  .populate('course')
  .populate('college')
  .populate('role')
  .populate('instructors')
  .exec(function (err, doc) {
      if(err) { res.status(500).json(err); return; };
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(doc);
  });

});
app.post('/insert', async(req, res)=>{
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
  
  const userEntry = new UserModel({ fullName: randomName ,email:randomEmail});
  
  
  const studentEntry = new UserModel({
    "index": Number(0),
    "fullName": randomName,
    "course":"62e943ac8b1883c4d48411b8",
    "college": "62e9521afdff1958cd162d83",
    "role":"62ebcfb7b789f0d1661509d9",
    "instructors":['62ebda524d267e0193068de6','62ebda4f4d267e0193068de0'],
    "isActive": false,
    "profileImg":faker.image.people(200, 200, false),
    "coverImg":faker.image.nature(1920, 1080, true),
    "email": randomEmail,
    "phone": randomPhone,
    "location": {
      "country": randomCountry.country(),
      "address": randomCountry.secondaryAddress(),
      "state":randomCountry.state(),
      "zipcode": randomCountry.zipCodeByState(),
    },
    "zones":{"2b":[23, 50,44],"3a":[34,50,88,12]},
    "userName": randomEmail,
    "registered":faker.date.between('2018-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
    "age": Number(age[0]),
    "gender": gender[0],
    "bio":faker.lorem.paragraphs(2, '<br/>'),
    "eyeColor": eyeColor[0],
    "favoriteFruit": fruit[0],
    "favoriteCinema":['avatar2','ironman2'],
    "tags": faker.random.arrayElements(["enim",
    "id",
    "velit",
    "ad",
    "consequat"])
  });



  const resp=await studentEntry.save();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({message:'Entry Succeed',resp});
});



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




