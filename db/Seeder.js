// const StudentModel = require('../models/to-del/student.js');
const CourseModel = require('../models/course.js');
const LanguageModel = require('../models/language.js');
// const CollegeModel = require('../models/college.js');
const UserRoleModel = require('../models/user_role.js');

// const {connectToDb,connection} = require('../db/connect.js');

// connectToDb();
var faker = require('faker');
const Seeder = () => {
    try {
        CourseModel.create({
        CourseName: faker.lorem.word(),
        courseImg: faker.image.technics(200, 200, false)
        });
        LanguageModel.create({
         LanguageName: "English",
         LanguageImg: faker.image.sports(200, 200, false)
        });
    }catch(err){
        console.log('Could not connect to MongoDB');
        
    }  
  }


  exports.Seeder = Seeder;
