const Mongoose = require('mongoose');
const StudentModel = require('./to-del/student.js');

const CourseSchema = Mongoose.Schema(
    {
      CourseName: { type: String, default: "" },
      // studentId: { type: Mongoose.Schema.ObjectId,ref:StudentModel, required:true, index:true },
     
      courseImg: { type: String, default: "" },
      

    },{ timestamps: true, collection: "course" })
    let CourseModel = Mongoose.model("courses", CourseSchema);


    CourseModel.getXPerson = (where) => {
        return CourseModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= CourseModel;