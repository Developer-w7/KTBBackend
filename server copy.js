// import {connectToDb} from "./db/connect";


const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');

require('dotenv').config();

const {connectToDb,connection} = require('./db/connect.js');
var apiRouter = require("./routes/api");
const UserModel = require('./models/user.js');
// const StudentModel = require('./models/student.js');
const CourseModel = require('./models/course.js');
const CollegeModel = require('./models/college.js');
const UserRoleModel = require('./models/user_role.js');
// const AdminModel = require('./models/admins/admin.js');
// const SuperAdminModel = require('./models/admins/super_admin.js');

let customerId = null;


// CollegeModel.create({
        
//       CollegeName: "Atlas",
//       CollegeImg: "/img/college"
//       });

// UserModel.insertMany([
//   {
//     "index": Number(0),
//     "fullName": "Aurelia Gonzales",
//     "isActive": false,
//     "registered": Date("2015-02-11T04:22:39+0000"),
//     "age": Number(20),
//     "gender": "female",
//     "eyeColor": "green",
//     "favoriteFruit": "banana",
//     "college": {
//       "title": "YURTURE",
//       "email": "aureliagonzales@yurture.com",
//       "phone": "+1 (940) 501-3963",
//       "location": {
//         "country": "USA",
//         "address": "694 Hewes Street"
//       }
//     },
//     "tags": [
//       "enim",
//       "id",
//       "velit",
//       "ad",
//       "consequat"
//     ]
//   },
//   {
//     fullName: "Joey Tribianni",
//     email: "jt@gmail.com",
//   },
//   {
//     fullName: "Chandler Bing",
//     email: "cb@gmail.com",
//   },
// ])
//   .then((insertedCustomers) => {
//     // console.log("Inserted Customers are: ", insertedCustomers);
//     return UserModel.deleteOne({ fullName: "Joey Tribianni" });
//   })
//   .then((deletedCustomer) => {
//     // console.log("Deleted: ", deletedCustomer);
//     return UserModel.find();
//   })
//   .then((remainingCustomers) => {
//     // console.log("Remaining Customer : ", remainingCustomers);
//     customerId = remainingCustomers[0]._id;
//     return CourseModel.create({
//       studentId: customerId,
//       CourseName: "BCA",
//     });
//   })
//   .then((order) => {
//     // console.log("Current Customer's Order is : ", order);
//     return CourseModel.find({ customer_id: customerId });
//   })
//   .then((selectedOrder) => {
//     // console.log("Current Customer's Selected Order is : ", selectedOrder);
//   })
//   .catch((e) => {
//     throw e;
//   });




var express = require('express');
// const Mongoose = require('mongoose');

const MongoStore = require('connect-mongo');
var faker = require('faker');
// const { populate } = require('./models/student.js');
var app = express();




// Mongoose.Promise = global.Promise;
// const connectToDb = async () => {
//   try {
//       console.log(process.env.connectionString);
//       await Mongoose.connect(process.env.connectionString, { autoIndex: false });
      
//       console.log('Connected to mongo!!!');
//       return 1;
//   }catch(err){
//       console.log('Could not connect to MongoDB');
//       return 0;
//   }  
// }
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
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// app.use(passport.initialize());
// app.use(passport.session());

// const requestListener = function (req, res) {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.json({data:'Hello, World!'});
// }
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
  // var randomCard = faker.helpers.createCard(); // random contact card containing many properties
//   const userEntry = new UserModel({ fullName: randomName ,email:randomEmail});
//   var val=await UserModel.find();
// console.log(val)
  // const resp=await userEntry.save();
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



    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.json({message:'Succeed',query});
});



app.get('/student', async(req, res)=>{


  // UserModel.find()
  // .populate('course')
  // .populate('college')
  // .exec(function (err, doc) {
  //     if(err) { res.status(500).json(err); return; };
  //     res.setHeader('Content-Type', 'text/plain');
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  //     res.status(200).json(doc);
  // });

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
  // console.log(faker.address)
  // var randomCard = faker.helpers.createCard(); // random contact card containing many properties
  const userEntry = new UserModel({ fullName: randomName ,email:randomEmail});
  
  
  const studentEntry = new UserModel({
    "index": Number(0),
    "fullName": randomName,
    "course":"62e943ac8b1883c4d48411b8",
    "college": "62e9521afdff1958cd162d83",
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

    // "college": {
    //   "title": randomInstitution,
    //   "email": faker.internet.email(),
    //   "phone": faker.phone.phoneNumber(),
    //   "location": {
    //     "country": randomCountry.country(),
    //     "address": randomCountry.secondaryAddress(),
    //     "state":randomCountry.state(),
    //     "zipcode": randomCountry.zipCodeByState(),
    //   }
    // },
    "tags": faker.random.arrayElements(["enim",
    "id",
    "velit",
    "ad",
    "consequat"])
  });

  // var val=await UserModel.find();


// console.log(val)
  // const resp=await userEntry.save();

  const resp=await studentEntry.save();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({message:'Entry Succeed',resp});
});
// const server = http.createServer(requestListener);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




