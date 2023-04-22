// import {connectToDb} from "./db/connect";


const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var morgan = require('morgan');
require('dotenv').config();

const {connectToDb,connection} = require('./db/connect.js');
const {Seeder} = require('./db/Seeder.js');
var apiRouter = require("./routes/api");
const UserModel = require('./models/user.js');
// const StudentModel = require('./models/to-del/student.js');
const CourseModel = require('./models/course.js');
const FaqModel = require('./models/faq.js');
const CounterModel = require('./models/counter.js');
const LanguageModel = require('./models/language.js');
// const CollegeModel = require('./models/college.js');
const UserRoleModel = require('./models/user_role.js');

let customerId = null;



var express = require('express');
var cors = require('cors')
// const Mongoose = require('mongoose');

// Load Json
var page1 = require('./data/page1.json')
var page2 = require('./data/page2.json')
var page3 = require('./data/page3.json')


const MongoStore = require('connect-mongo');
var faker = require('faker');
// const { populate } = require('./models/student.js');
var app = express();

connectToDb();


// const http = require('http');
// const test = require('./test');
// Seeder();
const hostname = '127.0.0.1';
const port = 5001;

// const sessionStore = new MongoStore({ uri: process.env.connectionString, collection: 'sessions' });
// Session Config
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
app.use(cors())

