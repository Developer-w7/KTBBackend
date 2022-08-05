const Mongoose = require('mongoose');
const StudentModel = require('./to-del/student.js');

const CollegeSchema = Mongoose.Schema(
    {
      CollegeName: { type: String, default: "" },
      CollegeImg: { type: String, default: "" },
      

    },{ timestamps: true, collection: "college" })
    let CollegeModel = Mongoose.model("colleges", CollegeSchema);


    CollegeModel.getXPerson = (where) => {
        return CollegeModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= CollegeModel;