if(process.env.NODE_ENV="TEST") {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use("/", apiRouter);

app.get('/', function(req, res, next ){
  var randomName = faker.name.findName(); // Rowan Nikolaus
  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  var randomCard = faker.helpers.createCard(); // random contact card containing many properties
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(randomCard);
   
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


app.get('/photo-gallery-feed-page/page/:id', async(req, res)=>{
  var id = req.params.id;
  
  let DataToSend={};
  if(id === '1'){
    DataToSend=page1;
  }else if(id === '2'){
    DataToSend=page2;
  }else if(id === '3'){
    DataToSend=page3;
  }else{
    DataToSend={"nodes":[]};
  }

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(DataToSend);

});

app.get('/courses', async(req, res)=>{
  var id = req.params.id;
  const query = req.query;// query = {sex:"female"}
  var randomName = faker.name.findName(); // Rowan Nikolaus
  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
}

CourseModel.find()
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .exec(function (err, doc) {
      if(err) { res.status(500).json(err); return; };
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(doc);
  });

});

app.post('/courses/create', async(req, res)=>{
  // var id = req.params.id;
  console.log(req.params);
  const query = req.query;// query = {sex:"female"}
  var randomName = faker.name.findName(); // Rowan Nikolaus
  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz


const courseEntry = new CourseModel({"courseImg":faker.image.nature(200, 200, false),'CourseName':query.name});
  const resp=await courseEntry.save();
    res.statusCode = 200;
    res.setHeader('Accept', 'application/json',);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({message:'Entry Succeed',resp});

});
app.post('/courses/create_faq', async(req, res)=>{
  // var id = req.params.id;

  console.log(req.body);
  const query = req.query;// query = {sex:"female"}
  var randomName = faker.name.findName(); // Rowan Nikolaus
  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  const {course_id,id} = req.body;
  if(!req.body.course_id || req.body.course_id === ""){
    res.statusCode = 400;
    res.setHeader('Accept', 'application/json',);
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({errors:{message:'course_id required'}});
  }

// const faqEntry = new FaqModel({course:course_id,id,"faqImg":faker.image.nature(200, 200, false),'CourseName':randomName, question:"Test Question",answer:"Test Answer"});
//   const resp=await faqEntry.save();
  // const counterEntry = new CounterModel({CounterId:course_id,Count:1});
  
  CounterModel.findOneAndUpdate({id:"faqSeqCount"},
  {"$inc":{"Count":1}},
  {new:true},async(err,cd)=>{
    let seqId;
    if(cd == null){
      const counterEntry = new CounterModel({CounterId:"faqSeqCount",Count:1});
      counterEntry.save();
      seqId=1;
    }else{
      seqId=cd.Count;
    }
    
    console.log(seqId);
    const faqEntry = new FaqModel({course:course_id,id:seqId,"faqImg":faker.image.nature(200, 200, false),'CourseName':randomName, question:"Test Question",answer:"Test Answer"});
    const resp=await faqEntry.save();
    res.statusCode = 200;
    res.setHeader('Accept', 'application/json',);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({message:'Entry Succeed',resp});
  }
) 
    
    

});

app.get('/instructors', async(req, res)=>{
  var id = req.params.id;
  const query = req.query;// query = {sex:"female"}
  var randomName = faker.name.findName(); // Rowan Nikolaus
  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
};

UserModel.find({role:"62ebd9c02d5208ee7ff6631e"})
  
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .exec(function (err, doc) {
      if(err) { res.status(500).json(err); return; };
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(doc);
  });

});
app.get('/faqsById', async(req, res)=>{


console.log(req.query.Course_Name)
  var {id, iid, Course_Name} = req.query;
 
let a={}
if(!iid && !Course_Name){
  a={};
}else{
  a={$or:[{id:iid},{CourseName:Course_Name}]};
}
console.log(a)
  FaqModel.find(a)
  .populate('course')
  .exec(function (err, doc) {
      if(err) { res.status(500).json(err); return; };
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(doc);
  });

});

app.get('/faqs', async(req, res)=>{

  try{
    FaqModel.find()
    .populate('course')
    .exec(function (err, doc) {
        if(err) { res.status(400).json(err); return; };
        // res.setHeader("Content-Type", "application/json");
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.body(doc);
        res.status(200).json({ "statuscode": 200,
         "message": "success",doc});
        // res.status(200).send({ "statuscode": 200,
        // "message": "success",doc});
        // res.json({ message: 'Book updated!', doc });
    });}catch(e){
      console.log(e)
    }
  
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
app.post('/test', async(req, res)=>{
//   var randomName = faker.name.findName(); // Rowan Nikolaus
//   var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
//   var randomCountry = faker.address; // Kassandra.Haley@erich.biz
//   var randomPhone = faker.phone.phoneNumber(); // Kassandra.Haley@erich.biz
//   var randomInstitution = faker.company.companyName(); // Kassandra.Haley@erich.biz
//   var gender = faker.random.arrayElements(["male",
//   "female",
//  ]);
//  var eyeColor = faker.random.arrayElements(["blue",
//  "black", 
// ]);
// var fruit = faker.random.arrayElements(["apple",
// "orange", "berry" , "dragon fruit", 
// ]);
//   var age = faker.random.arrayElements(["21",
//   "30",
//   "25",
//   "35",
//   "28"]);
  
//   const userEntry = new UserModel({ fullName: randomName ,email:randomEmail});
  
  
//   const studentEntry = new UserModel({
//     "index": Number(0),
//     "fullName": randomName,
//     "course":"62e943ac8b1883c4d48411b8",
//     "college": "62e9521afdff1958cd162d83",
//     "role":"62ebcfb7b789f0d1661509d9",
//     "instructors":['62ebda524d267e0193068de6','62ebda4f4d267e0193068de0'],
//     "isActive": false,
//     "profileImg":faker.image.avatar(200, 200, false),
//     "coverImg":faker.image.nature(1920, 1080, true),
//     "email": randomEmail,
//     "phone": randomPhone,
//     "location": {
//       "country": randomCountry.country(),
//       "address": randomCountry.secondaryAddress(),
//       "state":randomCountry.state(),
//       "zipcode": randomCountry.zipCodeByState(),
//     },
//     "zones":{"2b":[23, 50,44],"3a":[34,50,88,12]},
//     "userName": randomEmail,
//     "registered":faker.date.between('2018-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
//     "age": Number(age[0]),
//     "gender": gender[0],
//     "bio":faker.lorem.paragraphs(2, '<br/>'),
//     "eyeColor": eyeColor[0],
//     "favoriteFruit": fruit[0],
//     "favoriteCinema":['avatar2','ironman2'],
//     "tags": faker.random.arrayElements(["enim",
//     "id",
//     "velit",
//     "ad",
//     "consequat"])
//   });



//   const resp=await studentEntry.save();

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.json({message:'Entry Succeed',resp});
});



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app; // for testing


